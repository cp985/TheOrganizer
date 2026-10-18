import { connectDB } from "@/lib/db";
import { Product, ProductModel } from "@/models/Product";

export async function getAllProducts(): Promise<Product[]> {
  try {
    await connectDB();
    
    const products = await ProductModel.find().sort({ name: -1 }).lean();
    
    return JSON.parse(JSON.stringify(products));
  } catch (error) {
    console.error("❌ Error fetching products:", error);
    return [];
  }
}