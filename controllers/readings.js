const Reading = require('../models/reading');
const request = require('request');
const rootURL = 'https://rws-cards-api.herokuapp.com/api/v1/cards/random';

module.exports = {
    new: newCard,
    pull: pullCard,
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
    let reading = new Reading(req.body);
    console.log('reading at start: ', reading);
    request(rootURL, function (err, response, body) {
        let pull = JSON.parse(body)
        console.log('pull: ', pull);
        let card = pull.cards[0];
        reading.name = card.name;
        reading.description = card.desc;
        reading.meaning = card.meaning_up;
        console.log('reading at end: ', reading);
        reading.save(function(err){
            if (err) return res.render('/error');
            res.render(`readings/new`,  {
                user: req.user,
                card: reading.name,
                reading
            });
        })
})
}
