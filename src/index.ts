import async from './async'
import sync from './sync'
import combinator from './combinator'
import use, { bindState } from './use'
import store, { bindStore } from './store'

export type { PayloadAction } from '@reduxjs/toolkit'
export type { AsyncState } from './async'

export { setFunctionName } from './name'
export { Combinator } from './combinator'

export default {
  sync,
  async,
  use,
  bindState,
  store,
  bindStore,
  reducer: combinator.combine,
}
