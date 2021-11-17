import async from './async'
import sync from './sync'
import combinator from './combinator'
import bindState, { use } from './bindState'

export type { PayloadAction } from '@reduxjs/toolkit'
export type { AsyncState } from './async'

export { setFunctionName } from './name'
export { Combinator } from './combinator'

export default {
  sync,
  async,
  use,
  bindState,
  reducer: combinator.combine
}
