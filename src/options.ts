import {createApp} from 'vue'
import root from './views/options/options.vue'
import {store} from './views/options/store'

createApp(root)
  .use(store)
  .mount('#app')
