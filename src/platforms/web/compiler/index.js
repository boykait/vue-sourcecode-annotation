/* @flow */

import { baseOptions } from './options'
import { createCompiler } from 'compiler/index' // src/compiler/index.js

// 提供将template模板编译成为render函数
const { compile, compileToFunctions } = createCompiler(baseOptions)

export { compile, compileToFunctions }
