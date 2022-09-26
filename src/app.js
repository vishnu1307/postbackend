const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors')
const fs = require('fs')


//Init Express
const app = express();

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/post', (req, res) => {
    let data = JSON.parse(fs.readFileSync('./db.json'))
    const result = data.posts.map(item => {
        const reultItem = data.likes.find(i => i.post_id === item.id)
        
        item.likes = reultItem 
        ? reultItem.users
        : []
        
        return item
      })
    res.send(result)
})
app.post('/:post_id/:username/like', (req, res) => {
    const existpost = JSON.parse(fs.readFileSync('./db.json')).likes
    if (postData.post_id == null || postData.users == null ) {
        return res.status(401).send({error: true, msg: 'Data missing'})
    }
    existpost = existpost.likes.map(item => {
        if(item.post_id == req.params.post_id){
            item.users.push(req.params.username)
        }
        return item;
    })
    fs.writeFileSync('./db.json', JSON.stringify(existpost))
    res.send({success: true, msg: 'Data added successfully'})
})

app.delete('/posts/:post_id/:username/like', (req, res) => {
    const existpost = JSON.parse(fs.readFileSync('./db.json')).likes
    if (postData.post_id == null || postData.users == null ) {
        return res.status(401).send({error: true, msg: 'Data missing'})
    }
    existpost = existpost.likes.map(item => {
        if(item.post_id == req.params.post_id){
            item.users = item.users.splice(array.indexOf(req.params.username), 1);
        }
        return item;
    })
    fs.writeFileSync('./db.json', JSON.stringify(existpost))
    res.send({success: true, msg: 'Data removed successfully'})
    
})

module.exports = app;