import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { formatPrice, productImageUrl } from '../services/productService'
import styles from './CartDrawer.module.css'

export function CartDrawer() {
  const {
    isOpen,
    items,
    subtotal,
    closeCart,
    setQuantity,
    removeItem,
  } = useCart()

  if (!isOpen) return null

  return (
    <>
      <div className={styles.overlay} onClick={closeCart} aria-hidden="true" />
      <aside className={styles.drawer} role="dialog" aria-modal="true" aria-label="سلة التسوق">
        <div className={styles.head}>
          <h2 className={styles.title}>السلة</h2>
          <button type="button" className={styles.close} onClick={closeCart} aria-label="إغلاق">
            ✕
          </button>
        </div>

        <div className={styles.body}>
          {items.length === 0 ? (
            <p className={styles.empty}>سلتك فارغة حالياً. استكشف العطور وأضف ما يعجبك.</p>
          ) : (
            items.map((item) => (
              <div key={`${item.productId}-${item.ml}`} className={styles.item}>
                <Link to={`/products/${item.slug}`} onClick={closeCart}>
                  <img
                    className={styles.thumb}
                    src={productImageUrl(item.image)}
                    alt={item.nameAr}
                  />
                </Link>
                <div>
                  <Link to={`/products/${item.slug}`} onClick={closeCart} className={styles.itemName}>
                    {item.nameAr}
                  </Link>
                  <div className={styles.itemMeta}>
                    {item.ml} مل · {formatPrice(item.unitPrice)}
                  </div>
                  <div className={styles.controls}>
                    <div className={styles.qty}>
                      <button
                        type="button"
                        aria-label="إنقاص"
                        onClick={() => setQuantity(item.productId, item.ml, item.quantity - 1)}
                      >
                        −
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        type="button"
                        aria-label="زيادة"
                        onClick={() => setQuantity(item.productId, item.ml, item.quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                    <button
                      type="button"
                      className={styles.remove}
                      onClick={() => removeItem(item.productId, item.ml)}
                    >
                      حذف
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className={styles.foot}>
          <div className={styles.subtotal}>
            <span>المجموع الفرعي</span>
            <span>{formatPrice(subtotal)}</span>
          </div>
          <div className={styles.actions}>
            <Link to="/cart" className={styles.primary} onClick={closeCart}>
              عرض السلة
            </Link>
            <button type="button" className={styles.secondary} disabled title="قريباً">
              إتمام الشراء
            </button>
          </div>
          <p className={styles.hint}>الدفع الإلكتروني سيُفعَّل لاحقاً عبر NestJS</p>
        </div>
      </aside>
    </>
  )
}
