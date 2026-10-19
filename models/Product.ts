import mongoose, { Schema, Document, Model } from 'mongoose'

export interface Product {
  _id: string
  sku: string
  name: string
  name_en: string
  category: string
  category_en: string
  stock: number
  unit: string
  description: string
  description_en: string
  price: number
  status: 'in_stock' | 'low_stock' | 'out_of_stock'
  imageUrl?: string
  reason?: string
  lastUpdated: string | Date
}

interface ProductDocument extends Document {
  sku: string
  name: string
  name_en: string
  category: string
  category_en: string
  stock: number
  unit: string
  description: string
  description_en: string
  price: number
  status: 'in_stock' | 'low_stock' | 'out_of_stock'
  imageUrl?: string
  reason?: string
  lastUpdated: Date
}

const ProductSchema = new Schema<ProductDocument>(
  {
    sku: { type: String, required: true, unique: true, trim: true },
    name: { type: String, required: true, trim: true },
    name_en: { type: String, default: '', trim: true },
    category: { type: String, required: true, trim: true },
    category_en: { type: String, default: '', trim: true },
    stock: { type: Number, required: true, min: 0, default: 0 },
    unit: { type: String, required: true, default: 'pz', trim: true },
    description: { type: String, default: '', trim: true },
    description_en: { type: String, default: '', trim: true },
    price: { type: Number, required: true, min: 0, default: 0 },
    status: { type: String, enum: ['in_stock', 'low_stock', 'out_of_stock'], default: 'in_stock' },
    imageUrl: { type: String, default: '' },
    reason: { type: String, default: '', trim: true },
    lastUpdated: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
)

export const ProductModel: Model<ProductDocument> =
  mongoose.models.Product || mongoose.model<ProductDocument>('Product', ProductSchema)