import AcgLoginModal from '@/components/AcgLoginModal/index.vue'

let instance: any

function initInstance() {
  if (!instance) {
    instance = new AcgLoginModal({
      el: document.createElement('div'),
      propsData: { afterClose: hide }
    })

    instance.$on('visible:change', (visible: boolean) => {
      instance.visible = visible
    })

    instance.$on('hide', hide)
  }
}

function show() {
  initInstance()
  document.body.appendChild(instance.$el)
  instance.visible = true
}

function hide() {
  initInstance()
  instance.visible = false
  document.body.removeChild(instance.$el)
}

export default { show, hide }
