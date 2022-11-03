import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: { type: String, reqired: true },
    email: { type: String, reqired: true, unique: true },
    password: { type: String, reqired: true },
    isAdmin: { type: String, reqired: true, default: false },
  },
  {
    timestamps: true,
  }
);

const user = mongoose.models.User || mongoose.model('User', userSchema);

export default user;
