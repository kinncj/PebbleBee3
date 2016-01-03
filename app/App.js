import UI       from "ui";
import Request  from "./Request";
import Menu     from "./Menu";
import NoConfig from "./NoConfig";
import Store    from "./Store";

class App extends UI.Card
{
    constructor(definition)
    {
        super(definition);

        this.title         = 'PebbleBee3';
        this.icon          = 'images/menu_icon.png';
        this.subtitle      = 'Hello World!';
        this.body          = 'Press any button.';
        this.subtitleColor = 'indigo';
        this.bodyColor 	   = '#9a0036';

        this._isReady = false

        Pebble.addEventListener('ready', this._onReady);
        Store.on('update', this._onReady);
    }

    _onReady(event)
    {
        this._isReady = true;

        if (!Request.pin) {
            NoConfig.show();

            return;
        }

        Menu.show();
    }

    show()
    {
        if (this._isReady) {
            Menu.show();

            return;
        }

        this.constructor(JSON.parse(JSON.stringify(this)));

        super.show();
    }
}

module.exports = new App;