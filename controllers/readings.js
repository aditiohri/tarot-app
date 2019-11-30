const Reading = require('../models/reading');
const request = require('request');
const rootURL = 'https://rws-cards-api.herokuapp.com/api/v1/cards/random';

module.exports = {
    new: newCard,
    pull: pullCard,
    update
};

function update(){
// push cardName and cardMeaning to reading
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
    console.log('reading: ', reading);
    reading.save(function(err){
        if (err) return res.render('/error');
        request(rootURL, function (err, response, body) {
            let pull = JSON.parse(body)
            console.log('pull: ', pull);
            let card = pull.cards[0];
            console.log('card: ', card);
            console.log('card meaning: ', card.meaning_up);
            res.render('readings/new',  {
                user: req.user,
                cardName: card.name,
                cardMeaning: card.meaning_up,
                question: reading.question
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
