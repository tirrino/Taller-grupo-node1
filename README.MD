- Descripcion del proyecto:
Este proyecto consiste en la construcción de una API RESTful capaz de manejar la autenticación de usuarios y la gestión de tareas, cumpliendo con estándares modernos de seguridad y buenas prácticas de desarrollo. Incluye registro de usuarios, inicio de sesión seguro mediante tokens JWT, y control de acceso a rutas privadas mediante la estrategia Passport JWT. La persistencia de datos se realiza a través de Prisma ORM sobre una base de datos Supabase. Se implementaron migraciones, validaciones, separación de responsabilidades y documentación clara para su despliegue y uso.

- Pasos para clonar:
Para clonar, lo primero que se tuvo que hacer es crear un nuevo repositorio, una vez este creado el otro compañero debe copiar el link del repositorio y desde la terminal o el cmd de debe de poner git clone (link del repositorio).

- Instalacion de dependencias:
- npm install (Para instalar todos los node_modules)
- npm install express (es un Framework de Node.js para crear APIs y servidores web de forma rápida y sencilla.)
- npm install dotenv (esta permite cargar variables de entorno desde un archivo .env.)
- npm install prisma (esta es una herramienta para generar migraciones y manejar la base de datos de forma declarativa.)
- npm install @prisma/client (es un cliente que permite hacer consultas a la base de datos desde tu código Node.js.)
- npm install bcrypt (es una librería para hashear contraseñas de forma segura.)
- npm install bcryptjs (es como una alternativa a bcrypt para el hash de contraseñas.)
- npm install cors (permite que tu API sea consumida desde otros dominios, por ejemplo tu frontend)
- npm install express-rate-limit (es un middleware para limitar la cantidad de peticiones a un endpoint en un tiempo determinado)
- npm install jsonwebtoken (es una autenticación de usuarios y protección de rutas.)
- npm install passport (es una librería para manejar autenticación en Node.js con estrategias externas.)
- npm install passport-jwt (es una estrategia de Passport para autenticar usuarios usando JWT.)
- npm install donet (es un paquete de utilidades para Node.js)
- npm install prisma --save-dev (es una herramienta de CLI para migraciones)

- Para las migraciones:
 despues de tener npm install @prisma/client y npm install prisma --save-dev instalados, se debe configurar el prisma utulizando npx prisma init
(esto lo que hace es crear la carpeta de prisma, el schema.prisma y el archivo .env) luego en el archivo schema.prisma se deben de crear las tablas como unos modelos, luego de tener todo esto listo se ejecuta el comando npx prisma migrate dev --name init (esto lo que hace es literalmente migrar y asi le crea la carpeta de migrations, actualiza @prisma/client automáticamente para reflejar los modelos y aplica los cambios en la base de datos)

- Variables de entorno necesarias: 
PORT=3000 
NODE_ENV=development

DATABASE_URL=

Variables para JWT

JWT_SECRET=

Variables de base de datos

DB_HOST=
DB_PORT=
DB_USER=
DB_PASSWORD=
DB_NAME=

.env.example

- Resumen de cómo funciona la seguridad:
- Flujo de Autenticación (Registro → Login → Uso de Token en /tasks):

- Registro (POST /auth/register)
    - El usuario envía email y password.
    - La contraseña se **hashea** antes de guardarse.
    - Respuesta: confirmación de creación del usuario.
- Login (POST /auth/login)

    - Se verifica email y password.
    - Si coinciden, se genera un **JWT** firmado con `JWT_SECRET`.
    - El cliente debe almacenar el token y enviarlo en cada petición protegida.
- Acceso a rutas protegidas (GET /tasks, POST /tasks, etc.)
    - El cliente envía el token en el header:
        
    Authorization: Bearer <token>
        
      
        
    - El middleware JWT verifica el token.
    - Si es válido, se añade `req.user` con el **ID del usuario** y la ruta continúa.
    - Si es inválido o falta, se responde con 401.

- Rate Limit

- Se aplica un **límite de peticiones por IP** para evitar abusos.
- Está configurado en el archivo donde se inicializa el servidor (por ejemplo `src/server.js` o `app.js`).
- Se registra como un middleware antes de las rutas públicas y privadas.


- CORS

- Se configura también en el archivo principal del servidor.
- Define:
    - Qué dominios pueden consumir la API.
    - Qué métodos HTTP están permitidos.
    - Si se envían cookies o headers personalizados.
- Se aplica como middleware global antes de las rutas.


- Uso de Passport

- Passport se usa para manejar la estrategia de autenticación con JWT.
- Flujo:
    - Se configura una estrategia que valida el token con `JWT_SECRET`.
    - Passport extrae el token del header Authorization.
    - Verifica firma y expiración.
    - Si el token es válido, Passport inyecta el usuario en `req.user`.
- Se usa como middleware en las rutas protegidas, por ejemplo:
    router.get('/tasks', passport.authenticate('jwt', { session: false }), handler)











