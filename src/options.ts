import {createApp} from 'vue'
import options from './views/options/options.vue'
import {store} from './views/store/store'

createApp(options)
  .use(store)
  .mount('#app')
