// 1. Database Models
const mongoose = require( 'mongoose');
const userSchema = new mongoose.Schema ({
    username: { type: String, required: true, unique: true },
passwordHash: { type: String, required: true },
role:{ type: String, enum: ['admin','doctor','patient'], required: true },
});
const User = mongoose.model('User', userSchema);
const appointmentSchema = new mongoose.schema({
    patient: { type: mongoose.schema.types.ObjectId, ref : 'User', required: true },
    doctor: { type: mongoose.schema.types.ObjectId, ref: 'User', required: true },
    dateTime: { type: Date, required: true },
    symptoms: { type: String },
    fees: { type: number},
    prescription: {  type: String },
    isDiagnosisDone: { type: boolean},

});
const Appointment = mongoose.model ('Appointment',  appointmentSchema);

//2.Routes and Operations 
const express = require ('express');
const router = express.Router();
router.post ('/login',async (req,res) => {
    const { username,password } = req.body;

});

router.post ('/register',async (req,res) =>{
    const { username,password,role } = req.body;

});

//Admin Routes
router.get ('/users', async (req,res) => {
    const users = await User.find();
    res.json(users);
});
router.post ('/users',async (req,res) =>{
    const { username,password,role } = req.body;

});

//Doctor Routes
router.get ('/doctors/:doctorId/appointments',async (req,res) => {
    const { doctorId } = req.params;
    const appointments = await Appointment.find({ doctor doctorId });
    res.json(appointments) ;

});
router.put ('/appointments/appointmentsId', async (req,res) => {
    const { appointmentId } = req.params;
    const { prescription  } = req.body;
    await Appointment.findByAndUpdate(appointmentId,{ prescription } );
    res.json({ message: 'Appointment updated'});

})

//Patient routes
router.get('/patients/:patientId/appointmeents', async (req,res) => {
    const { patientId } = req.params;
    const appointments = await Appointment.find({ patient: patientId });
    res.json(appointments);
});
router.post ('/appointments', async (req,res) => {
    const { patient, doctor, dateTime, symptoms } = req.body;
});

// 3. Appointment Deletion Request & auto processing
   const redis = require ('redis');
   const redisClient = redis.createClient ();
   const addDeletionRequest = (appointmentId) => {
    redisClient.sadd('deletionRequests',appointmentId);

   };

   const cron = require ('node-cron');
   cron.schedule('0 * * * *',async () => {
    const appointmentId = await
   redisClient.smembers('deletionRequest');
   await Appointment.DeleteMany({_id: { $in: appointmentIds }});
   await redisClient.srem('deletionRequest',  appointmentIds );
});
//4.admin request generation
const json2csv = require ('json2csv');
const generateAdminReport = async () => {
    
};

//5. Authentication & security
 const bcrypt = require ('bcrypt');
    const hashPassword = async (password) => {
    const saltRounds = 10;
    const hash = await bcrypt.hash(password, saltRounds);
    return hash;
 };

 const jwt = require ('jsonwebtoken');
 const generatejwttoken = (userId) => {
    const token = jwt.sign ({ userId},'your-jwt-secret',{expiresIn:'1h'});
    return token;
}; 
const verifyjwtToken = (token) =>{
    try {
        const decoded = jwt.verify(token, 'yourjwt-secret');
    } catch (err) {
        return null;
    }
};



