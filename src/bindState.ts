import { useState } from 'react'

const bindState = <T>(hook: () => T): () => T => {
  const h: any = hook
  if (!h.__producer) return hook
  const producer = h.__producer
  const [state, setState] = useState({ status: 'none', data: null, params: [], error: null })

  return () => [
    state,
    (...args: any[]) => {
      setState({
        ...state,
        params: [...args],
        status: 'loading'
      })
      producer(...args).then((res) => {
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
    }
  ] as any
}

export default bindState