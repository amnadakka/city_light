import { useEffect, useMemo, useState } from 'react'
import { FilterBar } from '../components/FilterBar'
import { ProductCard } from '../components/ProductCard'
import {
  filterProducts,
  getAllProducts,
  sortProducts,
} from '../services/productService'
import type { Product, SortOption } from '../types/product'
import styles from './pages.module.css'

export function CollectionPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [sort, setSort] = useState<SortOption>('featured')
  const [inStockOnly, setInStockOnly] = useState(false)

  useEffect(() => {
    void getAllProducts().then(setProducts)
  }, [])

  const visible = useMemo(() => {
    const filtered = filterProducts(products, { inStockOnly })
    return sortProducts(filtered, sort)
  }, [products, sort, inStockOnly])

  return (
    <div className="container">
      <header className={styles.collectionIntro}>
        <h1>العطور</h1>
        <p>
          استكشف أرقى العطور لدى سيتي لايت — من العود الجريء إلى الزهور الناعمة،
          مزيج من التراث والفخامة المتاحة في كل زجاجة.
        </p>
      </header>

      <FilterBar
        count={visible.length}
        sort={sort}
        inStockOnly={inStockOnly}
        onSortChange={setSort}
        onInStockChange={setInStockOnly}
      />

      <div className={`${styles.grid} ${styles.section}`}>
        {visible.map((product, index) => (
          <ProductCard key={product.id} product={product} index={index} />
        ))}
      </div>
    </div>
  )
}
