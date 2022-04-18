import { useRef, useEffect } from 'react'

const useUnmountRef = () => {
  const ref = useRef(false)

  useEffect(
    () => () => {
      ref.current = true
    },
    [],
  )

  return ref
}

export default useUnmountRef
