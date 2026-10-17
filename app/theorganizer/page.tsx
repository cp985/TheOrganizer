'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useLanguage } from '@/context/LanguageContext'
import { ThemeToggle } from '@/components/ThemeToggle'
import { LanguageToggle } from '@/components/LanguageToggle'
import { MOCK_PRODUCTS, Product } from '@/lib/mockData'
import { 
  LayoutGrid, List, Plus, Search, Package, AlertTriangle, 
  CheckCircle2, XCircle, FolderTree, ChevronRight, Filter, ArrowUpDown 
} from 'lucide-react'

export default function WarehousePage() {
  const { t, locale } = useLanguage()
  const [viewMode, setViewMode] = useState<'kanban' | 'list'>('kanban')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedStatus, setSelectedStatus] = useState<string>('all')
  const [priceSort, setPriceSort] = useState<'none' | 'asc' | 'desc'>('none')

  // Categorie uniche dinamiche in base alla lingua
  const categories = Array.from(
    new Set(MOCK_PRODUCTS.map((p) => (locale === 'en' ? p.category_en : p.category)))
  )

  // Logica di Filtro e Ordinamento ottimizzata
  const filteredProducts = MOCK_PRODUCTS.filter((product) => {
    const currentName = locale === 'en' ? product.name_en || product.name : product.name
    const currentCategory = locale === 'en' ? product.category_en : product.category

    const matchesSearch =
      currentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
      currentCategory.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory = selectedCategory ? currentCategory === selectedCategory : true
    const matchesStatus = selectedStatus === 'all' ? true : product.status === selectedStatus

    return matchesSearch && matchesCategory && matchesStatus
  }).sort((a, b) => {
    if (priceSort === 'asc') return a.price - b.price
    if (priceSort === 'desc') return b.price - a.price
    return 0
  })

  const getStatusBadge = (status: Product['status']) => {
    switch (status) {
      case 'in_stock':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
            <CheckCircle2 className="w-3 h-3" />
            {t.warehouse.inStock}
          </span>
        )
      case 'low_stock':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
            <AlertTriangle className="w-3 h-3" />
            {t.warehouse.lowStock}
          </span>
        )
      case 'out_of_stock':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20">
            <XCircle className="w-3 h-3" />
            {t.warehouse.outOfStock}
          </span>
        )
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300 flex flex-col">
      {/* Header Principale con Toggle Lingua e Tema */}
      <header className="border-b border-border bg-card/50 backdrop-blur sticky top-0 z-10 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 text-primary rounded-lg">
            <Package className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight">{t.warehouse.title}</h1>
            <p className="text-xs text-muted-foreground">{t.warehouse.subtitle}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <LanguageToggle />
          <ThemeToggle />
        </div>
      </header>

      {/* Corpo Principale */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-6 grid grid-cols-1 md:grid-cols-4 gap-6">
        
        {/* SIDEBAR: Albero Categorie */}
        <aside className="md:col-span-1 space-y-4">
          <div className="border border-border bg-card rounded-xl p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-3 pb-2 border-b border-border font-semibold text-sm">
              <FolderTree className="w-4 h-4 text-primary" />
              <span>{t.warehouse.categories}</span>
            </div>

            <nav className="space-y-1 text-sm">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                  selectedCategory === null
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                }`}
              >
                <span>{t.warehouse.allCategories}</span>
                <span className="font-mono">{MOCK_PRODUCTS.length}</span>
              </button>

              {categories.map((cat) => {
                const count = MOCK_PRODUCTS.filter((p) => {
                  const productCat = locale === 'en' ? p.category_en : p.category
                  return productCat === cat
                }).length
                
                const isSelected = selectedCategory === cat

                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                      isSelected
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 truncate pr-2">
                      <ChevronRight className={`w-3 h-3 transition-transform ${isSelected ? 'rotate-90' : ''}`} />
                      <span className="truncate">{cat}</span>
                    </div>
                    <span className="font-mono text-xs opacity-80">{count}</span>
                  </button>
                )
              })}
            </nav>
          </div>
        </aside>

        {/* CONTENUTO PRINCIPALE */}
        <main className="md:col-span-3 space-y-6">
          
     {/* Action Bar Unificata e Compatta */}
<div className="flex flex-wrap items-center gap-3 w-full bg-card border border-border rounded-xl p-3 shadow-sm">
  
  {/* Input Ricerca (flessibile) */}
  <div className="relative flex-1 min-w-[200px] sm:min-w-[240px]">
    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
    <input
      type="text"
      placeholder={t.warehouse.searchPlaceholder}
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      className="w-full pl-9 pr-3 py-2 text-xs bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors"
    />
  </div>

  {/* Select Filtro Stato */}
  <div className="relative shrink-0">
    <select
      value={selectedStatus}
      onChange={(e) => setSelectedStatus(e.target.value)}
      className="pl-8 pr-6 py-2 text-xs bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 cursor-pointer transition-colors appearance-none whitespace-nowrap"
    >
      <option value="all">{t.warehouse.allStatuses}</option>
      <option value="in_stock">{t.warehouse.inStock}</option>
      <option value="low_stock">{t.warehouse.lowStock}</option>
      <option value="out_of_stock">{t.warehouse.outOfStock}</option>
    </select>
    <Filter className="w-3.5 h-3.5 text-muted-foreground absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
  </div>

  {/* Select Ordina Prezzo */}
  <div className="relative shrink-0">
    <select
      value={priceSort}
      onChange={(e) => setPriceSort(e.target.value as 'none' | 'asc' | 'desc')}
      className="pl-8 pr-6 py-2 text-xs bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 cursor-pointer transition-colors appearance-none whitespace-nowrap"
    >
      <option value="none">{t.warehouse.sortByPrice}</option>
      <option value="asc">{t.warehouse.priceAsc}</option>
      <option value="desc">{t.warehouse.priceDesc}</option>
    </select>
    <ArrowUpDown className="w-3.5 h-3.5 text-muted-foreground absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
  </div>

  {/* Controlli Vista (Griglia / Lista) */}
  <div className="flex items-center bg-background border border-border rounded-lg p-1 shrink-0">
    <button
      onClick={() => setViewMode('kanban')}
      className={`p-1.5 rounded-md text-xs font-medium flex items-center gap-1.5 transition-colors ${
        viewMode === 'kanban'
          ? 'bg-primary text-primary-foreground shadow-sm'
          : 'text-muted-foreground hover:text-foreground'
      }`}
      title={t.warehouse.viewKanban}
    >
      <LayoutGrid className="w-4 h-4" />
      <span className="hidden md:inline">{t.warehouse.viewKanban}</span>
    </button>
    <button
      onClick={() => setViewMode('list')}
      className={`p-1.5 rounded-md text-xs font-medium flex items-center gap-1.5 transition-colors ${
        viewMode === 'list'
          ? 'bg-primary text-primary-foreground shadow-sm'
          : 'text-muted-foreground hover:text-foreground'
      }`}
      title={t.warehouse.viewList}
    >
      <List className="w-4 h-4" />
      <span className="hidden md:inline">{t.warehouse.viewList}</span>
    </button>
  </div>

  {/* Pulsante Nuovo Prodotto (Spinto a destra con ml-auto) */}
  <button className="flex items-center shrink-0 gap-2 px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:opacity-90 transition-opacity shadow-sm ml-auto">
    <Plus className="w-4 h-4" />
    <span>{t.warehouse.newProduct}</span>
  </button>

</div>

          {/* VISTA KANBAN */}
          {viewMode === 'kanban' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredProducts.map((product) => {
                const displayName = locale === 'en' ? product.name_en || product.name : product.name
                const displayCategory = locale === 'en' ? product.category_en : product.category

                return (
                  <Link href={`/theorganizer/${product._id}`} key={product._id}>
                    <div className="group border border-border bg-card rounded-xl p-4 hover:shadow-md transition-all duration-200 flex flex-col justify-between h-full">
                      <div>
                        <div className="flex items-start justify-between gap-3 mb-3">
                          {product.imageUrl ? (
                            <img
                              src={product.imageUrl}
                              alt={displayName}
                              onError={(e) => {
                                ;(e.target as HTMLElement).style.display = 'none'
                              }}
                              className="w-16 h-16 rounded-lg object-cover border border-border bg-muted shrink-0"
                            />
                          ) : (
                            <div className="w-16 h-16 rounded-lg bg-muted flex items-center justify-center shrink-0 border border-border">
                              <Package className="w-8 h-8 text-muted-foreground" />
                            </div>
                          )}
                          <div className="flex flex-col items-end">
                            {getStatusBadge(product.status)}
                            <span className="text-xs font-mono text-muted-foreground mt-2">{product.sku}</span>
                          </div>
                        </div>

                        <h3 className="font-semibold text-base group-hover:text-primary transition-colors line-clamp-1">
                          {displayName}
                        </h3>
                        <p className="text-xs text-muted-foreground mb-4">{displayCategory}</p>
                      </div>

                      <div className="border-t border-border/60 pt-3 flex items-center justify-between text-sm">
                        <div>
                          <span className="text-xs text-muted-foreground block">{t.warehouse.stock}</span>
                          <span className="font-bold text-foreground">
                            {product.stock} {product.unit}
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="text-xs text-muted-foreground block">{t.warehouse.price}</span>
                          <span className="font-bold text-primary">€ {product.price.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          )}

          {/* VISTA LISTA */}
          {viewMode === 'list' && (
            <div className="border border-border rounded-xl bg-card overflow-hidden shadow-sm">
              <div className="hidden md:grid grid-cols-12 gap-3 px-4 py-3 bg-muted/50 text-xs uppercase text-muted-foreground font-semibold items-center">
                <div className="col-span-2">{t.warehouse.sku}</div>
                <div className="col-span-3">{t.warehouse.product}</div>
                <div className="col-span-2">{t.warehouse.category}</div>
                <div className="col-span-1 text-right">{t.warehouse.stock}</div>
                <div className="col-span-2 text-right">{t.warehouse.price}</div>
                <div className="col-span-2 text-center">{t.warehouse.status}</div>
              </div>

              <div className="divide-y divide-border">
                {filteredProducts.map((product) => {
                  const displayName = locale === 'en' ? product.name_en || product.name : product.name
                  const displayCategory = locale === 'en' ? product.category_en : product.category

                  return (
                    <Link
                      key={product._id}
                      href={`/theorganizer/${product._id}`}
                      className="grid grid-cols-1 md:grid-cols-12 gap-3 px-4 py-3 items-center hover:bg-muted/40 transition-colors group text-sm"
                    >
                      <div className="col-span-2 font-mono text-xs text-muted-foreground truncate">
                        <span className="md:hidden font-semibold text-foreground mr-2">{t.warehouse.sku}:</span>
                        {product.sku}
                      </div>

                      <div className="col-span-3 font-medium text-foreground flex items-center gap-3 min-w-0">
                        {product.imageUrl ? (
                          <img
                            src={product.imageUrl}
                            alt=""
                            onError={(e) => {
                              ;(e.target as HTMLElement).style.display = 'none'
                            }}
                            className="w-8 h-8 rounded object-cover border border-border shrink-0"
                          />
                        ) : (
                          <div className="w-8 h-8 rounded bg-muted flex items-center justify-center border border-border shrink-0">
                            <Package className="w-4 h-4 text-muted-foreground" />
                          </div>
                        )}
                        <span className="group-hover:text-primary transition-colors truncate">{displayName}</span>
                      </div>

                      <div className="col-span-2 text-muted-foreground text-xs md:text-sm truncate">
                        <span className="md:hidden font-semibold text-foreground mr-2">{t.warehouse.category}:</span>
                        {displayCategory}
                      </div>

                      <div className="col-span-1 md:text-right font-medium">
                        <span className="md:hidden font-semibold text-muted-foreground mr-2">{t.warehouse.stock}:</span>
                        {product.stock} {product.unit}
                      </div>

                      <div className="col-span-2 md:text-right font-semibold text-primary">
                        <span className="md:hidden font-semibold text-muted-foreground mr-2">{t.warehouse.price}:</span>
                        € {product.price.toFixed(2)}
                      </div>

                      <div className="col-span-2 flex md:justify-center">
                        {getStatusBadge(product.status)}
                      </div>
                    </Link>
                  )
                })}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}