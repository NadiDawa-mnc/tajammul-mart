import { connectionStr } from '@/app/lib/db'
import mongoose from 'mongoose'
import { NextResponse } from 'next/server'
import { Product } from '@/app/lib/productModel'

export async function GET() {
  await mongoose.connect(connectionStr)

  const products = await Product.find()

  return NextResponse.json({
    result: products,
    success: true,
  })
}

export async function POST(req) {
  await mongoose.connect(connectionStr)
  const payload = await req.json()
  console.log(payload) // Check what the payload looks like
  let product = new Product(payload)
  await product.save()
  return NextResponse.json({ result: payload })
}
