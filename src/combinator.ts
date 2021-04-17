import { Slice } from '@reduxjs/toolkit'
import { Reducer } from 'redux'

function createCombinator() {
  const combined: any = {}
  return {
    use: (name: string, slice: Slice) => {
      combined[name] = slice.reducer
    },
    combine: () => combined as Reducer
  }
}

export default createCombinator()