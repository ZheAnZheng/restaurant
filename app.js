const express=require('express');
const app=express();
const {engine}=require('express-handlebars');

app.engine('handlebars',engine({defaultLayout:'main'}));
app.set('view engine','handlebars');
app.set('views','./views');

app.get('/',(req,res)=>{
    res.render('index');
})

app.listen(3000,()=>{
    console.log('server run on http://localhost:3000');
})