import UI from "ui";
import Menu from "./Menu.js";

class App extends UI.Card
{
    constructor(definition)
    {
        super(definition);

        this.title         = 'PebbleBee3';
        this.icon          = 'images/menu_icon.png';
        this.subtitle      = 'Hello World!';
        this.body 	       = 'Press any button.';
        this.subtitleColor = 'indigo';
        this.bodyColor 	   = '#9a0036';

        this.on('click', 'up', this._onClickUp.bind(this));
    }

    _onClickUp(event)
    {
        Menu.show();
    }

    show()
    {
        this.constructor(JSON.parse(JSON.stringify(this)));

        super.show();
    }
}

module.exports = new App;