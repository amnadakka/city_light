import { useState, type FormEvent } from 'react'
import styles from './pages.module.css'

export function ContactPage() {
  const [sent, setSent] = useState(false)

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSent(true)
  }

  return (
    <div className={`container ${styles.simplePage}`}>
      <h1>تواصل معنا</h1>
      <p>
        نسعد بسماع رأيك أو استفسارك عن العطور. النموذج أدناه للعرض فقط —
        ورسالة حقيقية ستُرسل لاحقاً عبر الواجهة الخلفية.
      </p>

      <form className={styles.form} onSubmit={onSubmit}>
        <label>
          الاسم
          <input name="name" required placeholder="اسمك" />
        </label>
        <label>
          البريد الإلكتروني
          <input name="email" type="email" required placeholder="you@email.com" dir="ltr" />
        </label>
        <label>
          الرسالة
          <textarea name="message" required rows={5} placeholder="كيف يمكننا مساعدتك؟" />
        </label>
        <button type="submit" className={styles.addBtn}>
          إرسال
        </button>
        {sent && (
          <p className={styles.formSuccess}>
            شكراً لك — تم حفظ الرسالة محلياً للعرض. الربط الحقيقي قادم مع NestJS.
          </p>
        )}
      </form>
    </div>
  )
}
