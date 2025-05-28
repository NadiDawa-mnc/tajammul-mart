import { connectionStr } from '@/app/lib/db'
import { OrderSchema } from '@/app/lib/orderModel'
import mongoose from 'mongoose'
import { NextResponse } from 'next/server'

export async function GET(req) {
  await mongoose.connect(connectionStr)

  const { searchParams } = new URL(req.url)

  const query = {}

  // Optional filters from query string
  if (searchParams.has('campus')) {
    query.campus = searchParams.get('campus')
  }

  if (searchParams.has('paymentStatus')) {
    query.paymentStatus = searchParams.get('paymentStatus')
  }

  if (searchParams.has('deliveryStatus')) {
    query.deliveryStatus = searchParams.get('deliveryStatus')
  }

  if (searchParams.has('billedStatus')) {
    query.billedStatus = searchParams.get('billedStatus') === 'true'
  }

  // Filter by item name in cartItems array
  if (searchParams.has('itemName')) {
    query['cartItems.name'] = searchParams.get('itemName')
  }

  const orders = await OrderSchema.find(query)

  return NextResponse.json({ result: orders })
}
