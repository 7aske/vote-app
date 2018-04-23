// Import dependencies
const express = require('express');
// Initialize app
const app = express();

const path = require('path');
const url = require('url');
const router = require('./router.js');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');

// Connect to the cloud database
// const dbpass = process.env.dbass;
const port = process.env.PORT || 3000;
const uri =
	'mongodb+srv://voteAppUser:voteAppPass@voteappdatabase-lq6ym.mongodb.net/test';

mongoose
	.connect(uri)
	.then(result => console.log(result))
	.catch(err => console.log(err));

// Make static resources folders available
app.use(express.static('public'));
app.use(express.static('views'));

// Set up the view engine
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({ defaultLayout: 'layout' }));
app.set('view engine', 'handlebars');

// Set up body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Assing a module to handle routes
app.use('/', router);

//Initialize server
app.listen(port, () => {
	console.log(`Express server runing on port ${port}`);
});
