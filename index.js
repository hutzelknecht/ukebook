let express = require('express');
let app = express();
let basicAuth = require('./basicAuth');
let wkhtmltopdf = require('wkhtmltopdf');
let SongRoutes = require('./models/SongRoutes');
let bodyParser = require('body-parser');

app.use(basicAuth);
app.use(express.static('frontend/build'));
// app.use('/', express.static('frontend/build'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/api/song', SongRoutes);

app.listen(3000);