import { RawLocation } from 'vue-router'

declare global {
  namespace Acgcon {
    type Types = 'animation' | 'comic' | 'game'
    type NavigationItem = {
      label: string
      to?: RawLocation
    }
  }
}
