const express = require('express');
const bodyParser = require ('body-parser');
const cors = require("cors")
const app = express();
const mysql = require('mysql');

const db=mysql.createPool({
    host:'localhost',
    user:'root',
    password:'senuri1324',
    database:'oneway',

});
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true})); 

//driver register
app.post("/api/Driverregister",(req,res) => {
    
    const password = req.body.password;
    const email = req.body.email;
    const name = req.body.name;
    const address = req.body.address;
    const phone = req.body.phone;
    const sqlSelect = "INSERT INTO driver (Name,email,password, address, phone) VALUES (?,?,?,?,?);"
    db.query(sqlSelect,[name, email,password,address,phone], (err,result)=>{
        res.send(result);
    })    
});
//Driver login account details gather
app.post("/api/Driverlogin",(req,res) => {

    const password = req.body.password;
    const email = req.body.email;

    const sqlSelect = "SELECT ID, password, email FROM driver WHERE password=? AND email=?;"
    db.query(sqlSelect,[password,email], (err,result)=>{
        res.send(result);
    })    
});

//Passanger login account details gather
app.post("/api/Passangerlogin",(req,res) => {

    const password = req.body.password;
    const email = req.body.email;

    const sqlSelect = "SELECT ID, password, email FROM passanger WHERE password=? AND email=?;"
    db.query(sqlSelect,[password,email], (err,result)=>{
        res.send(result);
    })    
});
//Passanger register
app.post("/api/Passangerregister",(req,res) => {
    
    const password = req.body.password;
    const email = req.body.email;
    const name = req.body.name;
    const address = req.body.address;
    const phone = req.body.phone;
    console.log(name, email,password,address,phone)
    const sqlSelect = "INSERT INTO passanger (Name,email,password, address, phone) VALUES (?,?,?,?,?);"
    db.query(sqlSelect,[name, email,password,address,phone], (err,result)=>{
        res.send(result);
    })    
});
//Passanger account Update Personal details
app.post("/api/updatePassangerPersonalDetails",(req,res) => {
    const passangerID = req.body.passangerID; 
    const FullName=req.body.FullName;
    const PermanentAddress=req.body.PermanentAddress;
    const Email=req.body.Email;
    const Phone=req.body.Phone;
    const sqlSelect = "UPDATE passanger SET Name = ? , email = ? , address = ? , phone = ?  WHERE ID = ?;"
    db.query(sqlSelect,[FullName,Email,PermanentAddress,Phone,passangerID], (err,result)=>{
        res.send(result);
    })    
});
//driver account details gather
app.post("/api/driverAcc",(req,res) => {
    const driverID = req.body.driverID;
    const sqlSelect = "SELECT * FROM driver WHERE ID=?"
    db.query(sqlSelect,[driverID], (err,result)=>{
        res.send(result);
    })    
});

app.post("/api/vehicleDetails",(req,res) => {

    const driverID = req.body.driverID;
    const sqlSelect = "SELECT * FROM vehicle WHERE driverID=?;"
    db.query(sqlSelect,[driverID], (err,result)=>{
        res.send(result);
    })
    
});

app.post("/api/TravelDetails",(req,res) => {
    const driverID = req.body.driverID; 
    const sqlSelect = "SELECT td.id, v.type,td.date,td.From,td.To,td.discription,td.gMapID,COUNT(passangerID) AS NumberOfBookedpassanger,v.numOfPassengers From driver d INNER JOIN vehicle v ON d.ID=v.driverID INNER JOIN vehicletraveldetails vtd ON v.id = vtd.vehicleID INNER JOIN traveldetails td ON  vtd.travelDetailsID = td.id LEFT JOIN passangertravelsdetails ptd ON ptd.travelDetailsID = td.id WHERE d.ID=? GROUP BY td.id;"
    db.query(sqlSelect,[driverID] ,(err,result)=>{
        res.send(result);
    })    
});

app.post("/api/selectvahicle",(req,res) => {
    const driverID = req.body.driverID; 
    const sqlSelect = "SELECT id,type FROM vehicle WHERE driverID=?;"
    db.query(sqlSelect,[driverID] ,(err,result)=>{
        res.send(result);
    })
    
});

