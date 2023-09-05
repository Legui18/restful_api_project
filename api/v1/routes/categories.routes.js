const {Router} = require('express');
const categoryController=require('../../../controllers/categoryController')

//Definimos una instancia del router para acceder a los verbos http
const router = Router();

 router.get('/',categoryController.getAllCategories)
 router.get('/:CategoryId',categoryController.getCategory)
 router.post('/',categoryController.createCategory)
 router.put('/:CategoryId', categoryController.updateCategory)
 router.delete('/:CategoryId',categoryController.deleteCategory)

module.exports = router;


