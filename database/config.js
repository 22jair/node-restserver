const mongoose = require('mongoose');

const dbConnection = async () => {
  
  mongoose.connect( process.env.MONGODB_CNN , {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then( db => console.log('DB is connected') )
    .catch( err => {
      console.log(err)
      throw new Error('Error connecting to DB');
    });
}

module.exports = {
  dbConnection
}