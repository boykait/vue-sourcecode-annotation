/* @flow */

import type Watcher from './watcher'
import { remove } from '../util/index'
import config from '../config'

let uid = 0

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
export default class Dep {
  static target: ?Watcher;   // target 全局变量，标识当前正在进行依赖收集的watcher
  id: number;
  subs: Array<Watcher>; // 订阅者列表

  constructor () {
    this.id = uid++
    this.subs = []
  }

  // 添加订阅者
  addSub (sub: Watcher) {
    this.subs.push(sub)
  }

  // 删除订阅者
  removeSub (sub: Watcher) {
    remove(this.subs, sub)
  }

  // 将自身添加到当前的订阅器中
  depend () {
    if (Dep.target) {
      Dep.target.addDep(this)
    }
  }

  notify () {
    // stabilize the subscriber list first
    const subs = this.subs.slice()
    if (process.env.NODE_ENV !== 'production' && !config.async) {
      // subs aren't sorted in scheduler if not running async
      // we need to sort them now to make sure they fire in correct
      // order
      subs.sort((a, b) => a.id - b.id)
    }
    // 循环对订阅者进行更新操作（调用watcher的update方法）
    for (let i = 0, l = subs.length; i < l; i++) {
      subs[i].update()
    }
  }
}

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
Dep.target = null
const targetStack = []

export function pushTarget (target: ?Watcher) {
  // 将当前的watcher推入堆栈中，关于为什么要推入堆栈，主要是要处理模板或render函数中嵌套了多层组件，需要递归处理
  targetStack.push(target)
  // 设置当前watcher到全局的Dep.target，通过在此处设置，key使得在进行get的时候对当前的订阅者进行依赖收集
  Dep.target = target
}

export function popTarget () {
  targetStack.pop()
  Dep.target = targetStack[targetStack.length - 1]
}
