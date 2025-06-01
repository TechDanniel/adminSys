#加载项目自定义的公共脚本
. "$(dirname "$0")/common.sh"
#如果在CI环境中跳过检查
[ -n "$CI" ] && exit 0

#更新环境变量path
PATH="D:/node/node_global:$PATH"
# 通过 .lintstagedrc 配置对暂存区文件执行 lint 检查
#lint-staged 是一个在 Git 代码提交（commit）前对暂存区（staged）文件执行 lint 检查和自动修复的工具。
pnpm exec lint-staged