import async from './async'
import sync from './sync'
import combinator from './combinator'

export type { PayloadAction } from '@reduxjs/toolkit'
export type { AsyncState } from './async'

export { setFunctionName } from './name'

// const hook = async(() => Promise.resolve([1])).hook
// const u = hook()
// u[1]()

export default {
  sync,
  async,
  reducer: combinator.combine
}
