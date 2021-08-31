const enum Direction {
  Up = 'UP',
  Down = 'DOWN',
  Left = 'LEFT',
  Right = 'RIGHT',
}

console.log(Direction.Up)

const value = 'UP'
if (value === Direction.Up) {
  console.log('go up!')
}