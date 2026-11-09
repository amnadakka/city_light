import type { SortOption } from '../types/product'
import styles from './FilterBar.module.css'

interface FilterBarProps {
  count: number
  sort: SortOption
  inStockOnly: boolean
  onSortChange: (sort: SortOption) => void
  onInStockChange: (value: boolean) => void
}

export function FilterBar({
  count,
  sort,
  inStockOnly,
  onSortChange,
  onInStockChange,
}: FilterBarProps) {
  return (
    <div className={styles.bar}>
      <div className={styles.left}>
        <button
          type="button"
          className={`${styles.toggle} ${inStockOnly ? styles.toggleActive : ''}`}
          onClick={() => onInStockChange(!inStockOnly)}
          aria-pressed={inStockOnly}
        >
          المتوفر فقط
        </button>
        <span className={styles.count}>{count} نتيجة</span>
      </div>

      <div className={styles.right}>
        <label className={styles.label} htmlFor="sort">
          ترتيب:
        </label>
        <select
          id="sort"
          className={styles.select}
          value={sort}
          onChange={(e) => onSortChange(e.target.value as SortOption)}
        >
          <option value="featured">مميز</option>
          <option value="price-asc">السعر: من الأقل</option>
          <option value="price-desc">السعر: من الأعلى</option>
          <option value="name">الاسم</option>
          <option value="rating">التقييم</option>
        </select>
      </div>
    </div>
  )
}
