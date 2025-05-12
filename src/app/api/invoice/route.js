import { connectionStr } from '@/app/lib/db'
import { OrderSchema } from '@/app/lib/orderModel'
import mongoose from 'mongoose'
import { NextResponse } from 'next/server'

// export async function GET() {
//   await mongoose.connect(connectionStr)
//   const orders = await OrderSchema.find()
//   return NextResponse.json({ result: orders })
// }

export async function GET() {
  await mongoose.connect(connectionStr)

  const orders = await OrderSchema.find({ billedStatus: true })

  return NextResponse.json({ result: orders })
}

// export async function POST(req) {
//   await mongoose.connect(connectionStr)
//   const payload = await req.json()

//   // Generate unique order number
//   const orderNumber = 'JM-' + Date.now()

//   // Attach order number to payload
//   const newOrder = new OrderSchema({ ...payload, orderNumber })

//   await newOrder.save()

//   // Return result to frontend
//   return NextResponse.json({
//     success: true,
//     orderNumber,
//     result: newOrder, // optional, for debugging
//   })
// }
