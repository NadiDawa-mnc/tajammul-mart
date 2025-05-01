import mongoose from 'mongoose'

const productModel = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  img: String,
  stock: String,
})

// Prevent model overwrite errors in development
export const Product =
  mongoose.models.Product || mongoose.model('Product', productModel)
