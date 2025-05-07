import { connectionStr } from '@/app/lib/db'
import { OrderSchema } from '@/app/lib/orderModel'
import mongoose from 'mongoose'
import { NextResponse } from 'next/server'

export async function PUT(req, { params }) {
  await mongoose.connect(connectionStr)

  const { id } = params
  const payload = await req.json()

  try {
    const updatedOrder = await OrderSchema.findByIdAndUpdate(
      id,
      { $set: payload },
      { new: true }
    )

    if (!updatedOrder) {
      return NextResponse.json(
        { success: false, message: 'Order not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      result: updatedOrder,
    })
  } catch (error) {
    console.error('Error updating order:', error)
    return NextResponse.json(
      { success: false, message: 'Update failed' },
      { status: 500 }
    )
  }
}
