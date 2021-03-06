import AcgLoginModal from '@/components/AcgLoginModal/index.vue'
import store from '@/store/index'

let instance: any

function initInstance() {
  if (!instance) {
    instance = new AcgLoginModal({
      store,
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
  document.body.style.overflow = 'hidden'
  instance.visible = true
}

function hide() {
  initInstance()
  instance.visible = false
  document.body.removeChild(instance.$el)
  document.body.style.overflow = ''
}

export default { show, hide }
