/**
 * 因为vite启动前是不能 `import` 第三方 ES 包，但是可以 `import` 第三方 CommonJS包。
 * 所以这里在本地将一些工具类函数编写在这，共 `vite.config.ts` 和 `vite`插件配置时 使用。
 *
 * 源码中为以下代码的是ES代码,在vite启动前会报错:`Error [ERR_REQUIRE_ESM]: Must use import to load ES Module:`
 * 该报错，可以通过`package.json`中的`"type": "module"`来解决，但是后续可能会出现更多的问题。
 * import toString from './toString.js';
 *
 * 源码中为以下代码的是CommonJS代码,在vite启动前是可以导入的:
 * var baseClamp = require('./_baseClamp');
 */
import { resolve } from 'path'
import { loadEnv } from 'vite'
import { Config } from '/#/config'

/**
 * 将路径和根目录拼接
 */
export function pathResolve(dir: string) {
    return resolve(process.cwd(), '.', dir)
}

/**
 * 根据模式加载环境变量对象
 */
export function loadEnvByMode(mode: string): Config.ViteEnv {
    return wrapperEnvObj(loadEnv(mode, process.cwd()))
}

/**
 * 格式化字符串对象
 *
 * 比如env对象的value都是字符串，需要字符串`'true'`转换成`true`
 */
export function wrapperEnvObj(obj: Recordable): Config.ViteEnv {
    const ret: any = {}

    for (const key of Object.keys(obj)) {
        // 去换行
        let value = obj[key].replace(/\\n/g, '\n')
        // 处理boolean
        value = value === 'true' ? true : value === 'false' ? false : value

        if (key === 'VITE_PORT') {
            value = Number(value)
        }
        if (key === 'VITE_PROXY') {
            try {
                value = JSON.parse(value)
            } catch (error) {
            }
        }
        ret[key] = value
        // 修改进程内环境变量
        process.env[key] = value
    }
    return ret
}
