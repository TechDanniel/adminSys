import js from '@eslint/js'
import pluginPrettier from 'eslint-plugin-prettier'
import * as parserTypeScript from '@typescript-eslint/parser'
import pluginTypeScript from '@typescript-eslint/eslint-plugin'
import pluginVue from 'eslint-plugin-vue'
import * as parserVue from 'vue-eslint-parser'
import configPrettier from 'eslint-config-prettier'

export default [
  //基础配置
  {
    // 导入并展开推荐配置s
    ...js.configs.recommended,
    ignores: ['dist/*', '*d.ts', 'public/*', 'src/asstes/**', 'src/**/iconfont/**'],
    languageOptions: {
      //声明项目中已存在的全局变量，避免 ESLint 误报 no-undef 错误
      globals: {
        ElRef: 'readonly',
        PropType: 'readonly',
        Nullable: 'readonly'
      }
    },
    //使用 eslint-plugin-prettier 插件，将 Prettier 的格式化规则作为 ESLint 规则执行。
    plugins: {
      prettier: pluginPrettier
    },
    rules: {
      //继承 Prettier 配置
      ...configPrettier.rules,
      //忽略未使用的变量
      'no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_'
        }
      ],
      //将prettier的格式化检查作为eslint的一部分，如果代码不符合prettier的格式，会报错.解决二者冲突
      'prettier/prettier': [
        'error',
        {
          //自动根据操作系统或者现有文件的换行符（LF 或 CRLF）来决定，不强制替换换行符风格。
          endOfLine: 'auto'
        }
      ]
    }
  },
  //typescript配置
  {
    files: ['**/*.?([cm])ts', '**/*.?([cm])tsx'],
    languageOptions: {
      //使用 @typescript-eslint/parser 解析 TypeScript 代码。
      parser: parserTypeScript,
      parserOptions: {
        sourceType: 'module',
        warnOnUnsupportedTypeScriptVersion: true
      }
    },
    plugins: {
      //一定要声明，声明了才能在规则中使用和解析
      '@typescript-eslint': pluginTypeScript
    },
    rules: {
      //启用严格类型检查规则
      ...pluginTypeScript.configs.strict.rules,
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_'
        }
      ],
      //关闭禁止特定类型(如{}，object，Function)的规则
      '@typescript-eslint/ban-types': 'off',
      //报错，禁止变量重复声明
      '@typescript-eslint/no-redeclare': 'error',
      //关闭禁止使用any类型规则
      '@typescript-eslint/no-explicit-any': 'off',
      //关闭禁止使用非空断言(!)的规则
      '@typescript-eslint/no-non-null-assertion': 'off',
      //关闭禁止使用不安全的函数类型的规则（函数类型不明确）
      '@typescript-eslint/no-unsafe-function-type': 'off',
      //关闭禁止delete obj[key];动态删除属性
      '@typescript-eslint/no-dynamic-delete': 'off',
      //关闭未使用表达式检查
      '@typescript-eslint/no-unused-expressions': 'off',
      //关闭未使用表达式的报错
      '@typescript-eslint/prefer-literal-enum-member': ['error', { allowBitwiseExpressions: true }]
    }
  },
  {
    files: ['**/*.d.ts'],
    rules: {
      //关闭未使用变量的报错
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-empty-object-type': 'off'
    }
  },
  //针对所有js文件，包括commonJS/ESM(*.js,*.cjs,*.mjs)
  {
    files: ['**/*.?([cm])js'],
    rules: {
      //关闭 require 的报错
      '@typescript-eslint/no-require-imports': 'off',
      '@typescript-eslint/no-var-requires': 'off'
    }
  },
  {
    files: ['**/*.vue'],
    ...pluginVue.configs['vue3-recommended'],
    languageOptions: {
      parser: parserVue,
      parserOptions: {
        parser: parserTypeScript, // 嵌套 TypeScript 解析器用于 <script lang="ts">
        ecmaFeatures: { jsx: true },
        extraFileExtensions: ['.vue'],
        sourceType: 'module'
      }
    },
    plugins: {
      vue: pluginVue
    },
    rules: {
      //关闭未使用变量的检查（通常交给TypeScript处理）
      'no-unused-vars': 'off',
      //允许组件名未单词（不是多词）
      'vue/multi-word-component-names': 'off',
      //关闭setup语法props响应式丢失的警告
      'vue/no-setup-props-reactivity-loss': 'off',
      //不强制要求emits选项显示声明
      'vue/require-explicit-emits': 'off',
      //允许props没有默认值
      'vue/require-default-prop': 'off',
      //关闭强制要求 Vue 组件中所有触发的事件（this.$emit('xxx')）必须在 emits 选项中显式声明。
      "vue/require-explicit-emBluetoothLEScanFilterts": "off",
    }
  }
]
