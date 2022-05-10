// const path = require('path')
const express = require('express');
const async = require('hbs/lib/async');
const mongoose = require('mongoose')

const app = express()

app.use(express.static('../public'))

app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/todo',{useNewUrlParser : true})


const user = mongoose.model('task',{
    date :{ type : String},
    Task :{ type : String},
    Desc :{ type : String}

})

  function insert(dat,tas,desc)
{
    const obj = new user({
        date : dat,
        Task : tas,
        Desc : desc
    })
    obj.save().then(()=>{
        console.log("Data Inserted Succesfully:")
    
    }).catch((err)=>{
        console.log("There is Problem to Insert:",err)
    })
}

app.post('/',async(req,res)=>{
    const { dat , tas, desc} = req.body;
    await insert(dat, tas, desc) 
   
 user.find({}, function (err, docs) {
    
    res.send("true")

// return docs
});
// console.log("The database data is =",data)    
})

app.get('/data', (req,res)=>{ 
    // console.log("getdata")
    user.find({}, function (err, docs) {
        res.send(docs)
    });
})

app.post('/delete', (req,res)=>{
    const { bid } =req.body
    // console.log("You pressed=",bid)
    user.findOneAndRemove({_id : ''+bid},req.body, function(err,data)
    {
        if(!err){
            console.log(" Record is Deleted!!!!!!!!!! ");
        }
    });

})


app.post('/update', (req,res)=>{
    const { bid } =req.body
    // console.log("You pressed Update=",bid)
    user.findById({_id : ''+bid}, function (err, docs) {
        res.send(docs)
    });
})


app.post('/updatedata', (req,res)=>{

    const { dat,tas,desc,id } =req.body

    // console.log("You pressed Update data=",id)
    user.findByIdAndUpdate(id,{date: dat,Task: tas,Desc:desc},function(err,result){
        res.send(result)
    })
})
    

app.listen(3020, () => {
    console.log('Server started on 3020')
})
