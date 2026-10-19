import dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })
import mongoose from 'mongoose'
import { Product, ProductModel } from '../models/Product'

const MONGODB_URI = process.env.MONGODB_URI

if (!MONGODB_URI) {
  console.error('❌ MONGODB_URI non è definita nel file .env.local')
  process.exit(1)
}

const initialProducts = [
  {
    sku: 'MOT-001',
    name: 'Motore Elettrico Trifase 5.5kW',
    name_en: 'Three-Phase Electric Motor 5.5kW',
    category: 'Componenti Meccanici',
    category_en: 'Mechanical Components',
    stock: 12,
    unit: 'pz',
    description: 'Motore elettrico ad alta efficienza per nastri trasportatori e macchinari industriali.',
    description_en: 'High-efficiency electric motor for conveyor belts and industrial machinery.',
    price: 450.00,
    status: 'in_stock',
    imageUrl: '',
    reason: '',
    lastUpdated: new Date()
  },
  {
    sku: 'SEN-002',
    name: 'Sensore di Prossimità Induttivo M12',
    name_en: 'Inductive Proximity Sensor M12',
    category: 'Elettronica & Sensori',
    category_en: 'Electronics & Sensors',
    stock: 3,
    unit: 'pz',
    description: 'Sensore di rilevamento metalli con portata 4mm e connettore M12 standard.',
    description_en: 'Metal detection sensor with 4mm range and standard M12 connector.',
    price: 38.50,
    status: 'low_stock',

    imageUrl: '',
    reason: '',
    lastUpdated: new Date()
  },
  {
    sku: 'CUS-003',
    name: 'Cuscinetto a Sfera 6205-2RS',
    name_en: 'Deep Groove Ball Bearing 6205-2RS',
    category: 'Ricambi & Minuterie',
    category_en: 'Spare Parts & Hardware',
    stock: 0,
    unit: 'pz',
    description: 'Cuscinetto con tenuta stagna in gomma su entrambi i lati.',
    description_en: 'Bearing with rubber seals on both sides.',
    price: 12.90,
    status: 'out_of_stock',
    imageUrl: '',
    reason: '',
    lastUpdated: new Date()
  },
  {
    sku: 'VAL-004',
    name: 'Valvola Elettro-Pneumatica 5/2',
    name_en: 'Pneumatic Solenoid Valve 5/2',
    category: 'Pneumatica',
    category_en: 'Pneumatics',
    stock: 25,
    unit: 'pz',
    description: 'Valvola monostabile 24V DC per il controllo di cilindri a doppio effetto.',
    description_en: 'Monostable 24V DC valve for controlling double-acting cylinders.',
    price: 85.00,
    status: 'in_stock',
    imageUrl: '',
    reason: '',
    lastUpdated: new Date()
  }
]

async function seed() {
  try {
    console.log('⏳ Connessione a MongoDB Atlas in corso...')
    await mongoose.connect(MONGODB_URI!)
    console.log('✅ Connesso con successo!')

    // Svuota la collezione per evitare duplicati SKU
    await ProductModel.deleteMany({})
    console.log('🗑️ Vecchi prodotti rimossi.')

    // Inserisce i nuovi prodotti
    const createdProducts = await ProductModel.insertMany(initialProducts)
    console.log(`🚀 Inseriti con successo ${createdProducts.length} prodotti nel database!`)

    process.exit(0)
  } catch (error) {
    console.error('❌ Errore durante il seeding:', error)
    process.exit(1)
  }
}

seed()