import mongoose, { Schema, Document, Model } from 'mongoose'

export interface StockMovement {
  _id?: string
  productId: mongoose.Types.ObjectId | string
  productName: string
  productSku: string
  type: 'in' | 'out'
  quantity: number
  reason: string
  createdAt?: Date
}

interface StockMovementDocument extends Document {
  productId: mongoose.Types.ObjectId
  productName: string
  productSku: string
  type: 'in' | 'out'
  quantity: number
  reason: string
  createdAt: Date
}

const StockMovementSchema = new Schema<StockMovementDocument>(
  {
    productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    productName: { type: String, required: true },
    productSku: { type: String, required: true },
    type: { type: String, enum: ['in', 'out'], required: true },
    quantity: { type: Number, required: true, min: 1 },
    reason: { type: String, required: true, trim: true },
  },
  {
    timestamps: true, 
  }
)

export const StockMovementModel: Model<StockMovementDocument> =
  mongoose.models.StockMovement || mongoose.model<StockMovementDocument>('StockMovement', StockMovementSchema)