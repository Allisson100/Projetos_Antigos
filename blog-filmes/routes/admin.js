const express = require('express');
const router = express.Router();

router.get("/", (req,res) => [
    res.send("Essa é apágina do ADMIN!!")
])

module.exports = router;

