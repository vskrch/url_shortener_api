const express = require('express');
const router = express.Router();
const validUrl = require('valid-url');
const shortid = require('shortid');
const config = require('config');
const Url = require('../models/url')

//@Route POST req to /api/url/shorten

//@desc create a short url

router.post('/shorten',async (req,res)=>{
    const {longUrl} = req.body;
    //check base url first
    const baseUrl = config.get('baseUrl');
    if(!validUrl.isUri(baseUrl)){
        return res.status(401).json('Invalid Url!');
    }
    //create url code from shortid 
    // desc generates uuid like short code
    const urlCode = shortid.generate();

    //check longUrl
    if(validUrl.isUri(longUrl)){
try{
    let url = await Url.findOne({ longUrl })
    if(url){
        res.json(url);
    }else{
        const shortUrl = baseUrl + '/' + urlCode;

        url = new Url({
            longUrl,
            shortUrl,
            urlCode,
            date: new Date()
        });

        await url.save();
        res.json(url);
    }
}catch(err){
console.error(err);
res.status(500).json('Internal server error');

}
    }else{
        res.status(401).json('Invalid Long url');

    }

});
module.exports = router;