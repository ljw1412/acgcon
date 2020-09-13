import { get, post, del, put } from '@/utils/api'

const API = {
  INFORMATION: 'information',
  INFORMATION_ORIGINS: 'information/origins'
}

export function fetchInformationList(data?: any) {
  return get(API.INFORMATION, data)
}

export function fetchInformationOrigins(acgType: string) {
  return get(API.INFORMATION_ORIGINS, { acgType })
}
