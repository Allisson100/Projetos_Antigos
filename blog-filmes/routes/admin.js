const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
require ('../models/Category');
const Category = mongoose.model('categories');

router.get("/", (req,res) => {
    res.render('admin/add');
})

router.get('/categories', (req, res) => {
    res.render('admin/categories');
})

router.get('/categories/add', (req, res) => {
    res.render('admin/addcategory')
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

module.exports = router;

