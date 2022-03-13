const User = require('../models/user');
const Role = require('../models/role');

const isRoleValid = async (role='') => {
  const exitsRole = await Role.findOne({ role: role });
  if(!exitsRole){      
    throw new Error('The role is not valid');
  }
}

const notExistEmail = async (email='') => {
  const existEmail = await User.findOne({ email });
  if(existEmail){
    throw new Error(`The email ${email} is already registered`);
  }
}

const existUserById = async (id) => {
  const existUser = await User.findById(id);  
  if(!existUser){
    throw new Error(`The id ${id} is not registered`);
  }
}

module.exports = {
  isRoleValid,
  notExistEmail,
  existUserById
}