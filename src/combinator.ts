import { Slice, combineReducers } from '@reduxjs/toolkit'
import { Reducer } from 'redux'

export class Combinator {
  private prefix: string | undefined
  private combined: Record<string, Reducer> = {}

  public use = (name: string, slice: Slice) => {
    this.combined[name] = slice.reducer
  }

  public mapState = (state: any) => this.prefix ? state[this.prefix] : state

  public combine = (prefix?: string) => {
    this.prefix = prefix
    return combineReducers(this.combined)
  }
}

export default new Combinator()