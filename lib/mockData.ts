// lib/mockData.ts

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
  lastUpdated: string
}

export const MOCK_PRODUCTS: Product[] = [
  {
    _id: 'prod_6701a01',
    sku: 'MOT-IND-01',
    name: 'Motore Elettrico Trifase 5.5kW',
    name_en: 'Three-phase electric motor 5.5kW',
    category: 'Elettromeccanica',
    category_en: 'Electromechanical',
    stock: 14,
    unit: 'pz',
    description:'descrizione ita descrizione ita descrizione ita descrizione ita descrizione ita vdescrizione ita',
    description_en:'description eng description eng description eng description eng description eng description eng ',
    price: 340.00,
    status: 'in_stock',
    imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=300&q=80',
    lastUpdated: '2026-10-15'
  },
  {
    _id: 'prod_6701a02',
    sku: 'SEN-IND-02',
    name: 'Sensore di Pressione Analogico 0-10 Bar',
    name_en: 'Analog Pressure Sensor 0-10 Bar',
    category: 'Elettronica & Sensori',
    category_en:'Electronics & Sensors',
    stock: 3,
    unit: 'pz',
    description:'descrizione ita descrizione ita descrizione ita descrizione ita descrizione ita vdescrizione ita',
    description_en:'description eng description eng description eng description eng description eng description eng ',
    price: 85.50,
    status: 'low_stock',
    imageUrl: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?auto=format&fit=crop&w=300&q=80',
    lastUpdated: '2026-10-16'
  },
  {
    _id: 'prod_6701a03',
    sku: 'VAL-IDR-03',
    name: 'Valvola Solenoide 2/2 Vie 24V DC',
    name_en: 'Solenoide Valve 2/2 Vie 24V DC',
    category: 'Idraulica & Pneumatica',
    category_en: 'Hydraulic & Pneumatic',
    stock: 0,
    unit: 'pz',
        description:'descrizione ita descrizione ita descrizione ita descrizione ita descrizione ita vdescrizione ita',
    description_en:'description eng description eng description eng description eng description eng description eng ',
    price: 120.00,
    status: 'out_of_stock',
    imageUrl: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=300&q=80',
    lastUpdated: '2026-10-10'
  },
  {
    _id: 'prod_6701a04',
    sku: 'CUS-MECC-04',
    name: 'Cuscinetto a Sfera ad Alta Velocità SKF 6204',
    name_en: 'SKF 6204 High Speed Ball Bearing',
    category: 'Meccanica',
    category_en: 'Mechanical',
    stock: 45,
    unit: 'pz',
        description:'descrizione ita descrizione ita descrizione ita descrizione ita descrizione ita vdescrizione ita',
    description_en:'description eng description eng description eng description eng description eng description eng ',
    price: 18.20,
    status: 'in_stock',
    imageUrl: 'https://images.unsplash.com/photo-1581092162384-8987c1d64718?auto=format&fit=crop&w=300&q=80',
    lastUpdated: '2026-10-14'
  },
  {
    _id: 'prod_6701a05',
    sku: 'PLC-AUT-05',
    name: 'Modulo I/O PLC 16 Ingressi Digitali',
    name_en: 'Digital I/O PLC Module 16 Inputs',
    category: 'Elettronica & Sensori',
    category_en:'Electronics & Sensors',
    stock: 2,
    unit: 'pz',
        description:'descrizione ita descrizione ita descrizione ita descrizione ita descrizione ita vdescrizione ita',
    description_en:'description eng description eng description eng description eng description eng description eng ',
    price: 210.00,
    status: 'low_stock',
    imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=300&q=80',
    lastUpdated: '2026-10-16'
  }
]