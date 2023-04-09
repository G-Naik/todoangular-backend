const express = require('express')

const app = express()
const cors = require('cors')
const Task = require("./model/task")
// const routes = require('./routes/todo')

const mongoose = require('mongoose')
mongoose.set("strictQuery",false)


app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cors())
// app.use(routes)



let url = "mongodb://localhost:27017"

mongoose.connect(url).then(() =>{
  console.log("Mongoose is connected")
}).catch(err => console.log(err))



  app.get('/todo',async(req,res) => {
    let data = await Task.find();
    res.send(data)
  })

  app.post('/task',async(req,res) => {
    let data = new Task({
      text:req.body.task_name
    })
    console.log(data,"data")
   try{
     await data.save()
     res.send({message:"data Has been saved "})
    }catch(err){
      res.send({messgae:"failed to set",err1:err})
    }
  })

  app.get('/todo/:id',async(req,res) => {
    let {id} = req.parmas
    let data = await Task.findById(id);
    res.send(data)
  })

  app.put('/todo/:id',async(req,res) => {
    let id = req.params.id
    try{
      await Task.updateOne({_id:id},{
        $set:{
          text:req.body.task_name
        }
      })
      res.send({message:"Data is been updated"})
    }catch(err){
      res.status(500).send(err);
    }  
  })

  // app.put('/todo/:id', async (req, res) => {
  //   console.log(req.body,"edit value")
  //   try {
  //     const task = await Task.findByIdAndUpdate(req.params.id, req.body.task_name, { new: true });
  //     console.log(task,"task")
  //     res.send(task);
  //   } catch (err) {
  //     res.status(500).send(err);
  //   }
  // });

  app.delete("/todo/:id",async(req,res) => {

    try{
      let {id} = req.params
      await Task.deleteOne({_id:id})
    }catch(err){
      res.send({message:"failed to delete"})
    }
  })


  app.listen(3000, () => {
    console.log('Server started on port 3000');
  });