import { Component, Vue } from 'vue-property-decorator'

@Component
export default class AcgVue extends Vue {
  get acgType() {
    return this.$route.params.acgType
  }
}
