
🔥 Chispa Mortal

Chispa Mortal es una aplicación backend diseñada para gestionar un inventario de repuestos de encendido automotor con estilo, velocidad y un toque de caos controlado. Inspirada en el mundo de los fierros y con alma de película de acción, esta app maneja marcas, modelos y productos como bujías y cables de encendido, todo con imágenes en la nube y seguridad JWT.

Ideal para casas de repuestos o desarrolladores que quieran domar motores... desde el código.

(Perdón profe si no digo una gansada en menos de 20 minutos me da un algo)



La app utiliza :
- Node.js + Express
- MySQL (con conexión por `mysql2`)
- JSON Web Tokens (JWT)
- Cloudinary (para imágenes) --(Las imágenes de marcas, modelos y productos están alojadas en Cloudinary. Actualmente las URLs están cargadas directamente en la base de datos)
- Thunder Client (para testeo local)
- Dotenv

La base SQL provisoria se encuentra en mi-api/APP



## 📁 Estructura General

.
├── .env # Variables de entorno
├── db.js # Conexión a base de datos
├── index.js # Punto de entrada del servidor
├── src/ # Lógica de la aplicación (rutas, controladores, servicios, middlewares)
└── db_proyecto.sql # Script para inicializar la base de datos con tablas y datos



"dependencies": 
    "bcrypt": "^6.0.0",
    "dotenv": "^16.5.0",
    "express": "^5.1.0",
    "express-handlebars": "^8.0.3",
    "express-session": "^1.18.1",
    "jsonwebtoken": "^9.0.2",
    "mysql2": "^3.14.1",
    "nodemailer": "^7.0.3"
  ,
  "devDependencies": 
    "nodemon": "^3.1.10"



Usuario :

  "email": "usuario@correo.com",
  "password": "1234"

Usuario ADMIN:

HASH $2b$10$WrDMHBPocj64vQvfbvAseeOtMtLBNugvi3m48AVQbaQimVDjLJGc6
emai: admin@correo.com 
contraseña admin: admin1234




    Utiliza los siguientes endpoints en el testeo:


    ### 📦 Marcas

- `GET /api/marcas` → Lista todas las marcas (con imagen)
- `GET /api/marcas/:id` → Muestra una marca individual (6)

### 🚗 Modelos

- `GET /api/modelos` → Devuelve los modelos con sus productos
- `GET /api/modelos/:id` → Muestra un modelo individual(12)

### 🛠️ Productos

- `GET /api/productos` → Lista productos asociados a modelos(24)

### 🔐 Autenticación

- `POST /auth/login` → Login de usuario (devuelve JWT)
- `POST /auth/register` → Registro de usuario
- Middleware para validar JWT y roles (admin / user)

## 🔑 Sistema de Roles

La app incluye un control de roles:
- `admin`: acceso completo (crear, editar, eliminar)
- `user`: acceso restringido (ver productos)

Roles y permisos están definidos en las tablas `roles`, `permisos` y `roles_permisos`. La tabla `user_roles` asocia usuarios con roles.
