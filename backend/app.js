const express = require("express")
require('dotenv').config()
const app = express()
const db = require('./db');
var bcrypt = require('bcryptjs')
const { ObjectID, ObjectId } = require('mongodb');
var bodyParser = require("body-parser");
const cors = require('cors')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

db.initDb((err, db) => {
    if (err) {
        console.log(err)
    } else {
        console.log("connected")
        const port = process.env.PORT || 3001
        
        console.log(port)
        app.listen(port)
    }
})
app.post('/patientsignup', async (req, res) => {
    

    try {
        pass = req.body.password;
        console.log(pass)
        hpass = await bcrypt.hash(pass, 10);
        console.log(hpass)
        const database = db.getDb().db("Hackathon")
        await database.collection("patient").insertOne({
            email: req.body.email,
            password: hpass,
            name: req.body.name,
            gender: req.body.gender,
            age: req.body.age,
            url:req.body.img
        })
        res.send({val:true})
    }
    catch (err) {
        console.log(err)
        res.send({ error: err.message })
    }
})
app.post("/patientlogin", async (req, res) => {
    
    try {
        const database = db.getDb().db("Hackathon")
        email = await database.collection("patient").findOne({ email: req.body.email })
        if (!email) {
            res.send({val:false})
        }
        else {
            const matchPassword = await bcrypt.compare(req.body.password, email.password)
            if (!matchPassword) {
                res.send({val:false})
            }
            else {
                res.send({val:true,id:email._id})
            }
        }
    }
    catch (err) {
        console.log(err)
    }
})
app.post('/doctorsignup', async (req, res) => {
    

    try {
        pass = req.body.password;
        console.log(pass)
        hpass = await bcrypt.hash(pass, 10);
        console.log(hpass)
        const database = db.getDb().db("Hackathon")
        await database.collection("doctor").insertOne({
            email: req.body.email,
            password: hpass,
            name: req.body.name,
            gender: req.body.gender,
            specality: req.body.specality,
            ts1: 0,
            ts2: 0,
            ts3: 0,
            url:req.body.img
        })
        res.send({val:true})
    }
    catch (err) {
        console.log(err)
        res.send({ error: err.message })
    }
})
app.post("/doctorlogin", async (req, res) => {
    
    try {
        const database = db.getDb().db("Hackathon")
        email = await database.collection("doctor").findOne({ email: req.body.email })
        if (!email) {
            res.send({val:false})
        }
        else {
            const matchPassword = await bcrypt.compare(req.body.password, email.password)
            if (!matchPassword) {
                res.send({val:false})
            }
            else {
                res.send({val:true,id:email._id})
            }
        }
    }
    catch (err) {
        console.log(err)
    }
})
app.get("/specalists", async (req, res) => {
    try{
        const database = db.getDb().db('Hackathon')
        const spe = await database.collection('doctor').find().toArray()
        
        lst = []
        d = {}
        for(let i=0;i<spe.length;i++){
            if (!lst.includes(spe[i].specality)) {
                lst.push(spe[i].specality)
            }
        }
        
        res.send(lst)
    }
    catch(err){
        console.log(err)
        res.send(err)
    }
})
app.post('/doctorslist',async(req,res)=>{
    
    try{    
        const database = db.getDb().db('Hackathon')
        const doctorlist = await database.collection('doctor').find({specality
            :req.body.cat}).toArray();
        lst = []
        
        for (let i = 0; i < doctorlist.length; i++){
            
            if( doctorlist[i][req.body.slot]==0){
                lst.push(doctorlist[i])
            }
        }
        
        
        res.send(lst)
    }
    catch(err){
        console.log(err)
        res.send(err)
    }
})
app.post('/response', async (req, res) => {
    slot = req.body.slot
    console.log(slot)
    try {
        const database = db.getDb().db('Hackathon')
        if (slot == 'ts1') {
            await database.collection('doctor').updateOne({ _id: ObjectId(req.body.doctors._id) }, { $set: { ts1: 1 } })
            console.log("done")
        }
        else if (slot == 'ts2') {
            await database.collection('doctor').updateOne({ _id: ObjectId(req.body.doctors._id) }, { $set: { ts2 : 1 } })
            console.log("done")
        }
        else {
            await database.collection('doctor').updateOne({ _id: ObjectId(req.body.doctors._id) }, { $set: { ts3 : 1 } })
            console.log("done")
        }
        await database.collection('response').insertOne({
            doctid: ObjectId(req.body.doctors._id),
            patientid: ObjectId(req.body.id),
            status:false,
            accepted: false,
            slot: req.body.slot,
            completed: false,
            meet:""
            
        })
        console.log("send")
    }
    catch(err) {
        console.log(err)
    }
})
app.get('/patientdata/:id',async(req,res)=>{
    try {
        
        const database = db.getDb().db('Hackathon')
        const patientlist = await database.collection('patient').find({ _id: ObjectId(req.params.id) }).toArray()
        const response = await database.collection('response').find({patientid:ObjectId(req.params.id)}).toArray()
        console.log(patientlist)
        console.log(response)
        l = []
        dict = {}
        g = []
        slots = {"ts1":"10-12","ts2":"14-16","ts3":"18-20"}
        for (let i = 0; i < response.length; i++){
            const data = await database.collection('doctor').find({ _id: ObjectId(response[i].doctid )}).toArray()
            g.push(i)
            console.log(data)
            
            t = [data[0].name, data[0].specality,slots[response[i].slot], response[i].meet]
            l.push(t)
        }
        console.log(l)
        
        console.log(dict)
        console.log(g)
        res.send({ patientlist,l,g})
    }
    catch(err){
        console.log(err)
        res.send(err)
    }
})
app.get('/doctorshome/:id',async(req,res)=>{
    try {
        
        // did = req.params.id.slice(1,req.params.id.length)
        const database = db.getDb().db('Hackathon')
        const doctorlist = await database.collection('doctor').find({ _id: ObjectID(req.params.id) }).toArray()
        
        
        const doctorresponse = await database.collection('response').
        find({doctid:ObjectId(req.params.id)}).toArray()
        lst=[]
        for(let i=0;i<doctorresponse.length;i++){
            if (doctorresponse[i].status == false) {
                const patient = await database.collection('patient').find({_id:doctorresponse[i].
                    patientid
                }).toArray()
                
                lst.push(patient)

            }
        }
        s =doctorresponse[0].slot
        dict = { "ts1": "10-12", "ts2": "14-16", "ts3": "18-20" }
        s1 = dict[s]
        res.send({ doctorlist, lst, s1})
    }
    catch(err){
        console.log(err)
        res.send(err)
    }
})
app.post('/data',async(req,res)=>{
    try{
        console.log(req.body)
        const database = db.getDb().db('Hackathon')
         await database.collection('response')
             .updateOne({ $and: [{ patientid: ObjectId(req.body.pid) }, { doctid: ObjectId(req.body.did)}] },{$set:{status:req.body.status,accepted:req.body.accepted,meet:req.body.meet}})
        console.log("hi")
    }

    catch(err){
        console.log(err)
        res.send(err)
    }
})