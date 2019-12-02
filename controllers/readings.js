const Reading = require('../models/reading');
const request = require('request');
const rootURL = 'https://rws-cards-api.herokuapp.com/api/v1/cards/random';

module.exports = {
    new: newCard,
    pull: pullCard,
    add: addCard,
    show,
    index,
    deleteOne,
    deleteAll,
    // update
};

function deleteAll(req, res) {
Reading.deleteMany({}, function(err, reading){
    res.redirect('/readings');
})
}

function deleteOne(req, res) {
Reading.findByIdAndDelete(req.params.id, function(err, reading){
    res.redirect('/readings');
})
}

function index(req, res){
Reading.find({}, function(err, readings){
    res.render(`readings/index`, {
        user: req.user,
        readings
    });
});
};

function show(req, res) {
Reading.findById(req.params.id, (function(err, reading){
        if (err) return res.render('/error');
        res.render(`readings/show`, {
            user: req.user,
            reading
        })}))
}

// function update(req, res){

// };

function newCard (req, res) {
    res.render('readings/new', {
        user: req.user,
        card: null,
        question: null
    });
};

function pullCard (req, res) {
    console.log('reading starts');
    console.log('question: ', req.body.question);
    request(rootURL, function (err, response, body) {
        let pull = JSON.parse(body);
        let card = pull.cards[0];
        console.log(card);
        if (err) return res.render('/error');
            res.render(`readings/question`,  {
                user: req.user,
                question: req.body.question,
                cardName: card.name,
                cardDesc: card.desc,
                cardMean: card.meaning_up
            });
        })
}

function addCard (req, res) {
    let reading = new Reading(req.body);
    console.log('question: ', req.body.question);
    reading.question = req.body.question;
    reading.name = req.body.name;
    reading.description = req.body.desc;
    reading.meaning = req.body.meaning;
    console.log('reading at end: ', reading);
    reading.save(function(err){
        console.log('saved reading: ', reading)
        if (err) return res.render('/error');
        res.redirect('/readings');
    })
}
