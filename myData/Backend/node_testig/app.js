const express=require('express');
const app=express();

const PORT=3300;

app.get('/',(req,res)=>
{
    res.send("i am live")
})

app.listen(PORT ,()=>{
    console.log(`server is run at http://localhost:${PORT}/`);
})