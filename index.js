const express = require('express');
const path = require("path");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const fs = require('fs')
const Bot = require('./Bot.js').Bot
const bot = new Bot();

const app = express();

// MIDDLEWARES

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./views"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(express.json());
app.use(express.urlencoded({
	extended: true
}));
//Loading css files
app.use(express.static(path.join(__dirname, '/public')));

app.get('/', async (req, res) => {
    const articles = require('./articles.json');
	res.render("index", {
		req: req,
        articles: articles
	})
});

app.get('/games', async (req, res) => {
    res.render('games', {
		req: req
	})
});

app.get('*', function(req, res){
	res.render("error", {
		errorType: 404,
	})
});

app.listen(80, () => {
	console.log(`N2I Website is online on http://localhost:${80}/.`);
});