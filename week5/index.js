const express = require('express');
const session = require('express-session');
const mysql = require('mysql');
const dotenv = require('dotenv');
const path = require('path');

const port = 5000;
const app = express();

dotenv.config({path:'./.env'});

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

db.connect((error)=> {
    if(error){
        console.error(error);
    }else {
        console.log(`MySQL Connected...`);
    }
});

const publicDirectory = path.join(__dirname, './public');
app.use(express.static(publicDirectory));
app.set('view engine', 'hbs');
app.use(express.json());
app.use(express.urlencoded({ extended: true}));


// Set up session 
app.use(
    session({
        secret: 'joao',
        resave: true,
        saveUninitialized: true,
    })
);


// Define routes
app.use('/', require('./routes/pages'));
app.use('/auth', require('./routes/auth'));

app.listen(5000, () => {
    console.log(`Server started on port ${port}`);
});
