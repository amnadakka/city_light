# City Light · سيتي لايت

متجر عطور عربي (RTL) مبني بـ React + Vite، جاهز للنشر على GitHub Pages بدون خادم خلفي.

## التشغيل محلياً

```bash
npm install
npm run dev
```

## البناء

```bash
npm run build
npm run preview
```

## النشر على GitHub Pages

1. ادفع المشروع إلى مستودع اسمه **`CityLight`** (أو غيّر `base` في `vite.config.ts` ليطابق اسم المستودع).
2. من إعدادات المستودع → **Pages** → Source: **GitHub Actions**.
3. ادفع إلى `main` — سير العمل `.github/workflows/deploy.yml` سيبني وينشر تلقائياً.

الموقع سيكون على: `https://<username>.github.io/CityLight/`

## البنية

- المنتجات من `src/data/products.json` عبر `src/services/productService.ts`
- السلة في `localStorage`
- لاحقاً: استبدل طبقة الخدمة بـ NestJS API دون تغيير الواجهة

## العملة والفئة

- العملة: **USD**
- الفئة: **العطور** فقط
