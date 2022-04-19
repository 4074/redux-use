import { useState, useRef, useCallback, useEffect } from 'react'
import { AsyncState, HookReturn } from './async'
import { EventEmitter } from './emitter'
import StatusDetector from './statusDetector'
import useUnmountRef from './useUnmountRef'

/**
 * Create a hook from a function
 * @param producer async function
 * @returns
 */
const use = <Params extends any[], Data>(producer: (...args: Params) => Promise<Data>): HookReturn<Params, Data> => {
  const [state, setState] = useState<AsyncState>({ status: 'none', data: null, params: [], error: null })
  const unmountRef = useUnmountRef()
  const detectorRef = useRef(new StatusDetector(state))
  detectorRef.current.setState(state)

  const emitter: EventEmitter | undefined = (producer as any).__emitter
  const cache: Map<Params, Data> | undefined = (producer as any).__cache

  // Emit store state change
  const setStateWithStore: typeof setState = useCallback((nextState) => {
    setState(nextState)
    emitter?.emit('set', nextState)
  }, [])

  // Listen store state change
  useEffect(() => {
    emitter?.on('set', setState)
    return () => emitter?.remove('set', setState)
  }, [])

  const producerWrapped = useCallback(async (...args: Params) => {
    // Use cache if exists
    if (cache?.get(args)) {
      setStateWithStore({
        ...state,
        params: [...args],
        data: cache?.get(args),
        status: 'finished',
      })
      return
    } else {
      setStateWithStore({
        ...state,
        params: [...args],
        status: 'loading',
      })
    }

    try {
      const data = await producer(...(args as any))
      if (unmountRef.current) return
      // Set cache
      cache?.set(args, data)
      setStateWithStore({
        ...state,
        data,
        status: 'finished',
      })
    } catch (error) {
      if (unmountRef.current) return
      setStateWithStore({
        ...state,
        error,
        status: 'error',
      })
    }
  }, [])

  return [state, producerWrapped, detectorRef.current]
}

export const bindState = <Params extends any[], Data>(
  hook: () => HookReturn<Params, Data>,
): HookReturn<Params, Data> => {
  const h: any = hook
  if (h.__producer) {
    return use(h.__producer)
  } else {
    throw Error('bindState params should be the hook of reduxu.async')
  }
}

export default use
