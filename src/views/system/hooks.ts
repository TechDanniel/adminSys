// 抽离可公用的工具函数等用于系统管理页面逻辑
import { computed } from "vue";

export function usePublicHooks() {

  const switchStyle = computed(() => {
    return {
      "--el-switch-on-color": "#6abe39",
      "--el-switch-off-color": "#e84749"
    };
  });

  const tagStyle = computed(() => {
    return (status: number) => {
      return status === 1
        ? {
            "--el-tag-text-color": "#389e0d",
            "--el-tag-bg-color":  "#f6ffed",
            "--el-tag-border-color": "#b7eb8f"
          }
        : {
            "--el-tag-text-color": "#cf1322",
            "--el-tag-bg-color":   "#fff1f0",
            "--el-tag-border-color":  "#ffa39e"
          };
    };
  });

  return {
    /** 表现更鲜明的`el-switch`组件  */
    switchStyle,
    /** 表现更鲜明的`el-tag`组件  */
    tagStyle
  };
}
