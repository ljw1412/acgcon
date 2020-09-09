import { get, post, del, put } from '@/utils/api'

const API = { INFORMATION: 'information' }

export function fetchInformationList(data?: any) {
  return get(API.INFORMATION, data)
}
