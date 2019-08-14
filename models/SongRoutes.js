const express = require('express');
const wkhtmltopdf = require('wkhtmltopdf');
const router = express.Router();
let Song = require('./Song');

// all songs - used for the songbook pdf generation
router.get('/', function(req, res, next){
    if (req.authenticated) {
        Song.findAll().then(songs => {
            let json = songs.map(song=>song.dataValues);
            res.send(json);
        }, function(e){
            console.warn(e);
            res.status(500).send();
        });
    } else {
        res.status(401).send();
    }
    // next();
});

// create a song (/)
router.post('/', function(req, res){
    if (req.authenticated) {
        Song.create({
            title: req.body.title
        }).then(function() {
            res.sendStatus(200);
        }, function(){
            res.sendStatus(500);
        });
    } else {
        res.sendStatus(401);
    }
});

// used for the list on the left (/)
router.get('/titles', function(req, res){
    if (req.authenticated) {
        Song.findAll({
            attributes: ['title', 'id']
        }).then(function(song){
            res.send(song);
        }, function(e){
            console.warn(e);
        });
    } else {
        res.status(401).send();
    }
});

// used for the complete songbook generation
router.get('/pdf', function(req, res){
    let layout = req.query.layout;
    // let delay = layout ? 50000 : 10000; // 50 sec : 10 sec
    let url = 'http://127.0.0.1:3000/#/songbook';
    let orientation = (layout == 2) ? 'landscape' : 'portrait';
    if (layout) { url += layout; }

    console.log('CREATING PDF with layout', orientation);
    res.type('application/pdf');
    res.attachment('songbook.pdf');

    wkhtmltopdf(url, {
        // JavascriptDelay: delay,
        // pageSize: 'A4',
        outlineDepth: 2,
        username: 'admin', password: 'mondhamster',
        printMediaType: true,
        windowStatus:  'rendered',
        orientation: orientation,
        debugJavascript: true,
        // debug: true,
        // cover: 'http://127.0.0.1:3000/titlepage.html',
        // toc: {
        //     xslStyleSheet: '/home/micha/dev/ukebook_2.0/models/assets/toc.xml'
        // },
        toc: '--xsl-style-sheet '

    }).pipe(res, 'binary');

});

// used for displaying a single song (/)
router.get('/:id', function(req, res){
    if (req.authenticated) {
        Song.find({
            where: {
                id: req.params.id
            }
        }).then(function(song) {
            res.send(song);
        });
    } else {
        res.status(401).send();
    }
});

// used for deleting a single song (/)
router.delete('/:id', function(req, res){
    if (req.authenticated) {
        Song.destroy({
            where: {
                id: req.params.id
            }
        }).then(function(song) {
            res.status(200).send({id: req.params.id});
        });
    } else {
        res.status(401).send();
    }
});

// edit a song (/)
router.post('/:id', function(req, res){
    if (req.authenticated) {
        let id = req.params.id;
        Song.update({
            tab: req.body.tab,
            title: req.body.title,
            author: req.body.author,
            owner: req.body.owner,
            updatedAt: new Date()
        },{
            where: {
                id: id
            }
        }).then(function() {
            res.status(200);
        }, function(){
            res.status(500);
        });
    } else {
        res.status(401).send();
    }
});

module.exports = router;