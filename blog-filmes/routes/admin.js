const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
require ('../models/Category');
const Category = mongoose.model('categories');

router.get("/", (req,res) => {
    res.send('OIIII')
})

router.get('/add', (req, res) => {
    res.render('admin/add');
})

router.get('/add/category', (req, res) => {
    res.render('admin/addcategory')
})

router.post('category/newcategory', (req, res) => {
    const newCategory = {
        name: req.body.name,
        slug: req.body.slug
    }

    new Category(newCategory).save.then(() => {
        console.log("Category saved sucessfully");
    }).catch((err) => {
        console.log("Failed to save new category");
    })
})

module.exports = router;

