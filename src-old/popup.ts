import { createApp } from 'vue'
import popup from './views/popup/popup.vue'
import {store} from './views/store/store'

createApp(popup)
  .use(store)
  .mount('#app')
