#!/us/bin/env node
const express = require ('express');
const bodyParser = require ('body-parser');

const app = express ();
app.use(bodyParser.urlencoded({extended: true}));

app.get ('/',(req, res) =>{
    res.send('hi there! teste 44444');
});

app.post('/', bodyParser.urlencoded({extended: true}), (req,res)=>{
console.log(req.body);
res.send('uhuuuuu');
});

app.listen(3000, () =>{
    console.log('listening');
});

