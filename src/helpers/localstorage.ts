export function getItem(key: string, defaultValue: any = null) {
  const value = localStorage.getItem(key)
  if (!value) return defaultValue
  if (value.startsWith('{') && value.endsWith('}')) {
    try {
      return JSON.parse(value)
    } catch (error) {
      return defaultValue
    }
  }
  return value
}

export function setItem(key: string, value: any) {
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  localStorage.setItem(key, value)
}

export function createStore(key: string) {
  return {
    set: function(value: any) {
      setItem(key, value)
    },
    get: function(defaultValue: any = null) {
      return getItem(key, defaultValue)
    }
  }
}
