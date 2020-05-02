import { RawLocation } from 'vue-router'

declare global {
  namespace Acgcon {
    type Types = 'animation' | 'comic' | 'game'
    interface NavigationItem {
      label: string
      type?: string
      to?: RawLocation
    }

    interface BaikeData {
      _id: string | number
      title: string
      author: string
      cover: string
      desc: string
      tags?: { name: string; color?: string; textColor?: string }[]
      basic?: { name: string; value: string }[]
    }

    interface BaikeSectionText {
      type: 'html' | 'text'
      data: string
      style?: string
    }
    interface BaikeSectionTable {
      type: 'table'
      data: any[]
      style?: string
    }
    type BaikeSectionItem = BaikeSectionText | BaikeSectionTable
    interface BaikeSection {
      title: string
      items: BaikeSectionItem[]
    }
  }

  interface ResizeObserverEntry {
    target: EventTarget
    contentRect: DOMRectReadOnly
  }

  interface Window {
    $acg: Record<string, any>
  }
}
