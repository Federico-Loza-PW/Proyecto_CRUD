const express = require('express');
require('dotenv').config();
const app = express();
const path = require('path');
const exphbs = require('express-handlebars');


app.use(express.urlencoded({ extended: false }));
app.use(express.json());


app.engine(
  'handlebars',
  exphbs.engine({
    partialsDir: './src/views',
    defaultLayout: false,
  })
);
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'src/views'));


const authRoutes = require('./src/routes/auth.routes');
const protegidoRoutes = require('./src/routes/protegido.routes');
const mailRoutes = require('./src/routes/mail.routes');
const stockRoutes = require('./src/routes/stock.routes');
const catalogoRoutes = require('./src/routes/catalogo.routes');


app.use('/auth', authRoutes); // Login y registro
app.use('/api', protegidoRoutes); // Rutas protegidas con token + permisos
app.use('/', mailRoutes); // Vista de contacto (público)
app.use('/api/stock', stockRoutes); // Stock de productos
app.use('/api', catalogoRoutes); // Catálogo de marcas y modelos


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
