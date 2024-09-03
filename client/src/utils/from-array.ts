// TODO: temporary solution until data is handled server-side
export function removeNumberOfX<T extends string[], K extends T[number]>(
  n: number,
  x: K,
  arr: T
) {
  let newArr = [...arr]
  Array.from(Array(n), () => {
    const index = newArr.lastIndexOf(x)
    if (index !== -1) {
      newArr = newArr.toSpliced(index, 1)
    }
  })
  return newArr
}

// TODO: temporary solution until data is handled server-side
export function addNumberOfX<T extends string[], K extends T[number]>(
  n: number,
  x: K,
  arr: T
) {
  return [...arr, ...Array.from(Array(n), () => x)]
}
