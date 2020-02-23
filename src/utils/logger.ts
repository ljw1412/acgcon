export function getLogger(name: string) {
  return {
    log: (...args: any[]) => {
      console.log(`[${name}]`, ...args)
    },
    error: (...args: any[]) => {
      console.error(`[${name}]`, ...args)
    },
    warn: (...args: any[]) => {
      console.warn(`[${name}]`, ...args)
    }
  }
}
