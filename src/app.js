require('dotenv').config();

const express = require('express');
const cors = require('cors');

const ArticleRoutes = require('./routes/article.route.js');
const UserRoutes = require('./routes/user.routes.js');

const errorHandler = require('./middlewares/errorHandler.js');
const logger = require('./middlewares/logger.js');

const app = express();

app.use(express.json());
app.use(cors("*"));

app.use(logger);

app.use('/api', ArticleRoutes);
app.use('/api/user', UserRoutes);

app.use(errorHandler);

module.exports = app

