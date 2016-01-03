import UI      from "ui";
import Request from "./Request";
import Menu    from "./Menu";
import Store   from "./Store";
import App     from "./App";

class NoConfig extends UI.Card
{
    constructor(definition)
    {
        super(definition);

        this.title         = 'PebbleBee3';
        this.icon          = 'images/menu_icon.png';
        this.body          = 'Please, configure the PIN in the web portal.';
        this.bodyColor     = '#9a0036';

        Store.on('update', this._onStorage.bind(this));

        this.on('select', this._onSelect.bind(this));
    }

    _onSelect()
    {
        console.log("SELECT");
        App.show();
    }

    _onStorage(event)
    {
        if (!Request.pin) {
            this.body = 'Wait...';
            this.show();

            return;
        }

        this.body = `Please, configure the PIN in the web portal. PIN: ${Request.pin}`;

        this.show();
    }

    show()
    {
        this.constructor(JSON.parse(JSON.stringify(this)));

        super.show();
    }
}

module.exports = new NoConfig;