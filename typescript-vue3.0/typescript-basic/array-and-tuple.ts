let arrOfNumbers: number[] = [1,2,3] // 数组写法
arrOfNumbers.push(3)

function test() {
  console.log(arguments)
  console.log(arguments.length)
}
test()

let user: [string, number] = ['viking', 20] // 元组写法
user.push("123")