const db=require('../models')

const getAllArticles=async()=>{
    try {
        let Articles =await db.Article.findAll({
            //con esta ópcion permitomos mostrar los articulos con la informacion del usuario
            include:{
                model:db.User,
                require:true,
                as: "User",
                attributes: ["id","name","email"],
            },
        });
        return Articles
    } catch (error) {
        return error.message ||'Failed to get Articles';
    } 
}

const getArticle=async (id)=>{
    try {
        let Article = await db.Article.findByPk(id)
        return Article
    } catch (error) {
        throw {status:500,message:'Failed to get Article'}
    } 
}

const createArticle = async(tittle,content,UserId)=>{
    try {
        let newArticle = await db.Article.create({
            tittle,content,UserId
        });
        if(newArticle){
            const categories=[1,2,3];
            await newArticle.setCategories(categories);
        }
        return newArticle;
    } catch (error) {
        return error.message || 'Article could not be created'
    } 
}

const updateArticle = async(id,tittle,content,UserId)=>{
    try {
        let updateArticle = await db.Article.update({
            tittle,content,UserId
        },{
            where:{
                id,
            }
        });
        return updateArticle;
    } catch (error) {
        return error.message ||'Article could not be update'
    } 
}

const deleteArticle =async(id)=>{
    try {
        const deleteArticle=await db.Article.destroy({
            where:{
                id,
            }
        });
        return deleteArticle;
    } catch (error) {
        return error.message ||'Article could not be deleted'
    }
};


module.exports={
    getAllArticles,getArticle,createArticle,updateArticle,deleteArticle,
};