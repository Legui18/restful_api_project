const express = require('express')// para incluir  el framework
const app = express(); // Instancia del framework Expres
const bodyParse = require('body-parser')
const morgan=require('morgan')

// Validamos que no estemes en ambiente d produccion
if(process.env.NODE_ENV != 'production'){
    require('dotenv').config()//Se carga la configuracion archivo .env al process.env
}

app.set('port', process.env.PORT || 4000)

//Middlewares
app.use(bodyParse.urlencoded({extended:false}))// Recibir datos formulario
app.use(bodyParse.json())//para recibir json
app.use(morgan('combined'))

// app.get('/',(req,res)=>{
//     console.log("ruta ppal");
//     res.send({title:'Ruta Ppal', message:'Acceso a la ruta ppal'})
// })

app.use('/api/v1/users',require('./api/v1/routes/users.routes')) //la ruta que escriben en la url y luego la ruta de las carpetas
app.use('/api/v1/articles', require('./api/v1/routes/articles.routes'))
app.use('/api/v1/categories', require('./api/v1/routes/categories.routes'))

app.listen(app.get('port'),()=>{
    console.log(`Server runnin on localhost:${app.get('port')}`);
})