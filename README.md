# Ice Dream V0.9.1
## _Backend API only (front coming soon)._

Ice Dream es una aplicación para pedir recetas deliciosas, compuestas de yogurt con helado y otros ingredientes deliciosos.
Esta aplicación incluye toda la estructura de backend 100% operativa. La aplicación incluye:

- Modelos de usuarios, ingredientes y recetas.
- CRUD completo en todos los modelos.
- Relaciones cruzadas (recetas del usuario, ingredientes que componen una receta, etc.)

## Utilidades

- Crear, buscar, actualizar o borrar modelos.
- Guardado de imágenes en Cloudinary (cuando se requiera).
- Funciones y permisos de administrador (ver *Funciones*).

**Nota:** Algunas funciones están reservadas para Administradores. Recuerda *utilizar un usuario con rol de Administrador* si quieres usarlas.


## Recursos

Ice Dream utiliza varios recursos de código abierto para funcionar.

- [Visual Studio Code] - El mejor editor de código.
- [Node.js] - Para el entorno de construcción de Javascript.
- [Bcrypt] - Encriptación potente para proteger a los usuarios.
- [Cloudinary] - Servidor para almacenar nuestras imágenes.
- [Dotenv] - Para la carga de variables .env.
- [Express] - Nuestro framework de trabajo de backend.
- [Jsonwebtoken] - Clave en la identificación de nuestros usuarios.
- [Mongoose] - Para crear nuestros modelos en la base de datos.
- [Multer] - Para habilitar peticiones con multipart y la carga de archivos adjuntos.


## Instalación

