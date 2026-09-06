const ArticleModel = require('../models/article.model');

const searchArticles = async (req, res, next) => {
    try {
        const { q } = req.query;

        if (!q) {
            return res.status(400).json({
                message: "No matching results"
            });
        }

        const articles = await ArticleModel.find(
            { $text: { $search: q } },
            { score: { $meta: "textScore" } }
        ).sort({ score: { $meta: "textScore" } });

        return res.status(200).json({
            message: "Search query executed successfully",
            count: articles.length,
            data: articles
        });
    } catch (error) {
        console.error("Error searching articles:", error);
        next(error);
    }
};


module.exports = searchArticles;