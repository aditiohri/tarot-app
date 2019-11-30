const Reading = require('../models/reading');
const request = require('request');
const rootURL = 'https://rws-cards-api.herokuapp.com/api/v1/cards/random';

module.exports = {
    new: newCard,
    pull: pullCard,
    update
};

function update(req, res){
Reading.findById(req.params.id, (function(err, reading){
    reading.save(function(err){
        if (err) return res.render('/error');
        res.redirect(`/readings/${reading._id}`);
    })
}))
};

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
    reading.save(function(err){
        if (err) return res.render('/error');
        request(rootURL, function (err, response, body) {
            let pull = JSON.parse(body)
            console.log('pull: ', pull);
            let card = pull.cards[0];
            reading.name = card.name;
            reading.description = card.desc;
            reading.meaning = card.meaning_up;
            console.log('reading at end: ', reading);
            res.render(`readings/new`,  {
                user: req.user,
                card: reading.name,
                cardMeaning: reading.meaning,
                cardDescription: reading.description,
                question: reading.question,
                readingId: reading._id
            });
        })
})
}

// function create(req, res) {

// }
// function newReading(req, res) {
//     res.render('users/index',  {
//         title: 'Tarot Reading',
//         cards: JSON.parse(body)
//     });
// })
// }
