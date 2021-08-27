interface Person {
  readonly id: number;
  name: string;
  age?: number;
}

let viking: Person = {
  id: 1,
  name: 'viking',
  age: 20,
}