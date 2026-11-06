const express = require('express');
const cors = require('cors');
const logger = require('./middlewares/logger');
const errorHandler = require('./middlewares/errorhandler');
const articleRoutes = require('./routes/article.route');
const userRoutes = require('./routes/user.route');

const app = express();

app.use(express.json());
const allowedOrigins = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(',').map((origin) => origin.trim()).filter(Boolean)
  : [];

app.use(cors(allowedOrigins.length > 0 ? { origin: allowedOrigins } : { origin: false }));
app.use(logger);

app.get("/", (req, res) => {
  res.json({ message: "jonathan API is running" });
});

app.use("/api/user/", userRoutes);
app.use('/api', articleRoutes);

app.use(errorHandler);

module.exports = app;
