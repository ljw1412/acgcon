<template>
  <ul class="start-information">
    <li v-for="item of list"
      :key="item._id">
      <a target="_blank"
        class="information-content acg-clickable"
        :title="item.title"
        :href="item.url">
        <mz-icon :name="item.icon"
          class="information-type-icon"
          size="1.2em"></mz-icon>
        <!-- <span class="information-type">[{{item.acgTypeCN}}]</span> -->
        <span class="information-title">{{item.title}}</span>
        <span class="information-from">{{item.fromCN}}</span>
      </a>
    </li>
  </ul>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { acgTypeMap, fromMap, acgTypeIconMap } from '@/configs/constants'

@Component
export default class StartInformation extends Vue {
  list = []

  async fetchList() {
    const list = await this.$get('information/lastest', {
      params: { count: 20 }
    })
    list.forEach((item: any) => {
      item.icon = acgTypeIconMap[item.acgType as Acgcon.Types]
      item.acgTypeCN = acgTypeMap[item.acgType as Acgcon.Types]
      item.fromCN = fromMap[item.from] || item.from
    })
    this.list = list
  }

  created() {
    this.fetchList()
  }
}
</script>

<style lang="scss">
.start-information {
  padding: 3px 8px;

  li {
    font-size: 14px;
    font-weight: 500;
    line-height: 30px;
    a {
      color: $color-text-primary;
      transition: color 0.05s;
      &:hover {
        color: $color-primary;
        text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.25);
        font-weight: 700;
      }
      > span + span {
        margin-left: 5px;
      }
    }
  }
}

.information-content {
  display: flex;
  align-items: center;
}

.information-type,
.information-type-icon {
  flex-shrink: 0;
  margin-right: 3px;
}
.information-title {
  @include ellipsis;
  flex: 1 0 auto;
  width: 0;
}
.information-from {
  flex-shrink: 0;
  font-size: 12px;
  min-width: 50px;
  text-align: right;
}

:root[data-theme='dark'] {
  .start-information li > a:hover {
    color: $color-danger;
  }
}
</style>
