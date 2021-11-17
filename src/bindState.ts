import { useState, useRef } from 'react'
import { AsyncState, HookReturn } from './async'
import StatusDetector from './statusDetector'

export const use = <Params extends any[], Data>(producer: (...args: Params) => Promise<Data>): HookReturn<Params, Data> => {
  const [state, setState] = useState<AsyncState>({ status: 'none', data: null, params: [], error: null })
  const detectorRef = useRef(new StatusDetector(state))
  detectorRef.current.setState(state)

  return [
    state,
    (...args: Params) => {
      setState({
        ...state,
        params: [...args],
        status: 'loading'
      })
      producer(...args as any).then((res) => {
        setState({
          ...state,
          data: res,
          status: 'finished'
        })
      }, (error) => {
        setState({
          ...state,
          error,
          status: 'error'
        })
      })
    },
    detectorRef.current
  ]
}

export default <T>(hook: () => T): T => {
  const h: any = hook
  if (!h.__producer) return hook()
  return use(h.__producer) as any
}
