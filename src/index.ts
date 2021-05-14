import async from './async'
import sync from './sync'
import combinator from './combinator'
import { setFunctionName } from './name'

export type { PayloadAction } from '@reduxjs/toolkit'
export type { AsyncState } from './async'

export default {
  sync,
  async,
  setFunctionName,
  reducer: combinator.combine
}
