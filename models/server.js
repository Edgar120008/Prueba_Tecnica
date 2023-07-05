const express = require('express');
const cors = require('cors');
const path = require('path');



class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.rutaPokemon = '/pokemon';

        //middlewares() 
        this.middlewares();

        this.routes();

    }

    //middlewares
    middlewares() {

        this.app.use(cors({ origin: true, credentials: true }));

        this.app.use(express.json());

    }

    //Rutas...
    routes() {

        this.app.use(this.rutaPokemon, require('../routers/pokemon.routers')); //1


    }

    listen() {
        this.app.listen(this.port, console.log('Servidor de pruebas a la espera de instrucciones (DEV)...'));

    }
}

module.exports = Server;