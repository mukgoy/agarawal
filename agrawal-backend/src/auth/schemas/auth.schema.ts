
import * as mongoose from 'mongoose';

export const AuthSchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: String,
  googleId: String,
  role: String,
});