const Promise = require('bluebird');
const bcrypt = Promise.promisifyAll(require('bcrypt-nodejs'));

//function hashPassword (user, options) {
  //const SALT_FACTOR = 8;
  //console.log('hashPassword')

  //if (!user.changed('password')) {
    //return
  //}

  //return bcrypt
    //  .genSaltAsync(SALT_FACTOR)
      //.then(salt => bcrypt.hashAsync(user.password, salt, null))
      //.then(hash => {
       // user.setDataValue('password', hash)
      //})
//}

module.exports = (sequelize, DataTypes) => {
  //return sequelize.define('User', {
  const User = sequelize.define('User', {
      firstname: {
          type: DataTypes.STRING(120)
      },
      lastname: {
          type: DataTypes.STRING(120)
      },
    username: {
      type: DataTypes.STRING(120),
      unique: true
    },
    password: DataTypes.STRING(120)
  //}, {
        //hooks: {
          //beforeCreate: hashPassword,
          //beforeUpdate: hashPassword,
          //beforeSave: hashPassword
        //}
      });
    //User.prototype.comparePassword = function (password) {
   // return bcrypt.compareSync(password,this.password)
  //};
  return User;
};
