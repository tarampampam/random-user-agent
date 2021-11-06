import {Store} from 'vuex'
import {State} from './store'

declare module '@vue/runtime-core' { // FIXME how to make it scoped only for the options page?
  // provide typings for `this.$store`
  interface ComponentCustomProperties {
    $store: Store<State>
  }
}
