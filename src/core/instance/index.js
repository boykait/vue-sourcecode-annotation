import { initMixin } from './init'
import { stateMixin } from './state'
import { renderMixin } from './render'
import { eventsMixin } from './events'
import { lifecycleMixin } from './lifecycle'
import { warn } from '../util/index'

// 使用函数构造器方式而不使用class便于定义一些混入方法
function Vue (options) {
  if (process.env.NODE_ENV !== 'production' &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword')
  }
  // 执行\src\core\instance\init.js脚本中挂载的_init方法
  this._init(options)
}
// 属性、方法混入
initMixin(Vue) // 主要挂载_init方法
stateMixin(Vue) // 数据state状态相关 $set、$delete、$watch方法以及定义$data $props属性
eventsMixin(Vue) // 事件相关 $on  $once $off $emit事件
lifecycleMixin(Vue) // 生命周期相关 _update $forceUpdate $destroy
renderMixin(Vue)  // vue渲染相关

export default Vue
