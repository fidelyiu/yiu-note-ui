export namespace Config {
    /**
     * 环境变量
     */
    export interface ViteEnv extends GlobVarEnv {
        VITE_PORT: number;
        VITE_USE_MOCK: boolean;
        VITE_USE_PWA: boolean;
        VITE_PUBLIC_PATH: string;
        VITE_PROXY: [string, string][];
        VITE_USE_CDN: boolean;
        VITE_DROP_CONSOLE: boolean;
        VITE_BUILD_COMPRESS: 'gzip' | 'brotli' | 'none';
        VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE: boolean;
        VITE_LEGACY: boolean;
        VITE_USE_IMAGEMIN: boolean;
        VITE_GENERATE_UI: string;
        VITE_LINT_ON_SAVE: boolean;
    }

    /**
     * 全局变量-环境变量
     */
    export interface GlobVarEnv {
        // 网站标题
        VITE_GLOB_APP_TITLE: string;
        // api地址
        VITE_GLOB_API_URL: string;
        // url前缀
        VITE_GLOB_API_URL_PREFIX?: string;
        // 项目简称
        VITE_GLOB_APP_SHORT_NAME: string;
        // 上传文件地址
        VITE_GLOB_UPLOAD_URL?: string;
    }

    /**
     * 全局变量
     */
    export interface GlobVar {
        // 网站标题
        title: string;
        // api地址
        apiUrl: string;
        // 上传文件地址
        uploadUrl?: string;
        // url前缀
        urlPrefix?: string;
        // 项目简称
        shortName: string;
    }
}
