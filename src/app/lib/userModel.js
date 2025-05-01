import mongoose from 'mongoose'

const userModel = new mongoose.Schema({
  username: String,
  password: String,
})

export const User = mongoose.models.User || mongoose.model('User', userModel)
