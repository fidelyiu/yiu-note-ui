/**
 * 一个为index.html提供minify和基于EJS模板功能的Vite插件。
 * https://github.com/anncwb/vite-plugin-html
 */
import html from 'vite-plugin-html'
import { Config } from '/#/config'

export function configHtmlPlugin(env: Config.ViteEnv, isBuild: boolean) {
    const { VITE_GLOB_APP_TITLE } = env

    return html({
        minify: isBuild,
        inject: {
            injectData: {
                title: VITE_GLOB_APP_TITLE,
            },
        },
    })
}
