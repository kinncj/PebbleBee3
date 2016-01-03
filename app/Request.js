import Store  from "./Store";
import Ajax   from "ajax";
import Moment from "moment";
import UI     from "ui";

class Request
{
    constructor()
    {
        this._inProgress   = false;
        this._token        = false;
        this._expires      = false;
        this._interval     = false;
        this._refreshToken = false;
        this._timer        = false;
        this._first        = false;
        this._second       = false;
    }

    get(config, callback)
    {
        if (this._expires && this._expires.diff(moment) < 0) {
            this._fetchPin();
        }

        setTimeout(function(){
            this._doGet(config, callback);
        }.bind(this), 600)
    }

    _doGet(config, callback)
    {
        console.log("DO GET");
        let url    = config.url;
        let params = config.params;

        if (params) {
            url + "?json=" + JSON.stringify(params);
        }

        Ajax(
            {'url': url, 'type': 'json', 'method': 'GET', 'headers': {
                'Content-Type': 'application/json;charset=UTF-8',
                'Authorization': `Bearer ${this._token}`
            }},
            this._request.bind(this, callback),
            this._request.bind(this, callback)
        )
    }

    post(config, callback)
    {
        if (this._expires && this._expires.diff(moment) < 0) {
            this._fetchPin();
        }

        setTimeout(function(){
            this._doPost(config, callback);
        }.bind(this), 600)
    }

    _doPost(config, callback)
    {
                console.log("DO POST");

        let url        = config.url;
        let params     = config.params;
        let ajaxConfig = {
            'url': url, 'type': 'json', 'method': 'POST', 'headers': {
                'Content-Type': 'application/json;charset=UTF-8',
                'Authorization': `Bearer ${this._token}`
            }
        };

        if (params) {
            ajaxConfig['data'] = params;
        }

        Ajax(
            ajaxConfig,
            this._request.bind(this, callback),
            this._request.bind(this, callback)
        )
    }

    _request(callback, data)
    {
        console.log('r', JSON.stringify(data));

        return;
    }

    get pin()
    {
        let pin = Store.get('pin')

        if (!pin) {
            this._fetchPin();
        }

        return pin;
    }

    get authentication()
    {
        let authentication = Store.get('authentication')

        if (!authentication) {
            this._fetchPin();
        }

        return authentication;
    }

    _updateConfig(event)
    {
        Store.set('pin', response.pin);
    }

    _fetchPinSuccess(data)
    {
        if (data.error) {
            this._fetchPinError(data);

            return;
        }

        if (!this._second) {
            this._first = true;
        }

        if (this._first) {
            this._first  = false;
            this._second = true;
        }

        this._token        = data.access_token || data.code;
        this._refreshToken = data.refresh_token || data.code;
        this._inProgress   = false;

        if (data.expires_in) {
            this._expires = Moment();

            this._expires.add(data.expires_in, 'minutes');

            if (this._timer) {
                clearTimeout(this._timer);
            }

            this._timer = setTimeout(this._timerInterval.bind(this), ((data.expires_in -1) * 60000));
        }

        if (data.interval) {
            this._interval = Moment();

            this._interval.add(data.interval, 'seconds');
        }

        if (data.ecobeePin) {
            Store.set('pin', data.ecobeePin);
            Store.set('authentication', JSON.parse(JSON.stringify(this)));
        }
    }

    _timerInterval()
    {
        this._fetchPin('refresh');
    }

    _fetchPinError(error)
    {
        console.log(JSON.stringify(error));
        this._inProgress = false;

        if (error.error !== 'slow_down') {
            // NoConfig.show();
        }
    }

    _fetchPin(type)
    {
        if (this._inProgress) {
            return;
        }

        this._inProgress = true;

        let url    = `https://api.ecobee.com/authorize?response_type=ecobeePin&client_id=${Pebble._APP_KEY}&scope=smartRead,smartWrite`;
        let method = 'GET';

        if (type && type === 'refresh') {
            url    = `https://api.ecobee.com/token?grant_type=ecobeePin&client_id=${Pebble._APP_KEY}&code=${this._token}`;
            method = 'POST';
        }

        Ajax({'url': url, 'type': 'json', 'method': method}, this._fetchPinSuccess.bind(this), this._fetchPinError.bind(this));
    }
}

module.exports = new Request;