import UI from "ui";

class Menu extends UI.Menu
{
    constructor(definition)
    {
        super(definition);

        this.sections = [{
            backgroundColor: 'cyan',
            title: 'PebbleBee3', 
            items: [{
                title: 'Pebble.js',
                icon: 'images/menu_icon.png',
                subtitle: 'Can do Menus'
            }, {
                title: 'Second Item',
                subtitle: 'Subtitle Text'
            }]
        }];
        
        this.on('select', this._onSelect.bind(this));
    }

    _onSelect(event)
    {
        console.log('Selected item #' + event.itemIndex + ' of section #' + event.sectionIndex);
        console.log('The item is titled "' + event.item.title + '"');
    }

    show()
    {
        this.constructor(JSON.parse(JSON.stringify(this)));

        super.show();
    }
}

module.exports = new Menu;