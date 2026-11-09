import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ProductCard } from '../components/ProductCard'
import { assetUrl, getFeaturedProducts } from '../services/productService'
import type { Product } from '../types/product'
import styles from './pages.module.css'

export function HomePage() {
  const [featured, setFeatured] = useState<Product[]>([])

  useEffect(() => {
    void getFeaturedProducts().then(setFeatured)
  }, [])

  return (
    <>
      <section className={styles.hero}>
        <div className={`container ${styles.heroGrid}`}>
          <div className={styles.heroContent}>
            <img
              className={styles.heroLogo}
              src={assetUrl('logo.png')}
              alt="City Lights Fragrances"
              width={120}
              height={120}
            />
            <div className={styles.brandMark}>City Lights</div>
            <h1 className={styles.heroTitle}>عطور تُضيء حضورك</h1>
            <p className={styles.heroText}>
              اترك وراءك طيفاً لا يُنسى — مجموعة مختارة من العطور الفاخرة بروح المدينة.
            </p>
            <div className={styles.ctaRow}>
              <Link to="/collections/perfumes" className={styles.btnPrimary}>
                استكشف العطور
              </Link>
              <Link to="/about" className={styles.btnGhost}>
                قصتنا
              </Link>
            </div>
          </div>
          <div className={styles.heroMedia}>
            <img
              src={assetUrl('hero-portrait.jpg')}
              alt=""
              className={styles.heroPortrait}
            />
          </div>
        </div>
      </section>

      <section className={`container ${styles.section}`}>
        <div className={styles.sectionHead}>
          <div>
            <h2 className={styles.sectionTitle}>مختارات سيتي لايت</h2>
            <p className={styles.sectionText}>قطع مميزة تبدأ منها رحلتك العطرية.</p>
          </div>
          <Link to="/collections/perfumes" className={styles.btnPrimary}>
            عرض الكل
          </Link>
        </div>
        <div className={styles.grid}>
          {featured.slice(0, 7).map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </section>
    </>
  )
}
