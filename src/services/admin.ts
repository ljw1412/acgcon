import { get, post, del, put } from '@/utils/api'

const API = { CACHE: 'cache' }

export function fetchCacheList(data: Record<string, any>) {
  return get(API.CACHE, data)
}

export function fetchCache(key: string) {
  return get(`${API.CACHE}/${key}`)
}

export function delCache(key: string) {
  return del(`${API.CACHE}/${key}`)
}
