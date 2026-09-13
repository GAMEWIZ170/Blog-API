const express = require('express');

const searchArticles = require('../controllers/searchArticles.controller');
const {postArticle, getAllArticle, getArticleById, updateArticleById, deleteArticleById} = require('../controllers/article.controller');
const requireAuth = require('../middlewares/requireAuth');

const router = express.Router();

router.post('/articles', requireAuth, postArticle);

router.get('/articles', getAllArticle);

router.get('/articles/search', searchArticles);

router.get('/articles/:id', requireAuth, getArticleById);

router.put('/articles/:id', requireAuth, updateArticleById);

router.delete('/articles/:id', requireAuth, deleteArticleById);

module.exports = router;




