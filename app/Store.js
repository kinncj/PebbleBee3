import PebbleBeeException from "./PebbleBeeException";

class Store
{
    constructor()
    {
        this.key             = "PebbleBee3_";
        this.storage         = localStorage;
        this.availableEvents = {'update': true};
        this.listeners       = [];
    }

    set(key, value)
    {
        this.storage.setItem(this.key + key, value);

        this.listeners.forEach(function(callback){
            let object  = {};
            object[key] = value;

            callback.call(object);
        });

        return this;
    }

    get(key, value)
    {
        return this.storage.getItem(this.key + key);
    }

    remove(key)
    {
        this.storage.removeItem(this.key + key);

        return this;
    }

    clear()
    {
        this.storage.clear();

        return this;
    }

    on(eventName, callback)
    {
        if (!this.availableEvents[eventName]) {
            throw new PebbleBeeException(`Event "${eventName}" does not exists.`);
        }

        this.listeners.push(callback);

        return this;
    }

    off(eventName, callback)
    {
        if (!this.availableEvents[eventName]) {
            throw new PebbleBeeException(`Event "${eventName}" does not exists.`);
        }

        this.listeners = this.listeners.filter(function(data){
            return data !== callback;
        });

        return this;
    }
}

module.exports = new Store;