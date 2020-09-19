import { get, post, del, put } from '@/utils/api'

const API = {
  TAG: 'tag',
  TAG_GROUP: 'tag-group',
  TAG_GROUP_ORDER_UPDATE: 'tag-group/update_order',
  TAG_ORDER_UPDATE: 'tag/update_order'
}

export function fetchTagGroupList(acgType: string, subType: string) {
  return get(API.TAG_GROUP, { acgType, subType })
}

interface BaseTagOption {
  acgType: string
  subType: string
}

interface UpdateTagGroupOrderOption extends BaseTagOption {
  list: string[]
}

interface UpdateTagOrderOption extends BaseTagOption {
  groupId: string
  list: string[]
}

interface DeleteTagOption extends BaseTagOption {
  groupId: string
  id: string
}

export function updateTagGroupOrder(opt: UpdateTagGroupOrderOption) {
  return post(API.TAG_GROUP_ORDER_UPDATE, opt)
}

export function updateTagOrder(opt: UpdateTagOrderOption) {
  return post(API.TAG_ORDER_UPDATE, opt)
}

export function deleteTag(opt: DeleteTagOption) {
  return del(`${API.TAG}/${opt.id}`, opt)
}
