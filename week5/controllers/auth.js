const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

exports.register = (req, res) => {
    console.log(req.body);

    const { name, email, password, passwordConfirm } = req.body;
    db.query('SELECT email FROM users WHERE email = ?', [email], async (error, results) => {
        if (error) {
            console.log(error);
            return res.status(500).send("Internal Server Error");
        }
        if (results.length > 0) {
            return res.render('register', {
                message: 'This email is already in use'
            });
        } else if (password !== passwordConfirm) {
            return res.render('register', {
                message: 'Passwords do not match'
            });
        }

        let hashedPassword = await bcrypt.hash(password, 8);
        console.log(hashedPassword);

        db.query('INSERT INTO users SET ?', { name: name, email: email, password: hashedPassword }, (error, results) => {
            if (error) {
                console.log(error);
                return res.status(500).send("Internal Server Error");
            } else {
                console.log(results);
                return res.render('register', {
                    message: 'User registered'
                });
            }
        });
    });
}

exports.login = (req, res) => {

    // retrieve user input
    const { email, password } = req.body;

    // select user from database using email given
    db.query('SELECT * FROM users WHERE email = ?', [email], async (error, user) => {

        if (error) {
            console.log(error);
            return res.status(500).send("Internal Server Error");
        }
        // authenticate password
        if (user.length > 0) {
            const passwordMatch = await bcrypt.compare(password, user[0].password);

            if (passwordMatch) {
                // Set up a session and redirect to the profile page
                req.session.userId = user[0].id;
                return res.render('profile', {
                    user: user[0]
                });
            }
        }
        // if Password or username is wrong render message on the page
        return res.render('login', {
            message: 'Invalid username or password'
        });

    });


};


exports.logout = (req, res) => {
    // Destroy session and redirect to homepage if no error
    req.session.destroy((err) => {
        if (err) {
            return res.redirect('/profile'); 
        }
        res.redirect('/'); 
    });
}