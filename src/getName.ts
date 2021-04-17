const names = new Set<string>()

export default (origin: string) => {
  let name = origin
  if (names.has(origin)) {
    name = `${origin}_${Math.random().toString().slice(-8)}`
    // eslint-disable-next-line no-console
    console?.warn(
      `Can not use duplicate name '${origin}' as a slice name.`,
      `\nReplace it to ${name} already.`
    )
  }
  names.add(name)
  return name
}
