import { Link } from 'react-router-dom'
import { formatPrice, productImageUrl } from '../services/productService'
import type { Product } from '../types/product'
import styles from './ProductCard.module.css'

const badgeLabel: Record<string, string> = {
  new: 'جديد',
  soldout: 'نفد',
  exclusive: 'حصري',
}

interface ProductCardProps {
  product: Product
  index?: number
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  return (
    <article
      className={styles.card}
      style={{ animationDelay: `${Math.min(index, 8) * 60}ms` }}
    >
      <Link to={`/products/${product.slug}`} className={styles.media}>
        {(product.badges.length > 0 || !product.inStock) && (
          <div className={styles.badges}>
            {!product.inStock && (
              <span className={`${styles.badge} ${styles.badgeSold}`}>نفد</span>
            )}
            {product.badges
              .filter((b) => b !== 'soldout')
              .map((b) => (
                <span key={b} className={styles.badge}>
                  {badgeLabel[b]}
                </span>
              ))}
          </div>
        )}
        <img
          src={productImageUrl(product.images[0])}
          alt={product.nameAr}
          loading="lazy"
        />
      </Link>

      <div className={styles.meta}>
        <Link to={`/products/${product.slug}`} className={styles.name}>
          {product.nameAr}
        </Link>
        <div className={styles.row}>
          <span className={styles.price}>{formatPrice(product.price)}</span>
          <span className={styles.rating}>
            ★ {product.rating.toFixed(1)} · {product.reviewCount}
          </span>
        </div>
      </div>
    </article>
  )
}
