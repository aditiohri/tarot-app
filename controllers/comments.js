const Reading = require('../models/reading');

module.exports = {
    create,
    delete: deleteComment
} 
    

function create(req, res){
console.log('creating...');
Reading.findById(req.params.id, function(err, reading){
    if (err) return res.render('/error');
    reading.diary.push(req.body);
    reading.save(function(err){
        console.log('diary with reading: ', reading)
        if (err) return res.render('/error');
        res.redirect(`/readings/${reading._id}`)
    })
})
}

function deleteComment(req, res){
Reading.findById(req.params.id, function(err, reading){
    if (err) return res.render('/error');
    let diary = reading.diary;
    let id = diary.indexOf(diary);
    diary.splice(id, 1)        
    reading.save(function(err){
        res.redirect(`/readings/${reading._id}`)
    })
})
}