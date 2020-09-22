import { get, post, del, put } from '@/utils/api'

const API = {
  BING_BACKGROUND: 'basic/bg_bing',
  ACG_BASE_CONFIG: 'basic/acg_base_config'
}

export function fetchBingBackground() {
  return get(API.BING_BACKGROUND)
}

export function fetchBaseConfig() {
  return get(API.ACG_BASE_CONFIG)
}
