const express = require('express');
const router = express.Router();

const Url = require('../models/url');

// @Route Get /:code
// @Desc Redirect to long/original Url

router.get('/:code',async (req,res) => {
    try{
        const url = await Url.findOne({urlCode: req.params.code});
        if(url){
            return res.redirect(url.longUrl);

        }else{
            return res.status(404).json('No url Found');
        }
    } catch(err){
        console.error(err);
        res.status(500).json('Internal Server error');
    }
});
module.exports = router;