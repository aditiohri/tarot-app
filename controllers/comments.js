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
    console.log('deleting...');
    console.log('req.params.id: ', req.params.id);
    console.log('req.params.idt: ', req.params.id);
Reading.findById(req.params.id, function(err, reading){
    if (err) return res.render('/error');
    let diary = reading.diary;
    console.log('diary before: ', diary)
    let id = diary.indexOf(diary);
    diary.splice(id, 1)        
    console.log('diary after: ', diary)
    reading.save(function(err){
        res.redirect(`/readings/${reading._id}`)
    })
})
}