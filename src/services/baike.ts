import { get, post, del, put } from '@/utils/api'

const API = {
  BAIKE: 'baike'
}

interface BaikeListOption {
  acgType: string
  subType: string
  tags: string[]
  pageIndex: number
  pageSize: number
}

export function fetchBaikeList(opt: BaikeListOption) {
  return get(API.BAIKE, opt)
}
