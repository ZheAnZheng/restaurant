const express=require('express');
const app=express();
const {engine}=require('express-handlebars');


//setting handlebars
app.engine('handlebars',engine({defaultLayout:'main'}));
app.set('view engine','handlebars');
app.set('views','./views');

// make 'public' directory static
app.use(express.static('public'));

app.get('/',(req,res)=>{
    res.render('index');
})

app.get('/show',(req,res)=>{
    res.render('show');
})

app.listen(3000,()=>{
    console.log('server run on http://localhost:3000');
})