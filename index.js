require('dotenv').config();

const express = require('express');
const cors = require('cors');
const connectDB = require('./database/connectDB.js');
const Article = require('./models/article.model.js');

const ArticleRoutes = require('./routes/article.route.js');
const errorHandler = require('./middlewares/errorHandler.js');
const logger = require('./middlewares/logger.js');

const app = express();

connectDB();

app.use(express.json());
app.use(cors("*"));

app.use(logger);

app.use('/api', ArticleRoutes);


app.use(errorHandler);




port = process.env.PORT
app.listen(port, ()=> {console.log("Running on Port")});













