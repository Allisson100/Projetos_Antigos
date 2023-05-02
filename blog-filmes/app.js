const express = require('express');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const app = express();
const admin = require('./routes/admin');
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
const flash = require('connect-flash');
const { log } = require('console');

require('./models/Post');
const Post = mongoose.model('posts');

require('./models/MainPage');
const MainPage = mongoose.model('mainpage');

//Settings
    //Session
        app.use(session({
            secret: 'blogfilmes',
            resave: true,
            saveUninitialized: true
        }));

        app.use(flash());

    // Middleware
        app.use((req, res, next) => {
            res.locals.success_msg = req.flash("success_msg");
            res.locals.error_msg = req.flash("error_msg");
            next();
    })

    //Body Parser
        app.use(express.urlencoded({extended:true}));
        app.use(express.json());
    
    //Handlebars
        app.engine('handlebars', handlebars.engine({defaultLayout: 'main'}));
        app.set('view engine', 'handlebars');

    // Mongoose
        mongoose.Promise = global.Promise;
        mongoose.connect('mongodb://127.0.0.1/blog-filmes').then(() => {
            console.log("Connected to Mongo");
        }).catch((err) => {
            console.log("Failed to connect Mongo:" + err);
        })
    
    //Public
        app.use(express.static(path.join(__dirname, 'public')));

// Routes

    app.get("/", (req, res) => {

        Post.find().lean().then((posts) => {

            MainPage.findById("64512683d06035b348475c81").lean().then((mainpage) => {

                res.render('index', {posts: posts, mainpage: mainpage})

            }).catch((err) => {
                req.flash('error_msg', "An internal error occurred");
                res.redirect('/404');
            })

        }).catch((err) => {
            req.flash("error_msg", "An internal error occurred");
            res.redirect("/404");
        })
    })

    app.get('/posts/:slug', (req, res) => {
        Post.findOne({slug: req.params.slug}).lean().then((post) => {
            if (post) {
                res.render('posts/index', {post: post});
            } else {
                req.flash('error_msg', "Error, post doesn't exist");
                res.redirect('/');
            }
        })
    })

    app.get("/404", (req, res) => {
        res.send("Error 404!");
    })

    app.use('/admin', admin);

//Others
    const PORT = 8081;

    app.listen(PORT, () => {
        console.log("Server running!");
    });