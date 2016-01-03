class PebbleBeeException
{
    constructor(message)
    {
        this.message = message;
    }

    toString()
    {
        return this.message;
    }
}

module.exports = PebbleBeeException;