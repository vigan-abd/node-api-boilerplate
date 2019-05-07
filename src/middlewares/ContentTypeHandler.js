
const Serializer = require('../helpers/Serializer');
const HttpNotAcceptableException = require('../models/Business/Exeption/HttpNotAcceptableException');

class ContentTypeHandler {
  /**
   * @param {Request} req
   * @param {Response} res
   * @param {Function} next
   */
  handler(req, res, next) {
    const { accept = '*/*' } = req.headers;

    if (/^\*/.test(accept) || /(json)|(javascript)/.test(accept)) {
      return res.json(res.body);

    } else if (/(xml)|(html)/.test(accept)) {
      res.set("Content-Type", 'application/xml');
      return res.send(Serializer.toXML(res.body));

    } else if (/text/.test(accept)) {
      res.set("Content-Type", 'text/plain');
      return res.send(`${Array.isArray(res.body) || typeof res.body === "object" ?
        JSON.stringify(res.body) : res.body}`);

    } else {
      res.statusCode = 406;
      res.statusText = 'Not Acceptable';
      next(new HttpNotAcceptableException(accept));
    }
  }
}



module.exports = ContentTypeHandler;