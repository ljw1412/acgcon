import { Component, Vue, Prop } from 'vue-property-decorator'
import { CreateElement } from 'vue/types/umd'
const actionList = [
  {
    title: '编辑',
    value: 'edit',
    class: '',
    prefixIcon: 'hammer-outline'
  },
  {
    title: '排序',
    value: 'sort',
    class: '',
    prefixIcon: 'swap-horizontal-outline'
  },
  {
    title: '删除',
    value: 'delete',
    class: 'tag-group-delete',
    prefixIcon: 'trash-outline'
  }
]

const stateIconMap = {
  normal: [
    {
      tips: '操作',
      name: 'ellipsis-horizontal-circle',
      class: '',
      action: ''
    }
  ],
  edit: [
    {
      tips: '完成',
      name: 'checkmark-circle-outline',
      class: 'text-success',
      action: 'edit-end'
    }
  ],
  'group-sort': [
    {
      tips: '',
      name: 'reorder-three',
      class: 'tag-group-reorder cursor-grab',
      action: ''
    }
  ],
  'tag-sort': [
    {
      tips: '取消',
      name: 'close-circle-outline',
      class: 'text-danger',
      action: 'tag-sort-cancel'
    },
    {
      tips: '保存',
      name: 'checkmark-circle-outline',
      class: 'text-success',
      action: 'tag-sort-save'
    }
  ]
}

@Component
export default class AdminFilterTagGroupAction extends Vue {
  @Prop(String)
  readonly state!: 'normal' | 'edit' | 'group-sort' | 'tag-sort'

  get isNormal() {
    return !['edit', 'group-sort', 'tag-sort'].includes(this.state)
  }

  get icons() {
    const state = this.isNormal ? 'normal' : this.state
    return stateIconMap[state] || []
  }

  handleAction(action: string) {
    action && this.$emit('action', action)
  }

  renderOption() {
    return (
      <mz-dropdown-menu
        arrow
        width="120px"
        class="d-flex"
        data={actionList}
        on-action={this.handleAction}>
        {this.renderIcons()}
      </mz-dropdown-menu>
    )
  }

  renderIcons() {
    return this.icons.map(icon => (
      <mz-icon
        v-tooltip={icon.tips}
        name={icon.name}
        class={[icon.class, { 'acg-clickable': this.state !== 'group-sort' }]}
        size="22"
        on-click={this.handleAction.bind(this, icon.action)}></mz-icon>
    ))
  }

  render(h: CreateElement) {
    if (this.isNormal) {
      return this.renderOption()
    }
    return <div class="d-flex">{this.renderIcons()}</div>
  }
}
