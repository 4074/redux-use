import async from './async'
import sync from './sync'
import combinator from './combinator'

export type { PayloadAction } from '@reduxjs/toolkit'
export type { AsyncState } from './async'

export default {
  sync,
  async,
  reducer: combinator.combine
}
