const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");


const app = express();
const Model = require ('./userRegis');
const Request = require ('./userToDoner');
const Doner=require("./donerRegis")
const Accept =require('./DonerToUser');

app.use(cors({
    origin:"*"
}))
app.use(express.json());
const port = 5000;

//Mongodb connections
// const mongoString="mongodb://127.0.0.1:27017";
const mongoString="mongodb+srv://sarkaranindita55:12345@cluster0.nvwhbh1.mongodb.net/"
mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error',(error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})

app.get('',(req,res)=>{
    res.send("welcome our project Blood Donation");
})

//register new user
app.post('/register', async(req,res)=>{
    const data = new Model({
        name:req.body.name,
        phoneNumber:req.body.phoneNumber,
        location:req.body.location,
        pinCode:req.body.pinCode,
        bloodGroup:req.body.bloodGroup,
        email:req.body.email,
        password:req.body.password,
    })

    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
})

//login user post
app.post('/loginUser',async(req,res)=>{
    const email=req.body.email;
    const password=req.body.password;
    try{
        const data=await Model.find({email:email,password:password});
        res.status(200).json(data)
    }catch(error){
        res.status(500).json({message:"Sorry Email or password not found"})
    }
})

//get all details by email id
app.get('/getDiteals/:email' ,async(req,res)=>{
    try{
        const email=req.params.email;
        const data = await Model.find({email:email});
        res.status(200).json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//update Profile by id 
app.patch('/updateUser/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

        const data = await Model.findByIdAndUpdate(
            id, updatedData, options
        )

        res.send(data)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

//...................................................................

//Donor Part
//register new donor
app.post('/registerDonor',async(req,res)=>{
    const data=new Doner({
        name:req.body.name,
        phoneNumber:req.body.phoneNumber,
        location:req.body.location,
        pinCode:req.body.pinCode,
        bloodGroup:req.body.bloodGroup,
        email:req.body.email,
        password:req.body.password,
        status:req.body.status,
        lastDate:req.body.lastDate,
        nextDate:req.body.nextDate,
        
    })

    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
   
    
})

//login donor post
app.post('/loginDonor',async(req,res)=>{
    const email=req.body.email;
    const password=req.body.password;
    try{
        const data=await Doner.find({email:email,password:password});
        res.status(200).json(data)
    }catch(error){
        res.status(500).json({message:"Sorry Email or password not found"})
    }
})


//get all details by email id
app.get('/getDitealsDonor/:email' ,async(req,res)=>{
    try{
        const email=req.params.email;
        const data = await Doner.find({email:email});
        res.status(200).json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})


//update Profile by id
app.patch('/updateDonor/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

        const data = await Doner.findByIdAndUpdate(
            id, updatedData, options
        )

        res.send(data)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

//update Profile by email

app.patch('/updateDonor/:email', async (req, res) => {
    try {
        const email = req.params.email;
        const updatedData = req.body;
        const options = { new: true };

        const data = await Doner.findByIdAndUpdate(
            email, updatedData, options
        )

        res.send(data)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

//get Diteals by Status
app.get('/getDitealsStatus/:status' ,async(req,res)=>{
    try{
        const status=req.params.status;
        const data = await Doner.find({status:status});
        res.status(200).json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//request..............................................

//user to donor request post data 

app.post('/userToDonorRequest',async(req,res)=>{
    const data=new Request({
        userEmail:req.body.userEmail,
        userName:req.body.userName,
        userPinCode:req.body.userPinCode,
        userPhoneNumber:req.body.userPhoneNumber,
        userBloodGroup:req.body.userBloodGroup,

        donorEmail:req.body.donorEmail,
        donorName:req.body.donorName,
        donorPinCode:req.body.donorPinCode,
        donorPhoneNumber:req.body.donorPhoneNumber,
        donorBloodGroup:req.body.donorBloodGroup,
        request:req.body.request,
        
    })

    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }

    //delete 

    app.delete('/userToDonorDelete', async (req, res) => {
        try {
            const userEmail=req.body.userEmail;
            const donorEmail = req.body.donorEmail;
            const data = await Request.findOneAndDelete({userEmail:userEmail,donorEmail:donorEmail})
            res.send(`Document with ${data} has been deleted..`)
        }
        catch (error) {
            res.status(400).json({ message: error.message})
    }
    })
   
    
})

//get all details by userEmail id
app.get('/getRequestDiteals/:userEmail' ,async(req,res)=>{
    try{
        const userEmail=req.params.userEmail;
        const data = await Request.find({userEmail:userEmail});
        res.status(200).json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//get donor request by email
app.get('/getRequestdonor/:donorEmail', async(req,res)=>{
    try{
        const donorEmail=req.params.donorEmail;
        const data = await Request.find({donorEmail:donorEmail});
        res.status(200).json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//post accept user request

app.post('/donorToUserAccept',async(req,res)=>{
    const data=new Accept({
        userEmail:req.body.userEmail,
        userName:req.body.userName,
        userPinCode:req.body.userPinCode,
        userPhoneNumber:req.body.userPhoneNumber,
        userBloodGroup:req.body.userBloodGroup,

        donorEmail:req.body.donorEmail,
        donorName:req.body.donorName,
        donorPinCode:req.body.donorPinCode,
        donorPhoneNumber:req.body.donorPhoneNumber,
        donorBloodGroup:req.body.donorBloodGroup,
        

        
        
    })

    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
    })

app.get('/donorToUserAcceptUser/:userEmail' ,async(req,res)=>{
        try{
            const userEmail=req.params.userEmail;
            const data = await Accept.find({userEmail:userEmail});
            res.status(200).json(data)
        }
        catch(error){
            res.status(500).json({message: error.message})
        }
    })
    
app.get('/donorToUserAcceptDonor/:donorEmail' ,async(req,res)=>{
        try{
            const donorEmail=req.params.donorEmail;
            const data = await Accept.find({donorEmail:donorEmail});
            res.status(200).json(data)
        }
        catch(error){
            res.status(500).json({message: error.message})
        }
    })    

//starting port 
app.listen(port, () => {
    console.log(`Server Started at ${port}`)
});