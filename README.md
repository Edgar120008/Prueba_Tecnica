iniciacion del proyecto

para comenzar el proyecto se necesita instalar las dependencias con el comando desde la terminal 
"npm install"

para despues comenzar el proyecto desde la terminal
"npm run dev"

y de esta forma podemos usar las rutas en nuestro cliente favorito

las rutas que usamos son:

GET http://localhost/pokemon/getPokemons?limit=(numero de limite que se le dara )&page=(la cantidad de paginas que se desea hacer)&search=(la palabra o letra con la cual se hara la busqueda parcial)

POST http://localhost/pokemon/pokemonInfoPDF
en el body en formato json se agrega lo siguiente
{
    "pokemonName":"(nombre del pokemon que desea ver su informacion)"
}