Ice Dream requiere [Node.js](https://nodejs.org/) v18+ para ejecutarse correctamente.

Para iniciar la aplicación, ejecuta los siguientes comandos:

```sh
cd IceDream
npm run iceDream
```


## Funciones

### Funciones para Clientes

Estas son todas las funciones que podrás realizar si el rol de tu usuario es *Client*.

#### *Usuarios*

- **Registrar usuario**  
  *Descripción*: Creación de usuarios Clientes (sin rol de Admin).  
  *Ruta:* [http://localhost:3000/api/v1/users/register](http://localhost:3000/api/v1/users/register)  
  *Formato de la petición:*
  ```json
  {
    "name": "",
    "profileImg": "",
    "email": "",
    "password": ""
  }


- **Login de usuario**  
  *Descripción*: Login para cualquier usuario.  
  *Ruta:* [http://localhost:3000/api/v1/users/login](http://localhost:3000/api/v1/users/login)  
  *Formato de la petición:*
  ```json
  {
    "email": "",
    "password": ""
  }
  ```

- **Actualizar usuario**  
  *Descripción*: Actualización de tu propio perfil.  
  *Ruta:* [http://localhost:3000/api/v1/users/update/:id](http://localhost:3000/api/v1/users/update/:id)  
  *Formato de la petición:*  
  Cualquier dato que quieras actualizar en tu usuario (salvo el rol de Client).

- **Eliminar usuario**  
  *Descripción*: Eliminar tu perfil de usuario.  
  *Ruta:* [http://localhost:3000/api/v1/users/delete/:id](http://localhost:3000/api/v1/users/delete/:id)  
  *Formato de la petición:*  
  Introduce la id de tu perfil que quieras eliminar. Todas tus recetas asociadas también se eliminarán.

#### *Ingredientes*

- **Buscar ingredientes**  
  *Descripción*: Buscar todos los ingredientes disponibles o uno concreto mediante su id.  
  *Ruta:* [http://localhost:3000/api/v1/ingredients/search](http://localhost:3000/api/v1/ingredients/search)  
  *Formato de la petición:*  
  Si quieres un ingrediente concreto, inserta su id al final de la url.

#### *Recetas*

- **Crear receta**  
  *Descripción*: Crea una nueva receta que se asignará a tu perfil de usuario.  
  *Ruta:* [http://localhost:3000/api/v1/recipes/create](http://localhost:3000/api/v1/recipes/create)  
  *Formato de la petición:*
  ```json
  {
    "name": "",
    "yogurt": "",
    "helado": "",
    "elemento": "",
    "extra": "",
    "recipeImg": "",
    "notas": ""
  }
  ```

- **Buscar receta**  
  *Descripción*: Consulta las recetas de tu perfil o busca una concreta mediante su id.  
  *Ruta:* [http://localhost:3000/api/v1/recipes/search](http://localhost:3000/api/v1/recipes/search)  
  *Formato de la petición:*  
  Busca una receta específica introduciendo su id al final de la url.

- **Actualizar receta**  
  *Descripción*: Actualiza los datos de tu receta (nombre, ingredientes, etc.)  
  *Ruta:* [http://localhost:3000/api/v1/recipes/update/:id](http://localhost:3000/api/v1/recipes/update/:id)  
  *Formato de la petición:*  
  Introduce la id en la url y modifica los campos que desees.

- **Borrar receta**  
  *Descripción*: Borra una de tus recetas.  
  *Ruta:* [http://localhost:3000/api/v1/recipes/delete/:id](http://localhost:3000/api/v1/recipes/delete/:id)  
  *Formato de la petición:*  
  Introduce la id en la url. La receta debe ser tuya para poder borrarla.

### Funciones para Administradores

Si posees el rol de Admin, podrás manejar operaciones más sensibles de la aplicación, como crear nuevos ingredientes, modificarlos o eliminar el perfil de cualquier usuario.

#### *Usuarios*

- **Buscar usuarios**  
  *Descripción*: Consulta los datos de todos los usuarios, o de uno concreto introduciendo su id.  
  *Ruta:* [http://localhost:3000/api/v1/admin/search-users](http://localhost:3000/api/v1/admin/search-users)  
  *Formato de la petición:*  
  Si deseas consulta un usuario específico, introduce su id en la url.

- **Actualizar usuarios**  
  *Descripción*: Actualiza los datos de cualquier usuario.  
  **Importante**: Utiliza esta función si quieres conceder el rol de administrador a un usuario.  
  *Ruta:* [http://localhost:3000/api/v1/admin/update-users/:id](http://localhost:3000/api/v1/admin/update-users/:id)  
  *Formato de la petición:*  
  Introduce los campos que desees modificar en el cuerpo de la solicitud.  
  Si deseas cambiar el rol del usuario a administrador, introduce:
  ```json
  {
    "role": "Admin"
  }
  ```

- **Eliminar usuarios**  
  *Descripción*: Elimina a cualquier usuario de la base de datos.  
  *Ruta:* [http://localhost:3000/api/v1/admin/delete-users/:id](http://localhost:3000/api/v1/admin/delete-users/:id)  
  *Formato de la petición:*  
  Introduce la id del usuario que deseas eliminar en la url de la petición.

#### *Ingredientes*

- **Crear ingrediente**  
  *Descripción*: Crea un nuevo ingrediente para usar en las recetas.  
  *Ruta:* [http://localhost:3000/api/v1/admin/create-ingredient](http://localhost:3000/api/v1/admin/create-ingredient)  
  *Formato de la petición:*
  ```json
  {
    "name": "",
    "ingredientImg": "",
    "type": "yogurt, helado, elemento o extra",
    "price": ""
  }
  ```

- **Actualizar ingrediente**  
  *Descripción*: Actualiza los datos de un ingrediente.  
  *Ruta:* [http://localhost:3000/api/v1/admin/update-ingredient/:id](http://localhost:3000/api/v1/admin/update-ingredient/:id)  
  *Formato de la petición:*  
  Introduce la id que deseas actualizar y los campos a modificar.

- **Eliminar ingrediente**  
  *Descripción*: Elimina un ingrediente de la base de datos.  
  *Ruta:* [http://localhost:3000/api/v1/admin/delete-ingredient/:id](http://localhost:3000/api/v1/admin/delete-ingredient/:id)  
  *Formato de la petición:*  
  Introduce la id del ingrediente que deseas borrar.

#### *Recetas*

- **Buscar recetas**  
  *Descripción*: Busca todas las recetas creadas o una concreta mediante su id.  
  *Ruta:* [http://localhost:3000/api/v1/admin/delete-ingredient/:id](http://localhost:3000/api/v1/admin/delete-ingredient/:id)  
  *Formato de la petición:*  
  Si deseas ver una receta específica, introduce su id.


## FAQ'S

#### ¿Cómo creo una receta? ####

Utiliza la ruta http://localhost:3000/api/v1/recipes/create
Recuerda que cada receta debe contener *un solo ingrediente válido* de yogurt, helado, elemento y extra.
Debes estar logeado para poder crear la receta y que se asigne a tu perfil.

#### Gestiono la base de datos. ¿Cómo accedo a las funciones Admin?

Debes pedir a un Admin que cambie el rol de tu perfil, de Client a Admin, mediante la función de la ruta: http://localhost:3000/api/v1/admin/update-users/

#### ¿Puedo interactuar con los perfiles de otros usuarios?

Por ahora, solo puedes consultar las recetas que hayas creado tú, pero añadiremos una función para que puedas compartirlas en el futuro si quieres ;)

## Licencias

MIT
Backend creado por Alex Gil {[KingCoder]}.


   [Visual Studio Code]: <https://code.visualstudio.com>
   [Node.js]: <https://nodejs.org/es>
   [Bcrypt]: <https://www.npmjs.com/package/bcrypt>
   [Cloudinary]: <https://cloudinary.com>
   [Dotenv]: <https://www.npmjs.com/package/dotenv>
   [Express]: <https://expressjs.com/es/>
   [Jsonwebtoken]: <https://www.npmjs.com/package/jsonwebtoken>
   [Mongoose]: <https://mongoosejs.com>
   [Multer]: <https://www.npmjs.com/package/multer>
   [KingCoder]: <https://github.com/AlexKingCoder>
