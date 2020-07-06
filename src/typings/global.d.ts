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
      _id?: string | number
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

    interface BaikeSectionImage {
      type: 'image'
      data: string
      style?: string
    }

    interface BaikeSectionTable {
      type: 'table'
      data: any[]
      style?: string
    }
    interface BaikeSectionLeftRight {
      type: 'left-right'
      left: BaikeSectionItem
      right: BaikeSectionItem
      style?: string
    }
    type BaikeSectionItem =
      | BaikeSectionText
      | BaikeSectionImage
      | BaikeSectionTable
      | BaikeSectionLeftRight

    interface BaikeSectionItemTypeMap {
      html: BaikeSectionText
      text: BaikeSectionText
      image: BaikeSectionImage
      table: BaikeSectionTable
      'left-right': BaikeSectionLeftRight
    }

    interface BaikeSection {
      title: string
      items: BaikeSectionItem[]
    }

    interface TagGroup {
      _id: string
      name: string
      acgType: string
      type: string
      icon: string
      order: string
      tags: Tag[]
      multiple: boolean
    }

    interface Tag {
      _id: string
      name: string
      order: string
      isAll: boolean
      checked?: boolean
    }
  }

  interface Window {
    $acg: Record<string, any>
  }
}
