PebbleBee3
=========

Unofficial [ecobee3](https://www.ecobee.com/) [Pebble](https://www.pebble.com/) app

Compile
====

```
npm install
```

```
node ./node_modules/babel-cli/bin/babel.js app -d src/js/app
pebble clean
pebble build
pebble install --emulator basalt
pebble logs
```