//driver account details gather
app.post("/api/PassangerAcc",(req,res) => {
    const passangerID = req.body.passangerID;
    const sqlSelect = "SELECT * FROM passanger WHERE ID=?"
    db.query(sqlSelect,[passangerID], (err,result)=>{
        res.send(result);
    })    
});

//driverACC vehicle details storing

app.post("/api/insertvehidetails",(req,res) => {
    
    const ID = req.body.ID;
    const driverID=req.body.driverID;
    const type = req.body.type;
    const numOfPassengers = req.body.numOfPassengers;
    
    const sqlSelect = "INSERT INTO vehicle (id, driverID, type, numOfPassengers) VALUES (? , ? , ?, ?);"
    db.query(sqlSelect,[ID ,driverID, type,numOfPassengers], (err,result)=>{
        res.send(result);
    })    
});

//driverACC delete vehi details
app.post("/api/deletevehidetails",(req,res) => {
    const driverID=req.body.driverID;
    const vehicleID=req.body.vehicleID;
    const sqlSelect = "DELETE FROM vehicle WHERE id=? AND driverID = ?;"
    db.query(sqlSelect,[vehicleID,driverID], (err,result)=>{
        res.send(result);
    })    
});

//driverACC delete travel details
app.post("/api/deletedrivertraveldetails",(req,res) => {
    const driverID=req.body.driverID;
    const travelID=req.body.travelID;
    const sqlSelect = "DELETE FROM vehicle WHERE id=? AND driverID = ?;"
    db.query(sqlSelect,[travelID,driverID], (err,result)=>{
        res.send(result);
    })    
});

//driverACC travel details storing

app.post("/api/UpdateVehicleTravelDetails",(req,res) => {
    
    const vehicleID = req.body.vehicleID;
    const ID = req.body.ID;    

    const sqlSelect = "INSERT INTO vehicletraveldetails (vehicleID, travelDetailsID) VALUES (?, ?);"
    db.query(sqlSelect,[vehicleID,ID], (err,result)=>{
        res.send(result);
    })     
});
app.post("/api/insertupdatetraveldetails",(req,res) => {
    
    const ID = req.body.ID;
    const DateAndTime = req.body.DateAndTime;
    const From = req.body.From;
    const To = req.body.To;
    const Discription = req.body.Discription;
    const gMapID = req.body.gMapID;

    const sqlSelect = "INSERT INTO traveldetails (`id`,`Date`, `from`, `to`, `discription`, `gMapID`) VALUES (?,?, ?, ?, ?, ?);"
    db.query(sqlSelect,[ID,DateAndTime,From,To,Discription,gMapID], (err,result)=>{
        res.send(result);
    })     
});

//driverACC Bookers details gather
app.post("/api/SelectBookers",(req,res) => {
    const driverID=req.body.driverID;
    const sqlSelect = "SELECT v.type,td.id,td.from,td.to,p.ID,p.Name,p.email,p.address,p.phone FROM passanger p INNER JOIN passangertravelsdetails ptd ON p.ID=ptd.passangerID INNER JOIN traveldetails td ON ptd.travelDetailsID = td.id INNER JOIN vehicletraveldetails vtd ON td.id = vtd.travelDetailsID INNER JOIN vehicle v ON vtd.vehicleID = v.id WHERE driverID = ?;"
    db.query(sqlSelect,[driverID],(err,result)=>{
        res.send(result);
    })
});

//driverACC comments details gather
app.post("/api/selectcomments",(req,res) => {
    const driverID=req.body.driverID;
    const sqlSelect = "SELECT p.name,Comments FROM passanger p INNER JOIN passangertravelsdetails ptd ON p.id = ptd.passangerID INNER JOIN traveldetails td ON td.id = ptd.travelDetailsID INNER JOIN vehicletraveldetails vtd ON vtd.travelDetailsID = td.id INNER JOIN vehicle v ON v.id = vtd.vehicleID INNER JOIN  Driver d ON d.id = v.driverID WHERE d.id = ?;"
    db.query(sqlSelect,[driverID], (err,result)=>{
        res.send(result);
    })
    
});
//driverACC numberOFratings gather
app.post("/api/setnumberOFRatings",(req,res) => {
    const sqlSelect = "SELECT SUM(ratings) AS numberOFRatings From driver;"
    db.query(sqlSelect, (err,result)=>{
        res.send(result);
    })    
});

