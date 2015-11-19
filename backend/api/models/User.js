/**
* User.js
*
* @description :: The User is required for login purposes.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {

    name : { type: 'string' },

    email : { type: 'string' },

    password : { type: 'string' }
  }
};

