import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { filterProducts, formatPrice, productImageUrl } from '../services/productService'
import type { Product } from '../types/product'
import styles from './SearchModal.module.css'

interface SearchModalProps {
  open: boolean
  onClose: () => void
  products: Product[]
}

export function SearchModal({ open, onClose, products }: SearchModalProps) {
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!open) return
    setQuery('')
    const t = window.setTimeout(() => inputRef.current?.focus(), 30)
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      window.clearTimeout(t)
      window.removeEventListener('keydown', onKey)
    }
  }, [open, onClose])

  const results = useMemo(
    () => (query.trim() ? filterProducts(products, { query }).slice(0, 8) : products.slice(0, 6)),
    [products, query],
  )

  if (!open) return null

  return (
    <div className={styles.overlay} onClick={onClose} role="presentation">
      <div
        className={styles.panel}
        role="dialog"
        aria-modal="true"
        aria-label="بحث عن العطور"
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.inputWrap}>
          <input
            ref={inputRef}
            className={styles.input}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="ابحث عن عطر..."
            aria-label="ابحث عن عطر"
          />
          <button type="button" className={styles.close} onClick={onClose}>
            إغلاق
          </button>
        </div>

        <div className={styles.results}>
          {results.length === 0 ? (
            <p className={styles.empty}>لا توجد نتائج مطابقة</p>
          ) : (
            results.map((p) => (
              <Link
                key={p.id}
                to={`/products/${p.slug}`}
                className={styles.result}
                onClick={onClose}
              >
                <img
                  className={styles.thumb}
                  src={productImageUrl(p.images[0])}
                  alt=""
                />
                <span className={styles.name}>{p.nameAr}</span>
                <span className={styles.price}>{formatPrice(p.price)}</span>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
