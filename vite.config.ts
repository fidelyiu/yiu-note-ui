import { ConfigEnv, UserConfig } from 'vite'
import { loadEnvByMode, pathResolve } from './build/build-tools'
import { createProxy } from './build/vite/proxy'
import { OUTPUT_DIR } from './build/constant'
import { createVitePlugins } from './build/vite/plugin'

export default ({ command, mode }: ConfigEnv): UserConfig => {
    const viteEnv = loadEnvByMode(mode)
    const { VITE_PORT, VITE_PUBLIC_PATH, VITE_PROXY, VITE_DROP_CONSOLE } = viteEnv
    const isBuild = command === 'build'
    return {
        base: VITE_PUBLIC_PATH,
        resolve: {
            alias: [
                {
                    find: 'vue-i18n',
                    replacement: 'vue-i18n/dist/vue-i18n.cjs.js',
                },
                // /@/xxxx => src/xxxx
                {
                    find: /\/@\//,
                    replacement: pathResolve('src') + '/',
                },
                // /#/xxxx => types/xxxx
                {
                    find: /\/#\//,
                    replacement: pathResolve('types') + '/',
                },
            ],
        },
        server: {
            port: VITE_PORT,
            proxy: createProxy(VITE_PROXY),
        },
        build: {
            target: 'es2015',
            outDir: OUTPUT_DIR,
            terserOptions: {
                compress: {
                    keep_infinity: true,
                    drop_console: VITE_DROP_CONSOLE,
                },
            },
            brotliSize: false,
            chunkSizeWarningLimit: 2000,
        },
        // vue-i18-next
        // define: {
        //     __VUE_I18N_LEGACY_API__: false,
        //     __VUE_I18N_FULL_INSTALL__: false,
        //     __INTLIFY_PROD_DEVTOOLS__: false,
        // },
        css: {
            preprocessorOptions: {
                less: {
                    javascriptEnabled: true,
                },
            },
        },
        plugins: createVitePlugins(viteEnv, isBuild),
        optimizeDeps: {
            include: [
                'moment/dist/locale/zh-cn',
                'moment/dist/locale/eu',
            ],
            exclude: ['vue-demi'],
        },
    }
}
