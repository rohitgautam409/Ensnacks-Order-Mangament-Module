const express = require('express');
const connectDB  = require('./src/config/db');
require('dotenv').config();
const cors = require('cors')
const authRoutes  = require('./src/routes/auth.routes');
const errorMiddleware = require('./src/middleware/error.middleware')



const app = express();
const PORT  = process.env.PORT || 5000;

app.use(cors({
    origin : process.env.FRONTEND_URL || 'http://localhost:3000'
}))
app.use(express.json());
app.use(express.urlencoded({extended : true}));

app.use('/api/auth',authRoutes);
app.use(errorMiddleware);

app.get('/health',(req,res)=>{
    res.status(200).json({
        'status' : 'Okay',
        "message" : "Ensacks API is running fine!"
    })
})
connectDB().then(()=>{
    app.listen(PORT,()=>{
        console.log(`🚀 Server is running on port ${PORT}`);
    })
})