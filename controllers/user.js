const { response } = require('express');

const bcrypt = require('bcryptjs');
const User = require('../models/user');

const userGet =  async (req, res = response) => {  
  const { limit = 5, skip = 0 } = req.query // ?id=2&name=jair&lastname=arsa
                                                  
                                                      //List the i want to show
  // const users = await User.find({ state: true }, 'name email role state google img')
  // .skip(Number(skip))
  // .limit(Number(limit));
  // const total = await User.countDocuments();

  const [ total, users ] = await Promise.all([
    User.countDocuments(),
    User.find({ state: true }, 'name email role state google img')
    .skip(Number(skip))
    .limit(Number(limit))
  ]);

  res.json({ total, users });
}

const userPost =  async (req, res = response) => {

  const { name, email, password, role } = req.body;
  const user = new User({ name, email, password, role });

  // Encript the password
  const salt = await bcrypt.genSaltSync(10);
  user.password = await bcrypt.hashSync(password, salt);

  // Save the user in the DB
  await user.save();

  res.json(user);
}

const userPut = async (req, res = response) => {
  
  const id = req.params.id;
  const { _id, password, google, email, ...userNewData } = req.body;

  // Validate BD
  if ( password ){
    const salt = await bcrypt.genSaltSync(10);
    userNewData.password = await bcrypt.hashSync(password, salt);
  }

  const user = await User.findByIdAndUpdate(id, userNewData);

  res.json(user);
}

const userDelete = async (req, res = response) => {
  
  const { id } = req.params;
  // const user = await User.findByIdAndDelete(id);
  const user = await User.findByIdAndUpdate(id, { state: false });
  res.json({ id });
}

module.exports = {
  userGet,
  userPost,
  userPut,
  userDelete
}