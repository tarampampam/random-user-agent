import {createStore} from 'vuex'
import {mutations} from './mutations'
import {actions} from './actions'
import {State, state} from './state'

export const store = createStore<State>({
  state: state,
  mutations: mutations,
  actions: actions,
})
