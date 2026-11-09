import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import {
  formatPrice,
  getProductBySlug,
  productImageUrl,
} from '../services/productService'
import type { Product } from '../types/product'
import styles from './pages.module.css'

const badgeLabel: Record<string, string> = {
  new: 'جديد',
  soldout: 'نفد',
  exclusive: 'حصري',
}

export function ProductPage() {
  const { slug } = useParams()
  const { addItem } = useCart()
  const [product, setProduct] = useState<Product | null | undefined>(undefined)
  const [ml, setMl] = useState<number>(100)

  useEffect(() => {
    if (!slug) {
      setProduct(null)
      return
    }
    void getProductBySlug(slug).then((p) => {
      setProduct(p ?? null)
      if (p?.sizes[0]) setMl(p.sizes.find((s) => s.ml === 100)?.ml ?? p.sizes[0].ml)
    })
  }, [slug])

  if (product === undefined) {
    return (
      <div className="container" style={{ padding: '4rem 0', color: 'var(--color-muted)' }}>
        جاري التحميل...
      </div>
    )
  }

  if (!product) {
    return (
      <div className={`container ${styles.simplePage}`}>
        <h1>العطر غير موجود</h1>
        <p>تعذر العثور على هذا المنتج.</p>
        <Link to="/collections/perfumes" className={styles.btnPrimary}>
          العودة إلى العطور
        </Link>
      </div>
    )
  }

  const selected = product.sizes.find((s) => s.ml === ml) ?? product.sizes[0]

  return (
    <div className={`container ${styles.detail}`}>
      <div className={styles.gallery}>
        <img src={productImageUrl(product.images[0])} alt={product.nameAr} />
      </div>

      <div className={styles.detailBody}>
        <div className={styles.detailBadges}>
          {!product.inStock && <span className={styles.chip}>نفد</span>}
          {product.badges
            .filter((b) => b !== 'soldout')
            .map((b) => (
              <span key={b} className={styles.chip}>
                {badgeLabel[b]}
              </span>
            ))}
        </div>

        <h1 className={styles.detailTitle}>{product.nameAr}</h1>
        <div className={styles.detailPrice}>{formatPrice(selected.price)}</div>
        <p className={styles.detailDesc}>
          ★ {product.rating.toFixed(1)} · {product.reviewCount} تقييم
          <br />
          {product.descriptionAr}
        </p>

        <div className={styles.fieldLabel}>الحجم</div>
        <div className={styles.sizeRow}>
          {product.sizes.map((size) => (
            <button
              key={size.ml}
              type="button"
              className={`${styles.sizeBtn} ${ml === size.ml ? styles.sizeBtnActive : ''}`}
              onClick={() => setMl(size.ml)}
            >
              {size.ml} مل
            </button>
          ))}
        </div>

        <div className={styles.notes}>
          <div className={styles.noteRow}>
            <strong>المقدمة</strong>
            <span>{product.notes.top.join(' · ')}</span>
          </div>
          <div className={styles.noteRow}>
            <strong>القلب</strong>
            <span>{product.notes.heart.join(' · ')}</span>
          </div>
          <div className={styles.noteRow}>
            <strong>القاعدة</strong>
            <span>{product.notes.base.join(' · ')}</span>
          </div>
        </div>

        <button
          type="button"
          className={styles.addBtn}
          disabled={!product.inStock}
          onClick={() => addItem(product, selected.ml)}
        >
          {product.inStock ? 'أضف إلى السلة' : 'غير متوفر حالياً'}
        </button>
      </div>
    </div>
  )
}
