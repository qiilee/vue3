interface Person {
  readonly id: number; // 只读属性
  name: string;
  age?: number; // ?的意思 age属性可有可无
}

let viking: Person = {
  id: 1,
  name: 'viking',
  age: 20,
}