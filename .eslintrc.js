module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:vue/vue3-essential',
        'plugin:vue/vue3-recommended',
        'plugin:vue/vue3-strongly-recommended',
        'plugin:@typescript-eslint/recommended',
    ],
    parser: 'vue-eslint-parser',
    parserOptions: {
        ecmaVersion: 12,
        parser: '@typescript-eslint/parser',
        sourceType: 'module',
    },
    plugins: [
        'vue',
        '@typescript-eslint',
    ],
    rules: {
        // 属性可换行，或不换行
        'vue/max-attributes-per-line': [
            2,
            {
                'singleline': 5,
                'multiline': {
                    'max': 1,
                    'allowFirstLine': true,
                },
            },
        ],
        // 结尾>不需要换行，0个换行
        'vue/html-closing-bracket-newline': 0,
        // 结尾/>不需要空格
        'vue/html-closing-bracket-spacing': 0,
        // 简单元素内容新起一行
        'vue/singleline-html-element-content-newline': 0,
        // 禁止元素自己关闭
        'vue/html-self-closing': 'off',
        '@typescript-eslint/ban-types': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        // 方法没有返回值
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        // vue的html缩进
        'vue/html-indent': 'off',
        // eslint默认的未引用变量检查
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': [
            'error',
            { 'argsIgnorePattern': '^_' },
        ],
        // 允许使用!，非零断言
        '@typescript-eslint/no-non-null-assertion': 'off',
        // 空花括号
        'no-empty': 'off',
        // 使用v-html
        'vue/no-v-html': 'off',
    },
}
