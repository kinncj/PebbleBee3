PebbleBee3
=========

Unofficial [ecobee3](https://www.ecobee.com/) [Pebble](https://www.pebble.com/) app

Compile
====

```
echo "{'APP_KEY': 'YOUR ECOBEE DEV KEY'}" > src/js/config.json
```

```
npm install
```

```
npm run-script compile
pebble install --emulator basalt
pebble logs
```