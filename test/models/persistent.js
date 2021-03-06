/**
 * Presistant model
 */
var Model = require('../../lib/model'),
    Vow = require('vow'),
    storage = [];

module.exports = Model.inherit({
    attributes: {
        a: Model.attributeTypes.String.inherit({
            default: 'a-0'
        }),
        b: Model.attributeTypes.String.inherit({
            calculate: function () {
                var attribute = this;
                return Vow.fulfill().delay(0).then(function () {
                    return 'b-' + attribute.model.get('a').split('-')[1];
                });
            }
        })
    },
    storage: Model.Storage.inherit({
        insert: function (model) {
            return Vow.fulfill().delay(0).then(function () {
                storage.push(model.toJSON());
                return storage.length - 1;
            });
        },
        update: function (model) {
            return Vow.fulfill().delay(0).then(function () {
                storage[model.id] = model.toJSON();
            });
        },
        find: function (model) {
            return Vow.fulfill().delay(0).then(function () {
                var data =  storage[model.id];
                if (data) {
                    return data;
                } else {
                    return Vow.reject(new Error('Not found'));
                }
            });
        },
        remove: function (model) {
            return Vow.fulfill().delay(0).then(function () {
                storage[model.id] = null;
            });
        }
    })
}, {
    testStorage: storage
});
