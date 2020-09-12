import { get, post, del, put } from '@/utils/api'

const API = { BING_BACKGROUND: 'basic/bg_bing' }

export async function fetchBingBackground() {
  return get(API.BING_BACKGROUND)
}
