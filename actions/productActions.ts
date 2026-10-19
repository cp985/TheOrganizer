'use server'
import { connectDB } from "@/lib/db";
import { Product, ProductModel } from "@/models/Product";
import { StockMovement, StockMovementModel } from "@/models/StockMovement";
import { revalidatePath } from "next/cache";

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

export type UpdateStockResult = {
  success: boolean
  message: string
} | null

// export async function updateStockAction(prevState: UpdateStockResult, formData: FormData) {
//   const productId = formData.get('productId') as string
//   const type = formData.get('type') as string 
//   const quantity = Number(formData.get('quantity'))
//   const reason = formData.get('reason') as string
//   if (!productId || quantity <= 0) {
//     return { success: false, message: 'Dati non validi o quantità non valida' }
//   }

//   try {
//     await connectDB()

//     const product = await ProductModel.findById(productId)
//     if (!product) {
//       return { success: false, message: 'Prodotto non trovato nel database' }
//     }

//     const stockChange = type === 'in' ? quantity : -quantity
//     const newStock = product.stock + stockChange

//     if (newStock < 0) {
//       return { success: false, message: 'Giacenza insufficiente per completare lo scarico' }
//     }

//     product.stock = newStock
//     product.lastUpdated = new Date()
//     product.reason= reason

//     if (newStock === 0) {
//       product.status = 'out_of_stock'
//     } else if (newStock <= 5) {
//       product.status = 'low_stock'
//     } else {
//       product.status = 'in_stock'
//     }
// console.log('Updated Product:', product)
//     await product.save()

//     revalidatePath(`/theorganizer/${productId}`)
//     revalidatePath('/theorganizer')

//     return { 
//       success: true, 
//       message: `Movimento registrato con successo! Nuova giacenza: ${newStock} ${product.unit}` 
//     }

//   } catch (error) {
//     console.error('Errore MongoDB:', error)
//     return { success: false, message: 'Errore di connessione o salvataggio sul database' }
//   }
// }

export async function updateStockAction(prevState: UpdateStockResult, formData: FormData) {
  const productId = formData.get('productId') as string
  const type = formData.get('type') as 'in' | 'out'
  const quantity = Number(formData.get('quantity'))
  const reason = formData.get('reason') as string

  if (!productId || quantity <= 0) {
    return { success: false, message: 'Dati non validi o quantità errata' }
  }

  try {
    await connectDB()

    // 1. Cerca il prodotto
    const product = await ProductModel.findById(productId)
    if (!product) {
      return { success: false, message: 'Prodotto non trovato' }
    }

    // 2. Calcola la nuova giacenza
    const stockChange = type === 'in' ? quantity : -quantity
    const newStock = product.stock + stockChange

    if (newStock < 0) {
      return { success: false, message: 'Giacenza insufficiente per effettuare lo scarico' }
    }

    // 3. Aggiorna il prodotto
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

    // 4. Registra la transazione nello storico movimenti
    await StockMovementModel.create({
      productId: product._id,
      productName: product.name,
      productSku: product.sku,
      type,
      quantity,
      reason,
    })

    revalidatePath(`/theorganizer/${productId}`)
    revalidatePath('/theorganizer')
    revalidatePath('/theorganizer/admin/movements')

    return { 
      success: true, 
      message: `Movimento registrato! Nuova giacenza: ${newStock} ${product.unit}` 
    }

  } catch (error) {
    console.error('Errore durante la registrazione del movimento:', error)
    return { success: false, message: 'Errore durante il salvataggio nel database' }
  }
}
