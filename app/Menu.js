import UI      from "ui";
import Store   from "./Store";
import Request from "./Request";

class Menu extends UI.Menu
{
    constructor(definition)
    {
        super(definition);

        this.sections = [{
            backgroundColor: 'cyan',
            title: 'PebbleBee3', 
            items: []
        }];

        let config = {'url': 'https://api.ecobee.com/1/thermostat', 'params': {"selection":{"includeAlerts":"true","selectionType":"registered","selectionMatch":"","includeEvents":"true","includeSettings":"true","includeRuntime":"true"}}};
        
        Request.get(config, this._onResponse.bind(this));
        
        this.on('select', this._onSelect.bind(this));
    }

    _onSelect(event)
    {
        console.log('Selected item #' + event.itemIndex + ' of section #' + event.sectionIndex);
        console.log('The item is titled "' + event.item.title + '"');
    }

    _onResponse(data)
    {
        console.log(JSON.stringify(data));
        /*
        [{
                title: 'Pebble.js',
                icon: 'images/menu_icon.png',
                subtitle: 'Can do Menus'
            }, {
                title: 'Second Item',
                subtitle: 'Subtitle Text'
            }]
            */
    }

    show()
    {
        console.log(Store.pin);
        this.constructor(JSON.parse(JSON.stringify(this)));

        super.show();
    }
}

module.exports = new Menu;