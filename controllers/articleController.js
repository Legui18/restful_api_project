//enlazamos nuestro servidor
const { all } = require('../api/v1/routes/users.routes');
const article = require('../models/article');
const Articleservice= require('../services/Articleservice');
const { updateUser } = require('./userController');

const getAllArticles=async(req,res)=>{
    const allArticles=await Articleservice.getAllArticles();

    if(allArticles)
        res.status(200).send({status:"OK", data: allArticles});
    else
        res.status(400).send({status: "FAILED", data: allArticles});
};

const getArticle = async(req,res)=>{
    let id=req.params.ArticleId;
    try{
        const Article=await Articleservice.getArticle(id);
        res.status(200).send({status:"200",data: Article});
    }catch(error){
        res.status(error.status || 500).send({status:"FAILED",data: {error: error.message}})
    }
};

const createArticle=async(req,res)=>{
    const {body}= req;
    const createArticle=await Articleservice.createArticle(body.tittle, body.content, body.UserId);
    if(createArticle)
        res.status(200).send({status:"OK",data:createArticle});
    else
        res.status(400).send({status: "FAILED", data:createArticle});
};

const updateArticle=async(req,res)=>{
    let id= req.params.ArticleId
    let {tittle,content,UserId}=req.body
    const updateArticle=await Articleservice.updateArticle(id, tittle,content,UserId);
    if(updateArticle)
        res.status(200).send({status:"200",data: updateArticle});
    else
        res.status(400).send({status: "FAILED", data: updateArticle});
};

const deleteArticle= async(req,res)=>{
    let id=req.params.ArticleIdrticleId;
    const deleteArticle =await Articleservice.deleteArticle(id);
    if(deleteArticle)
        res.status(200).send({status:"200",data: deleteArticle});
    else
        res.status(400).send({status: "FAILED", data: deleteArticle});
};

module.exports={
    getAllArticles,getArticle,createArticle,updateArticle,deleteArticle,
};