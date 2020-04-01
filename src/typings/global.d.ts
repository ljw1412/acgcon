import { RawLocation } from 'vue-router'

declare global {
  namespace Acgcon {
    type Types = 'animation' | 'comic' | 'game'
    type NavigationItem = {
      label: string
      type?: string
      to?: RawLocation
    }
  }

  interface ResizeObserverEntry {
    target: EventTarget
    contentRect: DOMRectReadOnly
  }
}
