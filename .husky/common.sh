#!/bin/sh
#解决windows上的Git Bash环境的兼容性补丁
#winpty 会模拟 Linux 终端环境
command_exists () {
  command -v "$1" >/dev/null 2>&1
}

#command_exists winpty：检查系统是否安装了 winpty（说明这是一个 Windows 环境）。
#test -t 1：检查当前是否是一个交互式终端会话（即用户正在终端中直接执行命令）。
# /dev/tty 是 Linux 中代表当前终端设备的特殊文件。
# 强制将命令的 ** 标准输入（stdin）** 重定向到当前终端设备，确保命令能正确接收用户的键盘输入。
if command_exists winpty && test -t 1; then
  exec < /dev/tty
fi
