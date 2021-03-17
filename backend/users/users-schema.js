const { Schema, model } = require('mongoose');

const usersSchema = new Schema(
    {
        name:String,
        pass:String
    }
);

const Users = model('users', usersSchema);

module.exports = Users