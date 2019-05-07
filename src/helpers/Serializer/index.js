const o2x = require('object-to-xml');

class Serializer {
  static toXML(obj) {
    try {
      obj = 'toJSON' in obj ? obj.toJSON : obj;
      obj = Object.keys(obj).length <= 1 ? obj : { object: obj };
      return o2x({
        '?xml version=\"1.0\" encoding=\"iso-8859-1\"?': null,
          ...obj
      });
    } catch (ex) {
      return {};
    }
  }
}

module.exports = Serializer;