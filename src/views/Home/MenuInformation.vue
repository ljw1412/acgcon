<template>
  <ul class="acg-menu-information py-3 px-8">
    <li v-for="item of informationList"
      class="fs-14 lh-30"
      :key="item._id">
      <a target="_blank"
        class="acg-clickable d-flex align-items-center text-gray-dark"
        :title="item.title"
        :href="item.url">
        <mz-icon :name="item.icon"
          class="icon flex-shrink-0 mr-3"
          size="1.2em"></mz-icon>
        <span class="title">{{item.title}}</span>
        <span class="origin">{{item.originCN}}</span>
      </a>
    </li>
  </ul>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { fetchInformationList } from '@/services/information'
import { acgTypeIconMap } from '@/helpers/acg'

@Component
export default class AcgMenuInformation extends Vue {
  informationList = []

  async fetchList() {
    const { list } = await fetchInformationList()
    list.forEach((item: any) => {
      item.icon = acgTypeIconMap[item.acgType as Acgcon.Types]
    })
    this.informationList = list
  }

  created() {
    this.fetchList()
  }
}
</script>

<style lang="scss">
.acg-menu-information {
  li {
    font-weight: 500;
    a {
      transition: all 0.05s;
      &:hover {
        opacity: 1;
        color: $primary;
        text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.25);
        font-weight: 700;
      }
    }

    > span + span {
      margin-left: 5px;
    }
  }

  .title {
    @include text-truncate;
    flex: 1 0 auto;
    width: 0;
  }

  .origin {
    flex-shrink: 0;
    font-size: 12px;
    min-width: 50px;
    text-align: right;
  }
}

:root[data-theme='dark'] {
  .acg-menu-information li > a:hover {
    color: $danger;
  }
}
</style>
