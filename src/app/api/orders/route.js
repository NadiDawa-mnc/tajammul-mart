import { connectionStr } from '@/app/lib/db'
import { OrderSchema } from '@/app/lib/orderModel'
import mongoose from 'mongoose'
import { NextResponse } from 'next/server'

export async function GET() {
  await mongoose.connect(connectionStr)
  const orders = await OrderSchema.find()
  return NextResponse.json({ result: orders })
}

export async function POST(req) {
  await mongoose.connect(connectionStr)
  const payload = await req.json()
  console.log(payload) // Check what the payload looks like
  let order = new OrderSchema(payload)
  await order.save()
  return NextResponse.json({ result: payload })
}
