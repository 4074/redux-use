const names = new Set<string>()

export const createName = (origin: string) => {
  let name = origin
  if (!origin || names.has(origin)) {
    name = `${origin}_${Math.random().toString().slice(-8)}`
    // eslint-disable-next-line no-console
    if (origin) console?.warn(
      `Can not use duplicate name '${origin}' as a slice name.`,
      `\nReplace it to ${name} already.`
    )
  }
  names.add(name)
  return name
}

export const setFunctionName = <T extends CallableFunction>(name: string, fn: T): T => {
  Object.defineProperty(fn, 'name', { value: name })
  return fn
}
