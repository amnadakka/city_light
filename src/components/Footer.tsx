import { Link } from 'react-router-dom'
import { assetUrl } from '../services/productService'
import styles from './Footer.module.css'

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.grid}`}>
        <div>
          <div className={styles.brandRow}>
            <img
              className={styles.brandLogo}
              src={assetUrl('logo.png')}
              alt=""
              width={52}
              height={52}
            />
            <div>
              <div className={styles.brandEn}>City Lights</div>
              <div className={styles.brandAr}>سيتي لايت</div>
            </div>
          </div>
          <p className={styles.blurb}>
            اترك وراءك طيفاً لا يُنسى — عطور تُصاغ بروح المدينة والضوء.
          </p>
        </div>

        <div>
          <h3 className={styles.title}>استكشف</h3>
          <div className={styles.links}>
            <Link to="/collections/perfumes">العطور</Link>
            <Link to="/about">من نحن</Link>
            <Link to="/contact">تواصل معنا</Link>
            <Link to="/cart">السلة</Link>
          </div>
        </div>

        <div>
          <h3 className={styles.title}>معلومات</h3>
          <div className={styles.links}>
            <span>العملة: دولار أمريكي (USD)</span>
            <span>شحن دولي متاح قريباً</span>
            <span>الدفع الآمن قادم مع NestJS</span>
          </div>
        </div>
      </div>

      <div className={`container ${styles.bottom}`}>
        <span>© {new Date().getFullYear()} City Lights Fragrances · سيتي لايت</span>
        <span>واجهة تجريبية بدون خادم خلفي</span>
      </div>
    </footer>
  )
}
