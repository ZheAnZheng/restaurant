const express=require('express');
const app=express();

app.get('/',(req,res)=>{
    res.send('express server is builded');
})

app.listen(3000,()=>{
    console.log('server run on http://localhost:3000');
})