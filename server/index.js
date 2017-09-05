const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();
const URL = require('../database/index');
const request = require('request');

app.use(express.static(__dirname + '/../react-client/dist'));

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

/*******************************
Global Queue Storage
*******************************/
let queue = [];

/*******************************
REACT ROUTER ROUTES
*******************************/
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/../react-client/dist/index.html'));
});

/*******************************
ADDED URL TO DATABASE/RETURN ID
*******************************/
app.post('/addURL', (req,res) => {
  const addNew = new URL({
     url: req.body.url,
     html: '',
     status: 'false'
   })

   addNew.save((err,result) => {
     if (err) {
       console.log('did not save');
     } else {
       queue.push([req.body.url, result._id]);
       res.send(result);
     }
   })
});

/*******************************
Check Session Array for Queue Update Database
*******************************/
setInterval(() => {
  while (queue.length > 0) {
    console.log(queue);
    data = queue[0];
    request('https://'+ data[0], (err,res,html) => {
      if (err) {
        console.log(err);
      }
      if (!err && res.statusCode == 200) {
      URL.update({ _id: data[1]}, {$set:{html: html, status: 'true'}}, {new:true}, (err, done) => {
        if(err){
          console.log('did not update');
        }
        console.log('updated', done);
      })
      }
    })
    queue.splice(0,1);
  }
},1000);

/*******************************
Return Status of ID
*******************************/
app.post('/IdStatus', (req,res) => {
  URL.findOne({_id:req.body.id}, (err,obj) => {
    res.send(obj);
  })
});

/*******************************
Start Server on port 3000
*******************************/
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('Listening on port', port);
});
