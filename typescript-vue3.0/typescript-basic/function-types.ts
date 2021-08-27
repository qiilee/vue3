const add = (x: number, y: number, z?: number): number => {
  if (typeof z === 'number') {
    return x + y + z
  } else {
    return x + y
  }
}
interface ISum {
  (x: number, y: number, z?: number): number
}
let add2: ISum = add
