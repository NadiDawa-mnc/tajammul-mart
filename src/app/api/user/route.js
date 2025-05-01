import mongoose from 'mongoose'
import { connectionStr } from '@/app/lib/db'
import { NextResponse } from 'next/server'
import { User } from '@/app/lib/userModel'

export async function GET() {
  await mongoose.connect(connectionStr)
  const users = await User.find()

  return NextResponse.json({ result: users })
}

export async function POST(req) {
  const payload = await req.json()
  let success = false
  await mongoose.connect(connectionStr)
  let result = await User.findOne({
    username: payload.username,
    password: payload.password,
  })

  if (result) {
    success = true
  }

  return NextResponse.json({ result, success })
}

// export async function POST(req) {
//   await mongoose.connect(connectionStr)
//   const payload = await req.json()
//   console.log(payload) // Check what the payload looks like
//   let product = new Product(payload)
//   await product.save()
//   return NextResponse.json({ result: payload })
// }
