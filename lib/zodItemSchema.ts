import { z } from 'zod'


export const productSchema = z.object({
  sku: z.string().min(1, { message: 'sku non valido / invalid sku' }),
  name: z.string().min(1, { message: 'nome non valido / invalid name' }),
  name_en: z.string().min(1, { message: 'nome en non valido / invalid english name' }),
  category: z.string().min(1, { message: 'categoria non valida / invalid category' }),
  category_en: z.string().min(1, { message: 'categoria en non valida / invalid english category' }),
  imageUrl: z.string().min(1,{message:'Url immagine non valido / Invalid URL'}),
  stock: z.coerce.number().min(0, { message: 'stock non valido / invalid stock' }),
  price: z.coerce.number().min(0, { message: 'prezzo non valido / invalid price' }),
  unit: z.string().min(1, { message: 'unità non valida / invalid unit' }),
  description: z.string().min(1, { message: 'descrizione non valida / invalid description' }),
  description_en: z.string().min(1, { message: 'descrizione en non valida / invalid english description' }),
})

// Tipo derivato dei dati validati
export type ProductFormValues = z.infer<typeof productSchema>

// Tipo strutturato per lo stato del form (con errori per campo e valori grezzi)
export interface FormState {
  success: boolean;
  errors?: Partial<Record<keyof ProductFormValues, string[]>>;
  values?: Partial<Record<keyof ProductFormValues, any>>;
  message?: string;
}
