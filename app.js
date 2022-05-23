import express from 'express'
import mongoose from 'mongoose'
import Models from './Models/models.js'
import cors from 'cors'


const app = express();
app.use(cors());

app.use(express.json()); 

var port = process.env.PORT || 3000;

// database connection
const url = `mongodb+srv://BabarJawad:UawWvf1V6YAVRqWF@cluster0.v5rvh.mongodb.net/Babar-Fitness-Studio?retryWrites=true&w=majority`;
mongoose.connect(url, {
    useNewUrlParser : true,
    useUnifiedTopology: true,
})
.then(() =>
{
    console.log("Connected to database");
})
.catch((err) => 
{
    console.log(err.message);
});


//Home Route
app.get('/', (req, res) => {
    res.send("Welcome to <h2>Babar-Fitness-Studio</h2>");
});
//Fetch all data from Db
app.get('/api/users', async (req, res) => {
    const data = await Models.find();
    res.send(data);      
});
//Fetch only one record
app.get('/api/users/:id', async (req, res) => {
    try
    {
        let data = await Models.findById(req.params.id);
        res.send(data); 
    }
    catch
    {
        return res.status(404).send('User data was not found');
    }     
});
//Post new-user-data route
app.post('/api/users/post', async (req, res) => {
    const model = new Models({
        Name:req.body.Name,
        Age:req.body.Age,
        Gender:req.body.Gender,
        Weight:req.body.Weight,
        Email:req.body.Email
    })
   try
   {
       const data = await model.save(); 
       res.json(data);  
   }  
   catch(err)
   {
        res.send(err); 
   } 
});
//Modify one record
app.put('/api/users/update/:id', (req, res) => {
    const id = req.params.id;
    const update = {
        Name:req.body.Name,
        Age:req.body.Age,
        Gender:req.body.Gender,
        Weight:req.body.Weight,
        Email:req.body.Email
    };

    Models.findByIdAndUpdate(id, update, (err,Models)=>{
        if(!Models)
        {
            return res.status(404).send('User data was not found');
        }
        res.send(Models);
    });  
});
//delete record route
app.delete('/api/users/delete/:id', (req, res) =>{
    const id=req.params.id;
    Models.findByIdAndRemove(id,(err,Models)=>{
        if(!Models)
        {
            return res.status(404).send('User data was not found');
        }
        res.send(Models);
    });
});

app.listen(port);