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
export async function DELETE(_request, { params }) {
  const { id } = await params

  await mongoose.connect(connectionStr)

  try {
    const deletedOrder = await OrderSchema.findByIdAndDelete(id)

    if (!deletedOrder) {
      return NextResponse.json(
        { success: false, message: 'Order not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(
      { success: true, data: deletedOrder },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    )
  }
}
