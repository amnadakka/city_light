import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { formatPrice, productImageUrl } from '../services/productService'
import styles from './pages.module.css'

export function CartPage() {
  const { items, subtotal, setQuantity, removeItem, clearCart } = useCart()

  return (
    <div className={`container ${styles.cartPage}`}>
      <h1>سلة التسوق</h1>

      {items.length === 0 ? (
        <div className={styles.simplePage} style={{ padding: 0 }}>
          <p>سلتك فارغة. ابدأ باختيار عطرك المفضل.</p>
          <Link to="/collections/perfumes" className={styles.btnPrimary}>
            تصفح العطور
          </Link>
        </div>
      ) : (
        <>
          <div className={styles.cartList}>
            {items.map((item) => (
              <div key={`${item.productId}-${item.ml}`} className={styles.cartItem}>
                <Link to={`/products/${item.slug}`}>
                  <img src={productImageUrl(item.image)} alt={item.nameAr} />
                </Link>
                <div>
                  <Link to={`/products/${item.slug}`}>
                    <strong style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem' }}>
                      {item.nameAr}
                    </strong>
                  </Link>
                  <div style={{ color: 'var(--color-muted)', marginTop: '0.25rem' }}>
                    {item.ml} مل · {formatPrice(item.unitPrice)}
                  </div>
                  <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.75rem', alignItems: 'center' }}>
                    <button type="button" onClick={() => setQuantity(item.productId, item.ml, item.quantity - 1)}>
                      −
                    </button>
                    <span>{item.quantity}</span>
                    <button type="button" onClick={() => setQuantity(item.productId, item.ml, item.quantity + 1)}>
                      +
                    </button>
                    <button
                      type="button"
                      onClick={() => removeItem(item.productId, item.ml)}
                      style={{ color: 'var(--color-muted)', background: 'none', border: 0 }}
                    >
                      حذف
                    </button>
                  </div>
                </div>
                <strong>{formatPrice(item.unitPrice * item.quantity)}</strong>
              </div>
            ))}
          </div>

          <div className={styles.cartSummary}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>المجموع الفرعي</span>
              <strong>{formatPrice(subtotal)}</strong>
            </div>
            <button type="button" className={styles.addBtn} disabled>
              إتمام الشراء — قريباً
            </button>
            <button
              type="button"
              onClick={clearCart}
              style={{ background: 'none', border: 0, color: 'var(--color-muted)' }}
            >
              تفريغ السلة
            </button>
            <p style={{ color: 'var(--color-muted)', fontSize: '0.88rem', margin: 0 }}>
              الدفع والشحن سيُربطان لاحقاً بواجهة NestJS.
            </p>
          </div>
        </>
      )}
    </div>
  )
}
