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

1. المستودع: **`city_light`** — تأكد أن `base` في `vite.config.ts` هو `/city_light/`.
2. من إعدادات المستودع → **Pages** → Source: **GitHub Actions**.
3. ادفع إلى `main` — سير العمل `.github/workflows/deploy.yml` سيبني وينشر تلقائياً.

الموقع: `https://amnadakka.github.io/city_light/`

## البنية

- المنتجات من `src/data/products.json` عبر `src/services/productService.ts`
- السلة في `localStorage`
- لاحقاً: استبدل طبقة الخدمة بـ NestJS API دون تغيير الواجهة

## العملة والفئة

- العملة: **USD**
- الفئة: **العطور** فقط
