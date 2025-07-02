# 🔥 Chispa Mortal

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

{
  "email": "usuario@correo.com",
  "password": "1234"
}

  "email": "usuario@correo.com",
  "password": "1234"

Usuario ADMIN:

HASH $2b$10$WrDMHBPocj64vQvfbvAseeOtMtLBNugvi3m48AVQbaQimVDjLJGc6
{
  "email": "admin@correo.com",
  "password": "admin1234"
}

emai: admin@correo.com 
contraseña admin: admin1234
token: {
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJhZG1pbkBjb3JyZW8uY29tIiwiaWF0IjoxNzUwOTAzMzgxLCJleHAiOjE3NTA5MTA1ODF9.k_InI1ucK-0PKQQSFhS0YyTh4qoSYJyi_DMgsA8BRRE"
}





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



Front
La ida general era mostrar una app de comercio donde hay una nav para loguearse, una imagen de presentación del proyecto en el centro , debajo se encuentran la descripcion de productos donde se verían las marcas trabajadas y cada una dirigiría a los modelos y productos en general.Esto sólo sería visible alingresar como usuario.
Continuando se encuentran imagenes alusivas a la marca con textos y debajo las ofertas en imagenes .

Al ingresar como administrador se encuentra un dashboard que puede agregar o modificar marcas, modificar modelos de autos pertenecientes a esas marcas y productos pertenecientes a los modelos.


🧭 Navegación Frontend

# Principales páginas del sistema:
/
|-- /login
|-- /register
|-- /marcas          # (Protegida - requiere login)
|-- /modelos         # (Protegida - requiere login)
|-- /productos       # (Protegida - requiere login)
|-- /admin           # (Protegida - requiere admin)
    |-- /admin/marcas
    |-- /admin/modelos
    |-- /admin/productos

    Las rutas /admin/* son accesibles únicamente si el usuario tiene el rol admin.

🛠️ Panel CRUD de Administración

    📁 AdminDashboard:

        Acceso directo a: Marcas, Modelos, Productos

        Solo visible al estar logueado como admin

    📄 MarcasAdmin.jsx

        Tabla con lista de marcas (ID, Nombre)

        Botones para editar/eliminar

        Modal para crear/editar marcas

    📄 ModelosAdmin.jsx

        Muestra modelos y marca asociada

        Relación con tabla de marcas (id_marca)

    📄 ProductosAdmin.jsx

        Incluye precio y stock

        Asociado a modelos y marcas

    Todos los formularios están construidos con React Bootstrap.

📌 Notas Técnicas

    Las imágenes de marcas están alojadas en /public/marcas/{nombre}.png

    El proxy en Vite está configurado para redirigir /auth al backend:

// vite.config.js
server: {
  proxy: {
    '/auth': 'http://localhost:3000',
  },
}

    El token se guarda en localStorage para autenticar todas las peticiones protegidas.

