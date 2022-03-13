const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');
class Server{

  constructor(){
    this.app = express();
    this.port = process.env.PORT || 5000;

    // PATH
    this.usersPath = '/api/users';

    // Connection to DB    
    this.connectDb();

    // Middlewares
    this.middlewares();

    // Routes
    this.routes();
  }

  async connectDb(){
    await dbConnection();
  }

  middlewares(){
    // CORS
    this.app.use( cors() );

    //Lectura y parseo del body
    this.app.use( express.json() );

    // Directorio público
    this.app.use(express.static('public'));
  }

  routes(){
    
   this.app.use( this.usersPath , require('../routes/user'));

  }

  listen(){    
    this.app.listen(this.port, () => {
      console.log('Servidor corriendo en', this.port);
    })
  }

}

module.exports = Server;