//driverACC update Driver PersonalDetails
app.post("/api/updateDriverPersonalDetails",(req,res) => {
    const driverID=req.body.driverID;
    const FullName=req.body.FullName;
    const PermanentAddress=req.body.PermanentAddress;
    const Email=req.body.Email;
    const Phone=req.body.Phone;
    const sqlSelect = "UPDATE driver SET Name = ? , email = ? , address = ? , phone = ?  WHERE ID = ?;"
    db.query(sqlSelect,[FullName,Email,PermanentAddress,Phone,driverID], (err,result)=>{
        res.send(result);
    })    
});

//home first table details gather
app.post("/api/BookingDetails",(req,res) => {
    const passangerID=req.body.passangerID;
    const id = 0;
    const sqlSelect = "SELECT d.Name,d.email,d.phone,ptd.passangerID,ptd.travelDetailsID,v.type,td.date,td.from,td.To,td.discription,ptd.dateAndTimeOfBooking FROM passanger p INNER JOIN passangertravelsdetails ptd ON p.id = ptd.passangerID INNER JOIN traveldetails td ON td.id = ptd.travelDetailsID INNER JOIN vehicletraveldetails vtd ON vtd.travelDetailsID = td.id INNER JOIN vehicle v ON v.id = vtd.vehicleID INNER JOIN driver d ON v.driverID = d.id WHERE p.id = ?;"
    db.query(sqlSelect,[passangerID], (err,result)=>{
        res.send(result);
    })    
});

app.post("/api/deletepassangerTravelDetails",(req,res) => {
    const TravelDetailID=req.body.TravelDetailID;
    const passangerID=req.body.passangerID;
    const sqlSelect = "DELETE FROM passangertravelsdetails WHERE travelDetailsID=? AND passangerID=?;"
    db.query(sqlSelect,[TravelDetailID,passangerID], (err,result)=>{
        res.send(result);
    })    
});

//home second table details gather

app.post("/api/routingDetails",(req,res) => {
    const sqlSelect = "SELECT v.type,td.date,td.From,td.To,td.discription,td.id,td.gMapID,d.phone,COUNT(passangerID) AS NumberOfBookedpassanger,v.numOfPassengers From driver d INNER JOIN vehicle v ON d.ID=v.driverID INNER JOIN vehicletraveldetails vtd ON v.id = vtd.vehicleID INNER JOIN traveldetails td ON  vtd.travelDetailsID = td.id LEFT JOIN passangertravelsdetails ptd ON ptd.travelDetailsID = td.id GROUP BY td.id;"
    db.query(sqlSelect, (err,result)=>{
        res.send(result);
    })
    
});

//home booking travels
app.post("/api/bookingTravelDetails",(req,res) => {

    const TravelDetailID=req.body.TravelDetailID;
    const PassangerID=req.body.PassangerID;
    const sqlSelect = "INSERT INTO passangertravelsdetails (passangerID, travelDetailsID) VALUES (?, ?);"
    db.query(sqlSelect,[PassangerID,TravelDetailID], (err,result)=>{
        res.send(result);
    })    
});

app.post("/api/vehicleIDCalculate",(req,res) => {
    const sqlSelect = "SELECT id FROM vehicle WHERE id=(SELECT max(id) FROM vehicle);"
    db.query(sqlSelect, (err,result)=>{
        res.send(result);
    })    
});

app.post("/api/traveldetailsIDCalculate",(req,res) => {
    const sqlSelect = "SELECT id FROM traveldetails WHERE id=(SELECT max(id) FROM traveldetails);"
    db.query(sqlSelect, (err,result)=>{
        res.send(result);
    })    
});


app.listen(3001, ()=> {
    console.log('running on port 3001');
});