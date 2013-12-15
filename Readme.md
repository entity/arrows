
# arrows

read arrow keys and shoot

## Installing

`component install entity/arrows`

## Goals

- Should have minimum footprint. Uses 5 bits, 4 directional, 1 to shoot.
- Recent opposite arrows should take precedence over old ones.
- The arrows pressed at any point, after crazy fast combinations, should
  correctly evaluate to the desired direction.
- Should allow evaluating in a loop, instead of listening to events, but
  also provide events when needed.
- Should enforce writing a control function that will evaluate the correct
  state of the player's controls by only sharing those 5 bits at any
  given point.

## Example

```js
var k = arrows();

document.body.onkeydown = k.onkeydown;
document.body.onkeyup = k.onkeyup;

function ctrl(){
  k & k.left  && left();
  k & k.up    && up();
  k & k.right && right();
  k & k.down  && down();
  k & k.shoot && shoot();
}

loop(ctrl);
```

Also, [a real example](https://github.com/entity/arrows/blob/master/example.js).

## API

### arrows()

### #onkeydown()

### #onkeyup()

## Flags

```js
left  = 00001
up    = 00010
right = 00100
down  = 01000
shoot = 10000
```

## License

MIT
