/**
 * Script to seed the initial admin and client users

 */
require('dotenv').config();
const mongoose = required('mongoose');
const User = require('./src/models/user.models');
const connectDB = require('./src/config/db');

const seedUsers = async ()=>{
    try{
        await connectDB();

        //Delete existing users
        await User.deleteMany();
        console.log('Existing users deleted');

        //create admin user
        const adminUser = new User({
            name : 'Ensnacks Admin',
            email : 'admin@ensnacks.com',
            password : 'admin123',
            role : 'admin',
            companyName : 'Ensnacks'
        });
        await adminUser.save();
        console.log('Created admin user : admin@ensnacks.com');

        //Create client user
        const clientUser = new User({
            name : 'Rahul Mehta',
            email : 'rahul@acmecorp.com',
            password : 'Client@123',
            role : 'client',
            companyName : 'Acme Corporation'
        })
        await clientUser.save();
        console.log('Created client user : rahul@acmecorp.com');
        console.log('Seeding Completed successfully!');
        process.exit(0);
    }catch(error){
        console.error('Error seeding users :',error);
        process.exit(1);
    }
}