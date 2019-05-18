/* @flow */

import { parse } from './parser/index'
import { optimize } from './optimizer'
import { generate } from './codegen/index'
import { createCompilerCreator } from './create-compiler'

// `createCompilerCreator` allows creating compilers that use alternative
// parser/optimizer/codegen, e.g the SSR optimizing compiler.
// Here we just export a default compiler using the default parts.
export const createCompiler = createCompilerCreator(function baseCompile (
  template: string,
  options: CompilerOptions
): CompiledResult {
  // 将template模板转换AST(Abstract Syntax Tree)抽象语法树:
  const ast = parse(template.trim(), options)
  if (options.optimize !== false) {
    // 对AST节点进行静态节点标记.处理静态不参与重复渲染的模版片段
    optimize(ast, options)
  }
  // 代码生成器。基于AST，生成js函数，延迟到运行时运行，生成纯HTML
  const code = generate(ast, options)
  return {
    ast,
    render: code.render,
    staticRenderFns: code.staticRenderFns
  }
})
