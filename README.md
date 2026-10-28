# اتصلح (EtSalah) — منصة خدمات الصيانة المنزلية الذكية

منصة متكاملة تربط العملاء في كافة محافظات مصر بأمهر الفنيين والخبراء المعتمدين في مجالات التكييف، الكهرباء، السباكة، النجارة، والزجاج بضمان معتمد وأسعار شفافة.

---

## 🛠 التقنيات المستخدمة (Tech Stack)

### الواجهة الأمامية (Frontend):
- **React 19 & TypeScript 5.9**
- **React Router DOM 7**
- **Tailwind CSS 4**
- **TanStack React Query 5** (إدارة الحالة والبيانات والـ Caching والتحديث التلقائي)
- **Zustand 5** (إدارة حالة الجلسة وتنبيهات الـ UI)
- **React Hook Form 7** (إدارة النماذج والتحقق من صحة المدخلات)
- **Framer Motion 12** (حركات وتأثيرات بصرية راقية)
- **React Icons 5** (أيقونات متناسقة وسريعة)
- **Google Fonts (Cairo)** (خط عربي احترافي مع دعم كامل لاتجاه RTL)

### الواجهة الخلفية وقاعدة البيانات (Backend & Database):
- **Node.js 24 & Express 4**
- **MongoDB & Mongoose 8**
- **TypeScript & tsx**
- **JWT (JSON Web Tokens)** لجلسات العمل المحمية
- **Bcrypt.js** لتشفير كلمات المرور
- **CORS & Dotenv** لتهيئة الأمان وبيئات التشغيل

---

## 🚀 البدء والتشغيل (Quick Start)

### 1. تثبيت الحزم (Dependencies):
```bash
# تثبيت حزم الواجهة الأمامية
npm install

# تثبيت حزم الخادم
cd server
npm install
cd ..
```

### 2. إعداد ملفات البيئة (Environment Variables):
تم إرفاق `.env.example` في كلا المجلدين الرئيسي ومجلد الخادم:

- **Root `.env` (Frontend):**
  ```env
  VITE_API_URL=http://localhost:5001/api
  ```

- **`server/.env` (Backend):**
  ```env
  PORT=5001
  MONGO_URI=mongodb://127.0.0.1:27017/etsalah
  JWT_SECRET=etsalah_jwt_secret_production_ready_key_2026
  JWT_EXPIRES_IN=7d
  CORS_ORIGIN=http://localhost:5173
  ```

### 3. تغذية قاعدة البيانات بالبيانات الحقيقية (Seeder):
يقوم السكربت بإنشاء الفئات، 50 فني مصري معتمد بتخصصاتهم ومحافظاتهم، حسابات المستخدمين التجريبية، التقييمات، والطلبات:
```bash
npm run server:seed
```

### 4. تشغيل المشروع (Frontend + Backend):
بأمر واحد يتم تشغيل الخادم والواجهة معاً:
```bash
npm run dev:all
```
أو تشغيل كل طرف بشكل مستقل:
```bash
# تشغيل خادم الـ API (Port 5001)
npm run server

# تشغيل الـ Frontend (Port 5173)
npm run dev
```

---

## 🔑 الحسابات التجريبية (Demo Accounts)

يمكنك تسجيل الدخول بنقرة زر واحدة عبر زر "الدخول التجريبي" في صفحة `/login`:

| الدور (Role) | البريد الإلكتروني | كلمة المرور |
| :--- | :--- | :--- |
| **عميل موثوق (Customer)** | `customer@etsalah.com` | `password123` |
| **مدير المنصة (Admin)** | `admin@etsalah.com` | `admin123` |

---

## 📡 مسارات الـ API (API Endpoints)

| المسار | الطريقة | الوصف | الحماية |
| :--- | :---: | :--- | :---: |
| `/api/auth/register` | `POST` | تسجيل حساب جديد للعميل | عام |
| `/api/auth/login` | `POST` | تسجيل الدخول وتوليد JWT Token | عام |
| `/api/auth/me` | `GET` | جلب بيانات المستخدم المسجل وإحصائياته | `Bearer JWT` |
| `/api/auth/profile` | `PUT` | تحديث بيانات الملف الشخصي (هاتف، عنوان، محافظة) | `Bearer JWT` |
| `/api/categories` | `GET` | جلب أقسام الخدمات مع عدد الفنيين المتاحين | عام |
| `/api/technicians` | `GET` | تصفية وبحث الفنيين بالاسم، المحافظة، التقييم | عام |
| `/api/technicians/top` | `GET` | جلب أفضل فني في كل تخصص للصفحة الرئيسية | عام |
| `/api/technicians/:id` | `GET` | تفاصيل الفني الكاملة مع تقييمات العملاء السابقة | عام |
| `/api/bookings` | `POST` | إرسال طلب صيانة جديد وتأكيد رقم الطلب | عام / مسجل |
| `/api/bookings/my` | `GET` | جلب طلبات العميل الحالية والسابقة وتفاصيلها | `Bearer JWT` / هاتف |
| `/api/bookings/:id/cancel` | `PATCH` | إلغاء طلب صيانة مسبق وفقاً لشروط الإلغاء | مسجل |
| `/api/reviews` | `POST` | إضافة تقييم ومراجعة لفني وإعادة احتساب المعدل | عام / مسجل |
| `/api/contact` | `POST` | إرسال رسالة أو استفسار لفريق الدعم | عام |
| `/api/faq` | `GET` | جلب قائمة الأسئلة الشائعة | عام |
| `/api/testimonials` | `GET` | جلب آراء العملاء الحقيقية | عام |

---

## 🎨 مميزات التصميم والـ UI/UX الجديد

1. **RTL & Typography:** توافق تام مع اتجاه الكتابة من اليمين إلى اليسار واستخدام خط `Cairo` العصري مع أوزان متعددة.
2. **Design Language:** هوية بصرية مستوحاة من البرتقالي الحيوي والرمادي الداكن الفخم لإبراز الثقة والاحترافية.
3. **No Mock Data:** تم حذف جميع البيانات الوهمية من مسار التشغيل الفعلي وربط كل المكونات بـ TanStack Query ونقاط النهاية الحقيقية.
4. **Interactive Filters:** بحث لحظي بالاسم وفلترة بالمحافظة والتقييم مع تحديث سريع بدون إعادة تحميل الصفحة.
5. **Modern Feedback:** نظام تنبيهات عائم (Floating Toast Notifications) بدلاً من `alert()` الافتراضي.
6. **Responsive Design:** تجاوب كامل مع الهواتف الذكية، الأجهزة اللوحية، والشاشات العريضة.
