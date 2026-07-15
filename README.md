# Bubble Bobble

Bubble Bobble es una versión propia inspirada en el videojuego clásico Bubble Bobble (1990). El proyecto fue desarrollado utilizando Phaser 3 para la creación del videojuego, implementando sus mecánicas principales, niveles, mapas, físicas, enemigos y elementos interactivos. Además, cuenta con un backend desarrollado con Node.js y Express, junto con una base de datos PostgreSQL encargada del registro de jugadores y almacenamiento de partidas guardadas.

Para el funcionamiento del sistema se utiliza PostgreSQL como motor de base de datos. Antes de ejecutar el backend es necesario crear la base de datos llamada 'bubble_game' (CREATE DATABASE bubble_game;) y las tablas necesarias para almacenar la información de los usuarios y sus partidas: 

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    user_alias VARCHAR(30) UNIQUE NOT NULL
);

CREATE TABLE saved_games (
    saved_game_id SERIAL PRIMARY KEY,
    user_id INT UNIQUE NOT NULL
        REFERENCES users(user_id)
        ON DELETE CASCADE,
    level INT NOT NULL DEFAULT 1,
    score INT NOT NULL DEFAULT 0,
    lives INT NOT NULL DEFAULT 3
);

La tabla 'users' permite registrar a los jugadores mediante un identificador único y un alias de usuario, mientras que la tabla 'saved_games' almacena la información de progreso de cada jugador, incluyendo el nivel actual, puntaje acumulado y cantidad de vidas disponibles. Cada partida guardada pertenece a un único usuario y, al eliminar un usuario, su partida guardada también es eliminada automáticamente gracias a la relación establecida entre ambas tablas.

Para ejecutar correctamente el proyecto es necesario contar previamente con [Node.js](https://nodejs.org/) instalado, [PostgreSQL](https://www.postgresql.org/download/) instalado y en funcionamiento, además de la extensión Live Server en Visual Studio Code, la cual permite ejecutar el juego desde el navegador.

El proyecto requiere ejecutar dos componentes al mismo tiempo: el backend y el juego junto con su menú principal. Para iniciar el backend se debe acceder a la carpeta 'bubble-game-backend' y ejecutar el comando 'npm install' para instalar todas las dependencias necesarias. Posteriormente, se debe crear un archivo '.env' dentro de dicha carpeta con las credenciales de conexión a PostgreSQL, especificando el usuario, host, nombre de la base de datos, contraseña, puerto de conexión y puerto del servidor: 

DB_USER=postgres
DB_HOST=localhost
DB_NAME=bubble_game
DB_PASSWORD=tu_contraseña
DB_PORT=5432
PORT=4000

Una vez configurada la conexión, el backend se inicia utilizando el comando 'npm run dev'. Si la ejecución es correcta, el servidor mostrará el mensaje indicando que se encuentra funcionando en http://localhost:4000.

Después de iniciar el backend, se debe ejecutar la parte visual del proyecto. Para ello, desde Visual Studio Code se abre el archivo 'index.html' ubicado en la raíz del proyecto y se selecciona la opción "Open with Live Server". El juego se abrirá en el navegador, normalmente utilizando la dirección http://127.0.0.1:5500/. Es importante que el backend esté ejecutándose antes de abrir el juego, ya que el menú principal necesita comunicarse con el servidor para realizar el registro de usuarios, consultar jugadores existentes y gestionar el guardado y recuperación de partidas.

El juego cuenta con diferentes controles para la interacción del jugador:

 Acción                Tecla   

 Moverse               A / D   
 Saltar                  W       
 Disparar burbuja     Espacio 
 Menú de pausa      Clic derecho 

El sistema de menú cuenta con diferentes opciones de juego. La opción de Nuevo jugador permite registrar un nuevo alias dentro del sistema y comenzar una partida desde el nivel inicial. La opción Nuevo juego permite iniciar una nueva partida utilizando un alias que ya se encuentre registrado, comenzando desde el nivel 1 sin modificar ninguna partida guardada anteriormente.

La opción Retomar partida permite cargar el último progreso almacenado de un usuario, recuperando su nivel actual, puntaje acumulado y cantidad de vidas disponibles.

Dentro del juego también existe un menú de pausa que aparece al utilizar el clic derecho. Este menú permite continuar la partida, guardar el progreso actual o regresar al menú principal. La opción de guardar partida reemplaza la partida guardada anteriormente del usuario, debido a que cada jugador cuenta únicamente con un espacio de guardado. Por otro lado, salir al menú principal no realiza un guardado automático, por lo que el jugador debe guardar manualmente antes de salir si desea conservar su progreso.

El desarrollo del proyecto se dividió en dos áreas principales. La parte correspondiente al backend y base de datos se encarga del registro, consulta y gestión de usuarios y partidas guardadas utilizando Node.js, Express y PostgreSQL. La parte correspondiente al frontend y desarrollo del videojuego se enfoca en la creación de niveles, mapas, físicas, enemigos y todas las mecánicas necesarias para el funcionamiento del videojuego utilizando Phaser 3.