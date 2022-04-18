import { HookReturn } from './async'
import { EventEmitter } from './emitter'

export interface StoreOptions<T> {
  cacheKey?: string | ((params: T) => string)
}

export interface StoreCache<P, D> {
  get: (params: P) => D | undefined
  set: (params: P, data: D) => void
}

const getCacheKeys = <T>(key: StoreOptions<T>['cacheKey'], params: T) => {
  if (typeof key === 'string') return key
  return key(params)
}

const store = <Params extends any[], Data>(
  producer: (...args: Params) => Promise<Data>,
  options?: StoreOptions<Params>,
) => {
  const emitter = new EventEmitter()

  const map: Map<string, Data> = new Map()
  const cache: StoreCache<Params, Data> = {
    get: (params) => {
      const key = getCacheKeys(options.cacheKey, params)
      return key !== undefined && map.get(key)
    },
    set: (params, data) => {
      const key = getCacheKeys(options.cacheKey, params)
      if (key !== undefined) map.set(key, data)
    },
  }

  ;(producer as any).__emitter = emitter
  ;(producer as any).__cache = cache

  return producer
}

export const bindStore = <Params extends any[], Data>(
  hook: () => HookReturn<Params, Data>,
): ((...args: Params) => Promise<Data>) => {
  const h: any = hook
  if (h.__producer) {
    return store(h.__producer)
  } else {
    throw Error('bindStore params should be the hook of reduxu.async')
  }
}

export default store
