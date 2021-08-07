import { execSync } from 'child_process'
import { isString, startsWith, endsWith } from 'lodash'
import { Plugin } from 'vite'

export default function vitePluginEslintOnSave(lintOnSave: boolean, isBuild: boolean): Plugin {
    return {
        name: 'vite-plugin-eslint-on-save',
        handleHotUpdate({ file, server }) {
            if (isBuild || !lintOnSave) {
                return
            }
            const checkFileType = ['vue', 'ts', 'tsx']
            let showLint = isString(file) && startsWith(file, server.config.root + '/src')
            if (showLint) {
                let isCheckFile = false
                for (let item of checkFileType) {
                    if (endsWith(file, item)) {
                        isCheckFile = true
                        break
                    }
                }
                showLint = isCheckFile
            }
            if (showLint) {
                setTimeout(() => {
                    try {
                        // const url = `http://localhost:${server.config.server.port}${server.config.base}`
                        // console.log(`Local: ${url}`)
                        execSync('npx eslint ' + file, { stdio: [0, 1, 2] })
                    } catch (e) {
                    }
                })
            }
        },
    }
}
