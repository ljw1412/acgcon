import { get, post, del, put } from '@/utils/api'

const API = { FETCH_BING_BACKGROUND: 'basic/bg_bing' }

export async function fetchBingBackground() {
  return get(API.FETCH_BING_BACKGROUND)
}
