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
const mailRoutes = require('./src/routes/mail.routes');
const stockRoutes = require('./src/routes/stock.routes');


const marcasRoutes = require('./src/routes/marcas.routes');
const modelosRoutes = require('./src/routes/modelos.routes');
const productosRoutes = require('./src/routes/productos.routes');


app.use('/auth', authRoutes); 
app.use('/', mailRoutes); 



app.use('/api/stock', stockRoutes); 
app.use('/api/marcas', marcasRoutes);
app.use('/api/modelos', modelosRoutes);
app.use('/api/productos', productosRoutes);


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});