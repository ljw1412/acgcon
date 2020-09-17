import { get, post, del, put } from '@/utils/api'

const API = {
  TAG: 'tag',
  TAG_GROUP: 'tag-group',
  TAG_ORDER_UPDATE: 'tag/update_order'
}

export function fetchTagGroupList(acgType: string, subType: string) {
  return get(API.TAG_GROUP, { acgType, subType })
}

interface BaseTagOption {
  groupId: string
  acgType: string
  subType: string
}

interface UpdateTagOrderOption extends BaseTagOption {
  list: string[]
}

export function updateTagOrder(opt: UpdateTagOrderOption) {
  return post(API.TAG_ORDER_UPDATE, opt)
}

interface DeleteTagOption extends BaseTagOption {
  id: string
}

export function deleteTag(opt: DeleteTagOption) {
  return del(`${API.TAG}/${opt.id}`, opt)
}
