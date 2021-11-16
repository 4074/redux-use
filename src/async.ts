import { createSlice, createAsyncThunk, Draft, ActionReducerMapBuilder, SliceCaseReducers, ValidateSliceCaseReducers } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'
import globalCombinator, { Combinator } from './combinator'
import { createName } from './name'
import StatusDetector from './statusDetector'

export interface AsyncState<Params = any, Data = any> {
  status: 'none' | 'loading' | 'finished' | 'error'
  params?: Params
  data?: Data
  error?: Error
  processingKeys?: Record<string | number, boolean>
}

export interface AsyncStateWithHelpers<Params = any, Data = any> extends AsyncState<Params, Data> {
  isLoading: () => boolean
  isFinished: () => boolean
  isError: () => boolean
  shouldInitialLoad: () => boolean
}

type ProcessingKeyGetter<Params extends any[]> = (...params: Params) => string | number | undefined

const addProcessingKey = <Params extends any[]>(params: Params, state: AsyncState<Params, any>, getter: ProcessingKeyGetter<Params>) => {
  const key = getter(...params)
  if (key !== undefined) {
    if (!state.processingKeys) state.processingKeys = {}
    state.processingKeys[key] = true
  }
}

const removeProcessingKey = <Params extends any[]>(params: Params, state: AsyncState<Params, any>, getter: ProcessingKeyGetter<Params>) => {
  const key = getter(...params)
  if (key !== undefined && state.processingKeys && state.processingKeys[key])
    delete state.processingKeys[key]
}

export default <
  Params extends any[],
  Data,
  Reducers extends SliceCaseReducers<AsyncState<Params, Data>>
>(
  producer: (...args: Params) => Promise<Data>,
  {
    name, initialState, reducers, extraReducers,
    getProcessingKey = (...params: Params) => params[0]?.['id'],
    combinator = globalCombinator
  }: {
    name?: string
    initialState?: AsyncState<Params, Data>
    reducers?: ValidateSliceCaseReducers<AsyncState<Params, Data>, Reducers>
    extraReducers?: (builder: ActionReducerMapBuilder<AsyncState<Params, Data>>) => void
    getProcessingKey?: ProcessingKeyGetter<Params>
    combinator?: InstanceType<typeof Combinator>
  } = {}
) => {
  const realInitialState = initialState || { status: 'none' }

  // Use producer func name or name of options
  let sliceName = createName(name || producer.name)

  const thunk = createAsyncThunk<Draft<Data>, Draft<Params>>(sliceName, (async (params: Params) => {
    const result = await producer(...params as any)
    return result
  }) as any)

  const slice = createSlice({
    name: sliceName,
    initialState: realInitialState,
    reducers: reducers || {},
    extraReducers: (builder) => {
      builder.addCase(thunk.pending, (state, { meta }) => {
        state.status = 'loading'
        state.params = meta.arg

        addProcessingKey(state.params as Params, state as AsyncState<Params, Data>, getProcessingKey)
      }).addCase(thunk.fulfilled, (state, { payload, meta }) => {
        state.status = 'finished'
        state.params = meta.arg
        state.data = payload

        removeProcessingKey(state.params as Params, state as AsyncState<Params, Data>, getProcessingKey)
      }).addCase(thunk.rejected, (state, action) => {
        state.status = 'error'
        state.params = action.meta.arg
        state.error = action.error as any

        removeProcessingKey(state.params as Params, state as AsyncState<Params, Data>, getProcessingKey)
      })
      extraReducers?.(builder)
    }
  })

  const hook = (): [
    AsyncState<Params, Data>,
    (...args: Params) => Promise<void>,
    StatusDetector
  ] => {
    const data = useSelector<any, AsyncState<Params, Data>>(state => combinator.mapState(state)[sliceName])
    const dispatch = useDispatch()
    const detector = new StatusDetector(data)

    const load = async (...params: Params) => {
      dispatch(thunk(params as any))
    }

    // const attached = status.attach(load)

    return [data, load, detector]
  }

  // TODO:
  hook.__producer = producer

  combinator.use(sliceName, slice)

  return {
    name: sliceName,
    actions: slice.actions,
    thunk,
    hook
  }
}
