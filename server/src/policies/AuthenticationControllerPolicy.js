const Joi = require('joi');

module.exports = {
  register (req, res, next) {
    const schema = {
      firstname: Joi.string(),
      lastname: Joi.string(),
      username: Joi.string(),
      password: Joi.string().regex(
        new RegExp('^[a-zA-Z0-9]{8,32}$')
      )
    };

    const {error} = Joi.validate(req.body, schema);

    if (error) {
      switch (error.details[0].context.key) {
        case 'username':
          res.status(400).send({
            error: 'Invalid username'
          });
          break;
        case 'password':
          res.status(400).send({
            error: `The password provided failed to match the following rules:
              <br>
              1. It must contain ONLY the following characters: lower case, upper case, numeric.
              <br>
              2. It must be at least 8 characters in length and not greater than 32 characters in length.
              `
          });
          break;
        default:
          res.status(400).send({
            error: 'Invalid registration information'
          })
      }
    } else {
      next()
    }
  }
};
