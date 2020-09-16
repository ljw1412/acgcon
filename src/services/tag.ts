import { get, post, del, put } from '@/utils/api'

const API = { TAG_GROUP: 'tag-group' }

export function fetchTagGroupList(acgType: string, subType: string) {
  return get(API.TAG_GROUP, { acgType, subType })
}
