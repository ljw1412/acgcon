import Vue from 'vue'

interface AdminFilterVue extends Vue {
  baseParams: Record<string, any>
}

export class TagGroupManager {
  vm!: AdminFilterVue

  constructor(vm: AdminFilterVue) {
    this.vm = vm
  }

  get baseParams() {
    return this.vm.baseParams || {}
  }

  async create() {
    try {
      const name = await this.vm.$modal.prompt({
        title: '新增标签组',
        content: '请输入标签组名称',
        rules: { test: /.{1,8}/, message: '请输入1-8个字符' }
      })
      return await this.vm.$post('tag-group', { name, ...this.baseParams })
    } catch (error) {
      return null
    }
  }

  async list() {
    return await this.vm.$get('tag-group', { params: this.baseParams })
  }

  async delete(item: Record<string, any>) {
    try {
      await this.vm.$modal.confirm({
        width: '400px',
        title: '警告',
        content: `确认删除标签组“${item.name}”吗？(此操作会删除所有该标签组下面的标签)`,
        confirm: { color: 'danger' }
      })
      await this.vm.$del(`tag-group/${item._id}`, { data: this.baseParams })
      return item
    } catch (error) {
      return null
    }
  }

  async rename(groupId: string, oldName: string) {
    try {
      const name = await this.vm.$modal.prompt({
        title: '修改标签组名称',
        content: '请输入标签组名称',
        defaultValue: oldName,
        rules: { test: /.{1,8}/, message: '请输入1-8个字符' }
      })

      const { nModified } = await this.vm.$post('tag-group/rename', {
        name,
        groupId,
        ...this.baseParams
      })
      if (nModified === 0) {
        this.vm.$snackbar.show({
          content: '重命名失败',
          color: 'danger'
        })
        return false
      }
      return name
    } catch (error) {
      return false
    }
  }

  async updateOrder(list: string[]) {
    await this.vm.$post('tag-group/update_order', { list, ...this.baseParams })
  }

  async updateMultiple(groupId: string, state: boolean) {
    try {
      const { nModified } = await this.vm.$post('tag-group/update_multiple', {
        state,
        groupId,
        ...this.baseParams
      })
      if (nModified === 0) {
        this.vm.$snackbar.show({
          content: '修改多选状态失败',
          color: 'danger'
        })
        return false
      }
      return true
    } catch (error) {
      return false
    }
  }

  async resetCache() {
    await this.vm.$post('tag-group/reset_cache', this.baseParams)
    this.vm.$modal.alert('重置缓存成功', '提示')
  }
}

export class TagManager {
  vm!: AdminFilterVue

  constructor(vm: AdminFilterVue) {
    this.vm = vm
  }

  get baseParams() {
    return this.vm.baseParams || {}
  }

  async create(name: string) {
    return await this.vm.$post('tag', { name, ...this.baseParams })
  }

  async delete(tag: Record<string, any>) {
    try {
      await this.vm.$modal.confirm({
        width: '300px',
        title: '警告',
        content: `确认要删除标签“${tag.name}”吗？`,
        confirm: { color: 'danger' }
      })
      return this.vm.$del(`tag/${tag._id}`, { data: this.baseParams })
    } catch (error) {
      return null
    }
  }

  async updateOrder(list: string[]) {
    return await this.vm.$post('tag/update_order', { list, ...this.baseParams })
  }
}

export default { TagGroupManager, TagManager }
