const Reading = require('../models/reading');
const request = require('request');
const rootURL = 'https://rws-cards-api.herokuapp.com/api/v1/cards/random';

module.exports = {
    new: newCard

};

function newCard (req, res) {
    console.log('reading starts')
    request(rootURL, function (err, response, body) {
        let reading = JSON.parse(body)
        console.log('reading: ', reading);
        let card = reading.cards;
        console.log('card: ', card);
        console.log('card meaning: ', card[0].meaning_up);
    res.render('readings/new',  {
        title: 'Tarot Reading',
        card: card[0].meaning_up,
        user: req.user
    });
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
