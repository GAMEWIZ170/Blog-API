const express = require('express');

const searchArticles = require('../controllers/searchArticles.controller');
const {postArticle, getAllArticle, getArticleById, updateArticleById, deleteArticleById} = require('../controllers/article.controller');
const requireAuth = require('../middlewares/requireAuth');

const router = express.Router();
router.use(requireAuth);

router.post('/articles', postArticle);

router.get('/articles', getAllArticle);

router.get('/articles/search', searchArticles);

router.get('/articles/:id', getArticleById);

router.put('/articles/:id', updateArticleById);

router.delete('/articles/:id', deleteArticleById);

module.exports = router;




