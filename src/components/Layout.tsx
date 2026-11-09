import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { CartProvider } from '../context/CartContext'
import { getAllProducts } from '../services/productService'
import type { Product } from '../types/product'
import { CartDrawer } from './CartDrawer'
import { Footer } from './Footer'
import { Header } from './Header'
import { SearchModal } from './SearchModal'

export function Layout() {
  const [searchOpen, setSearchOpen] = useState(false)
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    void getAllProducts().then(setProducts)
  }, [])

  return (
    <CartProvider>
      <Header onSearchOpen={() => setSearchOpen(true)} />
      <main>
        <Outlet />
      </main>
      <Footer />
      <CartDrawer />
      <SearchModal
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
        products={products}
      />
    </CartProvider>
  )
}
