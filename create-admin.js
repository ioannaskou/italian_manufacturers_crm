const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
require('dotenv').config();

// Define User Schema directly in this script
const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ['Admin', 'Sales', 'Viewer'], required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  status: { type: String, enum: ['active', 'inactive'], default: 'active' }
}, {
  collection: "users",
  timestamps: true
});

const User = mongoose.model('User', UserSchema);

async function createAdmin() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Delete existing admin user
    await User.deleteOne({ email: 'admin@italiancrm.com' });
    console.log('🗑️  Deleted old admin user (if existed)');

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash('password123', salt);

    // Create new admin user
    const admin = new User({
      email: 'admin@italiancrm.com',
      passwordHash: passwordHash,
      role: 'Admin',
      firstName: 'Admin',
      lastName: 'User',
      status: 'active'
    });

    await admin.save();
    console.log('\n🎉 Admin user created successfully!');
    console.log('📧 Email: admin@italiancrm.com');
    console.log('🔑 Password: password123');
    console.log('🔐 Password Hash:', passwordHash);
    console.log('\n✅ You can now login!');

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    await mongoose.connection.close();
    process.exit(1);
  }
}

createAdmin();