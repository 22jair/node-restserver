

const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
  name:{
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  email:{
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true
  },
  password:{
    type: String,
    required: [true, 'Password is required' ]
  },
  img:{
    type: String,
  },
  role:{
    type: String,
    required: [true, 'Role is required'],
    emun:[ 'USER_ROLE', 'ADMIN_ROLE' ]
  },
  state: {
    type: Boolean,
    default: true
  },
  google:{
    type: Boolean,
    default: false
  }
});

UserSchema.methods.toJSON = function() {
  const { __v, password, ...user } = this.toObject();
  return user;
}

module.exports = model('User', UserSchema);