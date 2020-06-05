const USER_SESSION_NAME = 'acg-user'

export function get() {
  return JSON.parse(localStorage.getItem(USER_SESSION_NAME) || '{}')
}

export function set(user: Record<string, any>) {
  localStorage.setItem(USER_SESSION_NAME, JSON.stringify(user))
}
