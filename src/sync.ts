import { createSlice, ActionReducerMapBuilder, SliceCaseReducers, ValidateSliceCaseReducers, CaseReducerActions } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'
import combinator from './combinator'
import { createName } from './name'

type ActionDispatchers<
  Actions extends CaseReducerActions<Reducers>,
  Reducers extends SliceCaseReducers<any>
  > = {
    [Type in keyof Actions]: Actions[Type] extends (...params: infer Params) => any ? (...params: Params) => void : never
  }

export default <
  State,
  Reducers extends SliceCaseReducers<State>
>(
  {
    name, initialState, reducers, extraReducers
  }: {
    name: string
    initialState: State
    reducers?: ValidateSliceCaseReducers<State, Reducers>
    extraReducers?: (builder: ActionReducerMapBuilder<State>) => void
  }
) => {
  const slice = createSlice({
    name: createName(name),
    initialState,
    reducers: (reducers || {}) as ValidateSliceCaseReducers<State, Reducers>,
    extraReducers: extraReducers || (() => { }) as any
  })

  const hook = (): [State, ActionDispatchers<typeof slice.actions, Reducers>] => {
    const data = useSelector<any, State>(state => combinator.mapState(state)[name])
    const dispatch = useDispatch()

    const dispatcher: Record<string, CallableFunction> = {}
    for (const key of Object.keys(slice.actions)) {
      dispatcher[key] = (...params: any) => {
        dispatch((slice.actions as any)[key](...params))
      }
    }

    return [data, dispatcher as any]
  }

  combinator.use(name, slice)

  return {
    name,
    actions: slice.actions,
    hook
  }
}
