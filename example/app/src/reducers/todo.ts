import reduxu, { PayloadAction } from 'redux-use'
import createRequest from './createRequest'

const add = reduxu.async(createRequest<any, any>('todos', 'POST'))
export const useTodoAdd = add.hook

export const updateFetcher = createRequest<any, any>('todos', 'PATCH')
const update = reduxu.async(updateFetcher)
export const useTodoUpdate = update.hook

export const useTodo = reduxu.async(createRequest<any[]>('todos'), {
  extraReducers: (builder) => {
    builder.addCase(add.thunk.fulfilled, (state, { payload }) => {
      state.data?.push(payload)
    })

    builder.addCase(update.thunk.fulfilled, (state, { payload }) => {
      if (state.data) {
        const index = state.data.findIndex(item => item.id === payload.id)
        if (index >= 0) state.data[index] = payload
      }
    })
  }
}).hook

interface TodoFilter {
  type: 'all' | 'done'
}

export const useTodoFilter = reduxu.sync({
  name: 'useTodoFilter',
  initialState: { type: 'all' } as TodoFilter,
  reducers: {
    set: (state, { payload }: PayloadAction<TodoFilter>) => {
      return payload
    }
  }
}).hook