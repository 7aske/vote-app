const express = require('express');
const path = require('path');
const url = require('url');
const router = require('./router.js');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const app = express();
process.env.rdir = __dirname;

const port = process.env.port || 3000;

app.use(express.static('public'));
app.use(express.static('views'));

// View Engine
//app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({ defaultLayout: 'layout' }));
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', router);

app.listen(port, () => {
	console.log(`Express server runing on port ${port}`);
});
