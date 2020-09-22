import { get, post, del, put } from '@/utils/api'

const API = {
  TAG: 'tag',
  TAG_GROUP: 'tag-group',
  TAG_GROUP_RENAME: 'tag-group/rename',
  TAG_GROUP_ORDER_UPDATE: 'tag-group/update_order',
  TAG_GROUP_MULTIPLE_UPDATE: 'tag-group/update_multiple',
  TAG_GROUP_RESET_CACHE: 'tag-group/reset_cache',
  TAG_ORDER_UPDATE: 'tag/update_order'
}

export function fetchTagGroupList(acgType: string, subType: string) {
  return get(API.TAG_GROUP, { acgType, subType })
}

interface BaseTagOption {
  acgType: string
  subType: string
}

interface CreateTagGroupOption extends BaseTagOption {
  name: string
}

interface DeleteTagGroupOption extends BaseTagOption {
  groupId: string
}

interface UpdateTagGroupOrderOption extends BaseTagOption {
  list: string[]
}

interface UpdateTagOrderOption extends BaseTagOption {
  groupId: string
  list: string[]
}

interface UpdateTagGroupMultipleOption extends BaseTagOption {
  groupId: string
  state: boolean
}

interface DeleteTagOption extends BaseTagOption {
  groupId: string
  id: string
}

interface AddTagOption extends BaseTagOption {
  groupId: string
  name: string
}

export function resetTagGroupCache(opt: BaseTagOption) {
  return post(API.TAG_GROUP_RESET_CACHE, opt)
}

export function createTagGroup(opt: CreateTagGroupOption) {
  return post(API.TAG_GROUP, opt)
}

export function deleteTagGroup(opt: DeleteTagGroupOption) {
  return del(`${API.TAG_GROUP}/${opt.groupId}`, opt)
}

export function renameTagGroup(opt: AddTagOption) {
  return post(API.TAG_GROUP_RENAME, opt)
}

export function updateTagGroupMultiple(opt: UpdateTagGroupMultipleOption) {
  return post(API.TAG_GROUP_MULTIPLE_UPDATE, opt)
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

export function addTag(opt: AddTagOption) {
  return post(API.TAG, opt)
}
