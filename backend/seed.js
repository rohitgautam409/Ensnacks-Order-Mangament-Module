/**
 * Script to seed initial admin and client users
 */
require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./src/models/User');
const connectDB = require('./src/config/db')

const seedUsers = async () => {
  try {
    await connectDB();

    // Delete existing users
    await User.deleteMany();
    console.log('Cleared existing users');

    // Create admin
    const admin = new User({
      name: 'Ensnacks Admin',
      email: 'admin@ensnacks.com',
      password: 'Admin@123',
      role: 'admin',
      companyName: 'Ensnacks'
    });
    await admin.save();
    console.log('✅ Created admin user: admin@ensnacks.com');

    // Create client
    const client = new User({
      name: 'Rahul Mehta',
      email: 'rahul@acmecorp.com',
      password: 'Client@123',
      role: 'client',
      companyName: 'Acme Corp'
    });
    await client.save();
    console.log('✅ Created client user: rahul@acmecorp.com');

    console.log('Seeding complete.');
    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
};

seedUsers();
