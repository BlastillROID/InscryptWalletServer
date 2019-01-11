const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const routes = require('./routes');

const root = "./";
const port = process.env.Port || 4000;
const app = express();
//const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

//app.use((cookieParser()));
app.use(session({
    secret: 'work hard',
    resave: true,
    saveUninitialized: false

}));




app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(express.static(path.join(root, 'dist')));
app.use('/api', routes);
app.get('*', (get, res) => {
    res.sendFile('dist/index.html', {
        root
    });
});

app.listen(port, () => {

    console.log(`Server started on :${port}`);
});