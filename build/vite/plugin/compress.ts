/**
 * 用于打包和输出gzip。请注意，这在Vite中无法正常运行，具体原因仍在调查中
 * https://github.com/anncwb/vite-plugin-compression
 */
import type { Plugin } from 'vite'

import compressPlugin from 'vite-plugin-compression'

export function configCompressPlugin(
    compress: 'gzip' | 'brotli' | 'none',
    deleteOriginFile = false,
): Plugin | Plugin[] {
    const compressList = compress.split(',')

    const plugins: Plugin[] = []

    if (compressList.includes('gzip')) {
        plugins.push(
            compressPlugin({
                ext: '.gz',
                deleteOriginFile,
            }),
        )
    }
    if (compressList.includes('brotli')) {
        plugins.push(
            compressPlugin({
                ext: '.br',
                algorithm: 'brotliCompress',
                deleteOriginFile,
            }),
        )
    }
    return plugins
}
