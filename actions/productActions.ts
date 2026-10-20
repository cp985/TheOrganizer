'use server'
import { connectDB } from "@/lib/db";
import { Product, ProductModel } from "@/models/Product";
import { StockMovement, StockMovementModel } from "@/models/StockMovement";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { productSchema, FormState } from "@/lib/zodItemSchema";
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

export async function getAllMovements(): Promise<StockMovement[]> {
  try {
    await connectDB();
    
    const products = await StockMovementModel.find().sort({ createdAt: -1 }).lean();
    
    return JSON.parse(JSON.stringify(products));
  } catch (error) {
    console.error("❌ Error fetching movements:", error);
    return [];
  }
}



export type UpdateStockResult = {
  success: boolean
  message: string
} | null



export async function updateStockAction(prevState: UpdateStockResult, formData: FormData) {
  const productId = formData.get('productId') as string
  const type = formData.get('type') as 'in' | 'out'
  const quantity = Number(formData.get('quantity'))
  const reason = formData.get('reason') as string

  if (!productId || quantity <= 0) {
    return { success: false, message: 'Errore nell\'aggiornamento dello stock / Error updating stock' }
  }

  try {
    await connectDB()

    const product = await ProductModel.findById(productId)
    if (!product) {
      return { success: false, message: 'Prodotto non trovato / Item not found ' }
    }

    const stockChange = type === 'in' ? quantity : -quantity
    const newStock = product.stock + stockChange

    if (newStock < 0) {
      return { success: false, message: 'Quantità non valida / Invalid quantity' }
    }

    product.stock = newStock
    product.lastUpdated = new Date()

    if (newStock === 0) {
      product.status = 'out_of_stock'
    } else if (newStock <= 5) {
      product.status = 'low_stock'
    } else {
      product.status = 'in_stock'
    }

    await product.save()

    await StockMovementModel.create({
      productId: product._id,
      productName: product.name,
      productName_en: product.name_en,
      productSku: product.sku,
      type,
      quantity,
      reason,
    })

    revalidatePath(`/theorganizer/${productId}`)
    revalidatePath('/theorganizer', "layout")
    revalidatePath('/admin', "layout")
    revalidatePath("/admin/stockmovements","page")

    return { 
      success: true, 
      message: `Movimento registrato! / Movement registered!` 
    }

  } catch (error) {
    console.error('Errore durante la registrazione del movimento:', error)
    return { success: false, message: 'Errore durante la registrazione del movimento / Error registering movement' }
  }
 
}


export async function deleteMovementAction(movementId: string) {
  try {
    await connectDB()
    await StockMovementModel.findByIdAndDelete(movementId)
    revalidatePath('/admin/stockmovements')
    return { success: true, message: 'Movimento cancellato con successo! / Movement deleted successfully' }
  } catch (error) {
    console.error(error)
    return { success: false, message: 'Errore durante la cancellazione del movimento / Error deleting movement' }
  }
}






export async function saveProductAction(
  productId: string | null,
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const rawData = {
    sku: formData.get('sku'),
    name: formData.get('name'),
    name_en: formData.get('name_en'),
    category: formData.get('category'),
    category_en: formData.get('category_en'),
    stock: formData.get('stock'),
    price: formData.get('price'),
    unit: formData.get('unit'),
    description: formData.get('description'),
    description_en: formData.get('description_en'),
  }

  // Validazione con Zod
  const validatedFields = productSchema.safeParse(rawData)

  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
      values: rawData, // Mantiene i valori inseriti per non perderli in caso di errore
    }
  }

  const { stock, ...restData } = validatedFields.data

  // Calcolo automatico dello status
  let status: 'in_stock' | 'low_stock' | 'out_of_stock' = 'in_stock'
  if (stock === 0) status = 'out_of_stock'
  else if (stock <= 5) status = 'low_stock'

  try {
    await connectDB()

    if (productId) {
      await ProductModel.findByIdAndUpdate(productId, {
        ...restData,
        stock,
        status,
        lastUpdated: new Date(),
      })
    } else {
      await ProductModel.create({
        ...restData,
        stock,
        status,
      })
    }

    revalidatePath('/theorganizer', 'layout')
  } catch (error: any) {
    console.error('Errore salvataggio:', error)
    return {
      success: false,
      errors: {},
      values: rawData,
      message: error.code === 11000 ? 'SKU già esistente / SKU already exists' : 'Errore del server',
    }
  }

  redirect('/theorganizer')
}