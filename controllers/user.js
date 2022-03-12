const { response } = require('express');

const userGet =  (req, res = response) => {  
  const query = req.query // ?id=2&name=jair&lastname=arsa
  res.json({
    msg: 'Get - User Controller',
    query
  });
}

const userPost =  (req, res = response) => {
  console.log(req.body);
  res.json({
    msg: 'Post - User Controller',
    body: req.body
  });
}

const userPut =  (req, res = response) => {
  const id = req.params.id;
  res.json({
    msg: 'Put - User Controller',
    id,
    body: req.body
  });
}

const userDelete =  (req, res = response) => {
  res.json({
    msg: 'Delete - User Controller'
  });
}

module.exports = {
  userGet,
  userPost,
  userPut,
  userDelete
}