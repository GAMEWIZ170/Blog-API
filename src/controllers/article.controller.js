const joi = require('joi');
const ArticleModel = require('../models/article.model');

const postArticle = async (req, res, next) => {

    const articleSchema = joi.object({
        title: joi.string().min(5).required(),
        content: joi.string().min(5).required()
    });

    const {error, value} = articleSchema.validate(req.body);   
    if (error) {   
        return res.status(400).json("Please provide valid data", error);
    }

    try {
        const {title, content} = value;
        const newArticle = new ArticleModel({
            title,
            content,
            author: req.user._id,
        });
        await newArticle.save();

        res.status(201).json({ 
            message: "Article created successfully",
            data: newArticle
        });
    } catch (error) {
        console.error("Error creating article:", error);
        next(error);
    };
}

const getAllArticle = async (req, res, next) => {
    const {limit=10, page=1} = req.query;
    const skip = (page - 1) * limit;
    try {
        console.log(req.user);
        const articles = await ArticleModel.find({}).sort({createdAt: -1}).skip(skip).limit(limit).populate('author', 'name _id email');
        return res.status(200).json({
            message: "Articles fetched successfully",
            data: articles
        });
    } catch (error) {
        console.error("Error fetching articles:", error);
        next(error);
    }
};

const getArticleById = async (req, res, next) => {
    try{
        const article = await ArticleModel.findById(req.params.id);
        if (!article) {
            return res.status(404).json({
                message: `Article with ${req.params.id} not found`
             });
        }
        return res.status(200).json({
            message: "Article fetched successfully",
            data: article
        });
    } catch (error) {
        console.error("Error fetching article:", error);
        next(error);
    }
};

const updateArticleById = async (req, res, next) => {
        const articleSchema = joi.object({
        title: joi.string().min(5).optional(),
        content: joi.string().min(5).optional(),
    });

    const {error, value} = articleSchema.validate(req.body);
    if (error) {
        return res.status(400).json("Please provide valid data", error);
    }
    try {
        const updatedArticle = await ArticleModel.findByIdAndUpdate(
            req.params.id, 
            {...value}, 
            { new: true,
            runValidators: true
             });

        if (!updatedArticle) {
            return res.status(404).json({
                message: `Article with ${req.params.id} not found`
            });
        }
        return res.status(200).json({
            message: "Article updated successfully",
            data: article
        });
    } catch (error) {
        console.error("Error updating article:", error);
        next(error);
    }
};

const deleteArticleById = async (req, res, next) => {
    try {
        const article = await ArticleModel.findByIdAndDelete(req.params.id);
        if (!article) {
            return res.status(404).json({
                message: `Article with ${req.params.id} not found`
            });
        }
        return res.status(200).json({
            message: "Article deleted successfully"
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    postArticle,
    getAllArticle,  
    getArticleById,
    updateArticleById,
    deleteArticleById
}

