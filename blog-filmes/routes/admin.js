const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

require ('../models/Category');
const Category = mongoose.model('categories');

require('../models/Post');
const Post = mongoose.model('posts');

const upload = require('../config/multer');


router.get("/", (req,res) => {
    res.render('admin/add');
})

router.get('/categories', (req, res) => {

    Category.find().lean().then((categories) => {
        res.render('admin/categories', {categories: categories});
    }).catch((err) => {
        req.flash('error_msg', "Error in categories list");
        res.redirect("/admin/add")
    })
})

router.get('/categories/add', (req, res) => {
    res.render('admin/addcategory')
})

router.get('/categories/edit/:id', (req,res) => {

    Category.findOne({_id:req.params.id}).lean().then((category) => {
        res.render('admin/editcategories', {category: category});
    }).catch((err) => { 
        req.flash('error_msg', "That category does not exist");
        res.redirect('admin/categories');
    })
})

router.post('/categories/edit', (req, res) => {
    Category.findOne({_id: req.body.id}).then((category) => {

        category.name = req.body.name;
        category.slug = req.body.slug;

        category.save().then(() => {
            req.flash('success_msg', "Category edited successfully");
            res.redirect('/admin/categories');
        }).catch((err) => {
            req.flash('error_msg', "Internal error in saving category edit");
            res.redirect('/admin/categories');
        })
    }).catch((err) => {
        req.flash('error_msg', "Error editing category");
        req.redirect('/admin/categories');
    })
})

router.post('/categories/delete', (req, res) => {
    Category.deleteOne({_id: req.body.id}).then(() => {
       req.flash('success_msg', "Category deleted successfully");
        res.redirect('/admin/categories');
    }).catch((err) => {
        req.flash('error_msg', "Error deleting category");
        res.redirect('/admin/categories');
    })
})

router.post('/category/new', (req, res) => {

    var error = [];

    if(!req.body.name || typeof req.body.name == undefined || req.body.name == null) {
        error.push({texto: "Invalid name"});
    }

    if(!req.body.slug || typeof req.body.slug == undefined || req.body.slug == null) {
        error.push({texto: "Invalid slug"});
    }

    if (error.length > 0) {
        res.render('admin/addcategory', {error: error});
    } else {
        const newCategory = {
            name: req.body.name,
            slug: req.body.slug
        }

        new Category(newCategory).save().then(() => {
            req.flash('success_msg', "Category created successfully");
            res.redirect('/admin/categories');
        }).catch((err) => {
            req.flash('error_msg', "Error to create a new category, try again");
            res.redirect('/admin');
        })
    }
})

router.get('/posts', (req, res) => {
    Post.find().lean().populate({path:'category', strictPopulate: false}).sort({date:'desc'}).then((posts) => {
        res.render('admin/posts', {posts: posts});
    }).catch((err) => {
        req.flash('error_msg', "Error to list posts");
        res.redirect('/dmin');
    }) 
})

router.get('/posts/add', (req, res) => {
    Category.find().lean().then((categories) => {
        res.render('admin/addpost', {categories: categories});
    }).catch((err) => {
        req.flash('error_msg', "Error to load post form");
        res.redirect('/admin');
    }) 
})


router.post('/post/new', upload.single('file'), (req, res) => {
    var error = [];

    if(!req.body.title || typeof req.body.title == undefined || req.body.title == null) {
        error.push({texto: "Invalid name"});
    }

    if(!req.body.slug || typeof req.body.slug == undefined || req.body.slug == null) {
        error.push({texto: "Invalid slug"});
    }

    if (req.body.categoria == "0") {
        error.push({texto: "Categoria inválida, registre uma categoria"});
    }

    if (error.length > 0){
        res.render('admin/addpost', {error: error});
    } else {

        const newPost = {
            imageName: req.body.imageName,
            imageSrc: req.file.path,
            title: req.body.title,
            slug: req.body.slug,
            description: req.body.description,
            content: req.body.content,
            category: req.body.category
        }

        new Post (newPost).save().then(() => {
            req.flash('success_msg', "Post create successfully");
            res.redirect('/admin/posts');
        }).catch((err) => {
            req.flash('error_msg', "Post save error");
            res.redirect('/admin/posts');
        })
    }
})

module.exports = router;


