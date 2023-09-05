//enlazamos nuestro servidor
const Categoryservice= require('../services/Categoryservice');


const getAllCategories=async(req,res)=>{
    const allCategories=await Categoryservice.getAllCategories();

    if(allCategories)
        res.status(200).send({status:"OK", data: allCategories});
    else
        res.status(400).send({status: "FAILED", data: allCategories});
};

const getCategory = async(req,res)=>{
    let id=req.params.CategoryId;
    try{
        const Category=await Categoryservice.getCategory(id);
        res.status(200).send({status:"200",data: Category});
    }catch(error){
        res.status(error.status || 500).send({status:"FAILED",data: {error: error.message}})
    }
};

const createCategory=async(req,res)=>{
    const {body}= req;
    const createCategory=await Categoryservice.createCategory(body.name);
    if(createCategory)
        res.status(200).send({status:"OK",data: createCategory});
    else
        res.status(400).send({status: "FAILED", data: createCategory});
};

const updateCategory=async(req,res)=>{
    let id= req.params.CategoryId
    let {name}=req.body
    const updateCategory=await Categoryservice.updateCategory(id, name);
    if(updateCategory)
        res.status(200).send({status:"200",data: updateCategory});
    else
        res.status(400).send({status: "FAILED", data: updateCategory});
};

const deleteCategory= async(req,res)=>{
    let id=req.params.CategoryId;
    const deleteCategory =await Categoryservice.deleteCategory(id);
    if(deleteCategory)
        res.status(200).send({status:"200",data: deleteCategory});
    else
        res.status(400).send({status: "FAILED", data: deleteCategory});
};

module.exports={
    getAllCategories,getCategory,createCategory,updateCategory,deleteCategory,
};