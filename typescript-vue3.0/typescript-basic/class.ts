// 封装
class Animal {
  readonly name: string;
  constructor(name) {
    this.name = name
  }
  run() {
    return `${this.name} is running`
  }
}
const snake = new Animal('lily')
console.log(snake.run())

// 继承
class Dog extends Animal {
  bark() {
    return `${this.name} is barking`
  }
}

const xiaobao = new Dog('xiaobao')
console.log(xiaobao.run())
console.log(xiaobao.bark())


// 多态
class Cat extends Animal {
  static categories = ['mammal'] // 静态属性
  constructor(name) {
    super(name)
    console.log(this.name)
  }
  run() {
    return 'Meow, ' + super.run()
  }
}
const maomao = new Cat('maomao')
console.log(maomao.run())
console.log(Cat.categories)


// 打印

// lily is running
// xiaobao is running
// xiaobao is barking
// maomao
// Meow, maomao is running
// [ 'mammal' ]