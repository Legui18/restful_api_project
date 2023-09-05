const db=require('../../../models')// requerimos los modelos
const {Router}= require('express') // Requerimos Router del Framework
const user = require('../models/user')
const router = new Router() // Creamos una instancia

router.get('/',(req,res)=>{
    console.log("get ruta principal")
    res.send({Tittle: 'Saludos ADS0'})
})
router.post('/new',async(req,res)=>{
    let name = req.body.name;
    let email = req.body.email;
    let phone = req.body.phone;
    let password = req.body.password;
    try {
        await db.User.create({
            name,
            email,
            phone,
            password
        });
        res.status(200).send({status:'OK',message:"User created!"})
    } catch (error) {
        res.statud(400).send('User could not be created!')
    }
})
//Ruta o endpoint para traer todos los usuarios
router.get('/all',async(req,res)=>{
    try {
        let users = await db.User.findAll();
        res.status(200).send({status:'OK',message:'Users listed !',data:users})
    } catch (error) {
        res.status(400).send({status:'FAIL',message:'Users error !',data:null})
    }
})

//Ruta para ver un usuario especifico
router.get('/:id',async(req,res)=>{
    try {
        let id=req.params.id;
        let users= await db.User.findByPk(id);
        res.status(200).send(users);
    } catch (error) {
        res.status(400).send('No se pudo obtener el usuario')
    }
})

//Ruta para actualizar un usuario especifico
router.put('/:id',async(req,res)=>{
    try {
        let id=req.params.id;
        let {name,email,password}=req.body;
        await db.User.update(
            {name,email,password},
            {
                where:{
                    id,
                }
            }
        );
        res.status(200).send("Usuario actualizado correctamente");
    } catch (error) {
        res.status(400).send("No se puedo actualizar el usuario");
    }
})

//Ruta para eliminar un usuario especifico
router.delete('/:id',async(req,res)=>{
    try {
        let id=req.params.id;
        await db.User.destroy({
            where:{
                id,
            }
        });
        res.status(200).send("Usuario eliminado correctamente");
    } catch (error) {
        res.status(400).send("No se puedo eliminar el usuario");
        
    }
})
module.exports=router