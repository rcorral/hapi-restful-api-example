/**
 * There's not much value to this file
 * It's just a database stub to simulate calls
 *   to a db storage engine.
 * Pay little attention to this file in the context
 *   of this example.
 **/

'use strict';

module.exports = function() {
    var store = {};

    function Database() {};

    Database.prototype.get = function(key) {
        var value;
        return value = typeof store !== 'undefined' && store !== null ? store[key] : void 0;
    };

    return new Database();
};
