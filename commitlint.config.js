//commit提交信息规范
export default {
  ignores: [commit => commit.includes('init')],
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [2, 'always', ['feat', 'fix', 'docs', 'style']],
    'subject-min-length': [2, 'always', 5] // 描述至少 5 个字符
  }
}
