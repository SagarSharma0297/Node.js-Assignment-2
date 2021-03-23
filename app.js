const express = require('express');

const fs = require('fs');

const app = express();

app.set('view engine','hbs');

const htmlFile = fs.readFileSync('app.html' , 'utf-8');

const dataFile = JSON.parse(fs.readFileSync('data.json','utf-8'));
app.get('/:players/:id',(req,res)=>{
    let teamName = req.params.players;
    let id = req.params.id;
   
    let dataToshow = dataFile.filter((item=>item.from == teamName));

    if(dataToshow[id] === undefined || dataToshow[id] === null || dataToshow[id] === ""){
        res.send("NO MORE")
    }
    else{
        res.render('index',{
        Name:dataToshow[id].playerName,
        image:dataToshow[id].thumbnail   
    })

    }
    

   

})

app.get("/",(req,res)=>{
    res.send(htmlFile)
})

app.listen(1000,()=>{
    console.log("Your app is running at 1000")
})
