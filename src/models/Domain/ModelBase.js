const Joi = require('joi');

class ModelBase {
  constructor() {
    this.rules = Joi.object();
    this.excludedProps = [];
  }
  
  validate() {
    return Joi.validate(this.toJSON(), this.rules);
  }

  static get DbQuery() {
    throw new Error('Method not implemented');
  }

  toJSON() {
    const fields = {};
    Object.keys(this).filter(x => !this.excludedProps.includes(x))
    .filter(x => !['rules', 'excludedProps'].includes(x))
      .forEach(x => fields[x] = this[x]);

    return fields;
  }
}

module.exports = ModelBase;