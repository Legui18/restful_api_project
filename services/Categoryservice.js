const db=require('../models')

const getAllCategories=async()=>{
    try {
        let categories =await db.Category.findAll()
        return categories
    } catch (error) {
        throw {status:500,message:'Failed to get Categories'}
    } 
}

const getCategory=async (id)=>{
    try {
        let Category = await db.Category.findByPk(id)
        return Category
    } catch (error) {
        throw {status:500,message:'Failed to get Category'}
    } 
}

const createCategory = async(name)=>{
    try {
        let newCategory = await db.Category.create({
            name
        });
        return newCategory
    } catch (error) {
        return error.message || 'Category could not be created'
    } 
}

const updateCategory = async(id,name)=>{
    try {
        let updateCategory = await db.Category.update({
            name
        },{
            where:{
                id,
            }
        });
        return updateCategory;
    } catch (error) {
        return error.message ||'Category could not be update'
    } 
}

const deleteCategory =async(id)=>{
    try {
        const deleteCategory=await db.Category.destroy({
            where:{
                id,
            }
        });
        return deleteCategory;
    } catch (error) {
        return error.message ||'Category could not be deleted'
    }
};


module.exports={
    getAllCategories,getCategory,createCategory,updateCategory,deleteCategory,
};