import { RawLocation } from 'vue-router'

declare global {
  namespace Acgcon {
    type Types = 'animation' | 'comic' | 'game'
    type NavigationItem = {
      label: string
      type?: string
      to?: RawLocation
    }
    type BaikeItem = {
      _id: string | number
      title: string
      author: string
      cover: string
      desc: string
      tags?: { name: string; color?: string; textColor?: string }[]
      basic?: { name: string; value: string }[]
    }
  }

  interface ResizeObserverEntry {
    target: EventTarget
    contentRect: DOMRectReadOnly
  }
}
