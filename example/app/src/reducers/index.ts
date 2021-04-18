import reduxu, { PayloadAction } from 'redux-use'

const createRequest = <Data, Params = void>(url: string, method: string = 'GET') => {
  const prefix = 'http://localhost:4000/'
  const { [url]: fn } = {
    [url]: async (params: Params): Promise<Data> => {
      let rurl = `${prefix}${url}`
      if (method === 'PATCH') rurl += '/' + (params as any).id
      return fetch(rurl, {
        method,
        body: JSON.stringify(params),
        headers: {
          'content-type': 'application/json'
        }
      }).then((res) => res.json())
    }
  }
  return fn
}

const add = reduxu.async(createRequest<Model.Todo, Model.Todo>('todos', 'POST'))
export const useTodoAdd = add.hook

const update = reduxu.async(createRequest<Model.Todo, Model.Todo>('todos', 'PATCH'))
export const useTodoUpdate = update.hook

export const useTodo = reduxu.async(createRequest<Model.Todo[]>('todos'), {
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

export default reduxu.reducer()