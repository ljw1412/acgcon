import Vue from 'vue'

export function groupNamePrompt(oldName = '') {
  return Vue.prototype.$modal.prompt({
    title: `${oldName ? '修改' : '新增'}标签组名称`,
    content: '请输入标签组名称',
    defaultValue: oldName,
    rules: { test: /^.{1,8}$/, message: '请输入1-8个字符' }
  })
}
