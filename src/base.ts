import { VueConstructor } from 'vue'
import '@/styles/global.scss'
import '@ljw1412/ionicons-sprite'
import manzhaiUI from 'manzhai-ui'

import * as directives from './directives'

import draggable from 'vuedraggable'

const plugins = [manzhaiUI]
const components: Record<string, VueConstructor> = { Draggable: draggable }
const prototypes: Record<string, any> = {}

function installPlugins(Vue: VueConstructor) {
  plugins.forEach(plugin => Vue.use(plugin))
}

function registerComponents(Vue: VueConstructor) {
  Object.keys(components).forEach(key => Vue.component(key, components[key]))
}

function addPrototypes(Vue: VueConstructor) {
  Object.keys(prototypes).forEach(key => {
    Vue.prototype[key] = prototypes[key]
  })
}

function addDirectives(Vue: VueConstructor) {
  Object.keys(directives).forEach(key => {
    Vue.directive(key, directives[key as keyof typeof directives])
  })
}

export default function(Vue: VueConstructor) {
  installPlugins(Vue)
  registerComponents(Vue)
  addPrototypes(Vue)
  addDirectives(Vue)
}
