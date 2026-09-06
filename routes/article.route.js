const express = require('express');

const searchArticles = require('../controllers/searchArticles.controller');
const {postArticle, getAllArticle, getArticleById, updateArticleById, deleteArticleById} = require('../controllers/article.controller');

const router = express.Router();

router.post('/articles', postArticle);

router.get('/articles', getAllArticle);

router.get('/articles/:id', getArticleById);

router.put('/articles/:id', updateArticleById);

router.delete('/articles/:id', deleteArticleById);

router.get('/articles/search', searchArticles);

module.exports = router;




