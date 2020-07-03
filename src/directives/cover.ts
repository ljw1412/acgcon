export const cover = {
  inserted() {
    document.documentElement.dataset.fullscreen = ''
  },
  unbind() {
    delete document.documentElement.dataset.fullscreen
  }
}

export default cover
