import mongoose from "mongoose";
import dotenv from "dotenv";
import { User } from "./models/User.js";
import { Technician } from "./models/Technician.js";
import { Category } from "./models/Category.js";
import { Booking } from "./models/Booking.js";
import { Review } from "./models/Review.js";
import { Faq } from "./models/Faq.js";
import { Testimonial } from "./models/Testimonial.js";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/etsalah";

const categoriesData = [
  {
    key: "ac",
    nameAr: "مسؤولي التكييف",
    nameEn: "AC Specialists",
    description: "صيانة، تنظيف، شحن فريون، وتركيب كافة أنواع أجهزة التكييف المنزلية والمركزية.",
    icon: "FaSnowflake",
    image: "/images/tkeef.png",
    active: true,
    order: 1,
  },
  {
    key: "carpenter",
    nameAr: "مسؤولي النجارة",
    nameEn: "Carpenters",
    description: "فك وتركيب الأثاث، تصليح الأبواب والشبابيك، وتصميم وتنفيذ الديكورات الخشبية.",
    icon: "FaHammer",
    image: "/images/ngar.png",
    active: true,
    order: 2,
  },
  {
    key: "plumber",
    nameAr: "مسؤولي السباكة",
    nameEn: "Plumbers",
    description: "معالجة التسريبات، تأسيس وصيانة شبكات المياه والصرف الصحي، وتركيب أطقم الحمامات والمطابخ.",
    icon: "FaFaucet",
    image: "/images/sbak.png",
    active: true,
    order: 3,
  },
  {
    key: "glass",
    nameAr: "مسؤولي الزجاج",
    nameEn: "Glass Specialists",
    description: "تركيب وتفصيل الزجاج السيكوريت، الواجهات الزجاجية، المرايا، وصيانة شبابيك الألوميتال.",
    icon: "FaGlassWhiskey",
    image: "/images/zgag.png",
    active: true,
    order: 4,
  },
  {
    key: "electrician",
    nameAr: "مسؤولي الكهرباء",
    nameEn: "Electricians",
    description: "تأسيس وصيانة التوصيلات الكهربائية، لوحات التوزيع، تركيب الإضاءات والأجهزة الكهربائية بأمان تام.",
    icon: "FaBolt",
    image: "/images/electric.png",
    active: true,
    order: 5,
  },
];

const rawWorkers = [
  // 🔹 تكييف
  { id: 1, name: "أحمد علي", specialty: "تكييف", category: "ac", phone: "0101001001", city: "القاهرة", rating: 4.7, image: "/images/tkeef.png" },
  { id: 2, name: "محمد سمير", specialty: "تكييف", category: "ac", phone: "0101001002", city: "الجيزة", rating: 4.5, image: "/images/tkeef.png" },
  { id: 3, name: "كريم حسن", specialty: "تكييف", category: "ac", phone: "0101001003", city: "الإسكندرية", rating: 4.2, image: "/images/tkeef.png" },
  { id: 4, name: "محمود عبد الله", specialty: "تكييف", category: "ac", phone: "0101001004", city: "طنطا", rating: 4.6, image: "/images/tkeef.png" },
  { id: 5, name: "سعيد عبد الرحمن", specialty: "تكييف", category: "ac", phone: "0101001005", city: "المنصورة", rating: 4.3, image: "/images/tkeef.png" },
  { id: 6, name: "ياسر فؤاد", specialty: "تكييف", category: "ac", phone: "0101001006", city: "السويس", rating: 4.1, image: "/images/tkeef.png" },
  { id: 7, name: "خالد صلاح", specialty: "تكييف", category: "ac", phone: "0101001007", city: "بني سويف", rating: 4.8, image: "/images/tkeef.png" },
  { id: 8, name: "حسام مصطفى", specialty: "تكييف", category: "ac", phone: "0101001008", city: "القاهرة", rating: 4.4, image: "/images/tkeef.png" },
  { id: 9, name: "عبد الله حسين", specialty: "تكييف", category: "ac", phone: "0101001009", city: "المنيا", rating: 4.0, image: "/images/tkeef.png" },
  { id: 10, name: "إسلام عبد الباقي", specialty: "تكييف", category: "ac", phone: "0101001010", city: "بورسعيد", rating: 4.9, image: "/images/electric.png" },

  // 🔹 نجارة
  { id: 11, name: "سعيد عبد الله", specialty: "نجارة", category: "carpenter", phone: "0102002001", city: "القاهرة", rating: 4.8, image: "/images/ngar.png" },
  { id: 12, name: "محمود شريف", specialty: "نجارة", category: "carpenter", phone: "0102002002", city: "طنطا", rating: 4.3, image: "/images/ngar.png" },
  { id: 13, name: "إبراهيم ناصر", specialty: "نجارة", category: "carpenter", phone: "0102002003", city: "المنصورة", rating: 4.6, image: "/images/ngar.png" },
  { id: 14, name: "خالد أحمد", specialty: "نجارة", category: "carpenter", phone: "0102002004", city: "القاهرة", rating: 4.2, image: "/images/ngar.png" },
  { id: 15, name: "أشرف عبد اللطيف", specialty: "نجارة", category: "carpenter", phone: "0102002005", city: "الفيوم", rating: 4.5, image: "/images/ngar.png" },
  { id: 16, name: "حمدي يوسف", specialty: "نجارة", category: "carpenter", phone: "0102002006", city: "الزقازيق", rating: 4.1, image: "/images/ngar.png" },
  { id: 17, name: "مصطفى رأفت", specialty: "نجارة", category: "carpenter", phone: "0102002007", city: "الإسكندرية", rating: 4.7, image: "/images/ngar.png" },
  { id: 18, name: "طارق هاني", specialty: "نجارة", category: "carpenter", phone: "0102002008", city: "دمنهور", rating: 4.4, image: "/images/ngar.png" },
  { id: 19, name: "خليل عادل", specialty: "نجارة", category: "carpenter", phone: "0102002009", city: "كفر الشيخ", rating: 4.3, image: "/images/ngar.png" },
  { id: 20, name: "حسن عبد الكريم", specialty: "نجارة", category: "carpenter", phone: "0102002010", city: "القاهرة", rating: 4.9, image: "/images/ngar.png" },

  // 🔹 سباكة
  { id: 21, name: "عمرو مصطفى", specialty: "سباكة", category: "plumber", phone: "0103003001", city: "القاهرة", rating: 4.1, image: "/images/sbak.png" },
  { id: 22, name: "حسن فوزي", specialty: "سباكة", category: "plumber", phone: "0103003002", city: "الإسكندرية", rating: 4.4, image: "/images/sbak.png" },
  { id: 23, name: "مينا صبحي", specialty: "سباكة", category: "plumber", phone: "0103003003", city: "أسيوط", rating: 4.0, image: "/images/sbak.png" },
  { id: 24, name: "رمضان سيد", specialty: "سباكة", category: "plumber", phone: "0103003004", city: "طنطا", rating: 4.2, image: "/images/sbak.png" },
  { id: 25, name: "شريف عبد الحليم", specialty: "سباكة", category: "plumber", phone: "0103003005", city: "القاهرة", rating: 4.6, image: "/images/sbak.png" },
  { id: 26, name: "محمود عادل", specialty: "سباكة", category: "plumber", phone: "0103003006", city: "المنوفية", rating: 4.3, image: "/images/sbak.png" },
  { id: 27, name: "إسلام علي", specialty: "سباكة", category: "plumber", phone: "0103003007", city: "الفيوم", rating: 4.5, image: "/images/sbak.png" },
  { id: 28, name: "سامي عبد الغني", specialty: "سباكة", category: "plumber", phone: "0103003008", city: "الجيزة", rating: 4.8, image: "/images/sbak.png" },
  { id: 29, name: "طارق صبري", specialty: "سباكة", category: "plumber", phone: "0103003009", city: "بورسعيد", rating: 4.4, image: "/images/sbak.png" },
  { id: 30, name: "عبد المنعم يوسف", specialty: "سباكة", category: "plumber", phone: "0103003010", city: "المنصورة", rating: 4.7, image: "/images/sbak.png" },

  // 🔹 زجاج
  { id: 31, name: "خالد زكريا", specialty: "زجاج", category: "glass", phone: "0104004001", city: "الجيزة", rating: 4.9, image: "/images/zgag.png" },
  { id: 32, name: "عمر كمال", specialty: "زجاج", category: "glass", phone: "0104004002", city: "القاهرة", rating: 4.3, image: "/images/zgag.png" },
  { id: 33, name: "شريف طارق", specialty: "زجاج", category: "glass", phone: "0104004003", city: "المنيا", rating: 4.5, image: "/images/zgag.png" },
  { id: 34, name: "حازم عبد الباري", specialty: "زجاج", category: "glass", phone: "0104004004", city: "أسوان", rating: 4.1, image: "/images/zgag.png" },
  { id: 35, name: "أحمد ربيع", specialty: "زجاج", category: "glass", phone: "0104004005", city: "السويس", rating: 4.2, image: "/images/zgag.png" },
  { id: 36, name: "محمود صابر", specialty: "زجاج", category: "glass", phone: "0104004006", city: "الإسكندرية", rating: 4.6, image: "/images/zgag.png" },
  { id: 37, name: "طارق عبد السلام", specialty: "زجاج", category: "glass", phone: "0104004007", city: "المنصورة", rating: 4.8, image: "/images/zgag.png" },
  { id: 38, name: "إيهاب كمال", specialty: "زجاج", category: "glass", phone: "0104004008", city: "طنطا", rating: 4.4, image: "/images/zgag.png" },
  { id: 39, name: "محمد عبد العليم", specialty: "زجاج", category: "glass", phone: "0104004009", city: "القاهرة", rating: 4.7, image: "/images/zgag.png" },
  { id: 40, name: "يحيى حسين", specialty: "زجاج", category: "glass", phone: "0104004010", city: "بني سويف", rating: 4.5, image: "/images/zgag.png" },

  // 🔹 كهرباء
  { id: 41, name: "عادل حسن", specialty: "كهرباء", category: "electrician", phone: "0105005001", city: "القاهرة", rating: 4.9, image: "/images/electric.png" },
  { id: 42, name: "أحمد عبد المقصود", specialty: "كهرباء", category: "electrician", phone: "0105005002", city: "الإسكندرية", rating: 4.6, image: "/images/electric.png" },
  { id: 43, name: "عماد يوسف", specialty: "كهرباء", category: "electrician", phone: "0105005003", city: "السويس", rating: 4.3, image: "/images/electric.png" },
  { id: 44, name: "إبراهيم محمود", specialty: "كهرباء", category: "electrician", phone: "0105005004", city: "طنطا", rating: 4.4, image: "/images/electric.png" },
  { id: 45, name: "مصطفى حسين", specialty: "كهرباء", category: "electrician", phone: "0105005005", city: "المنوفية", rating: 4.7, image: "/images/electric.png" },
  { id: 46, name: "محمود رمضان", specialty: "كهرباء", category: "electrician", phone: "0105005006", city: "القاهرة", rating: 4.5, image: "/images/electric.png" },
  { id: 47, name: "شريف فؤاد", specialty: "كهرباء", category: "electrician", phone: "0105005007", city: "الجيزة", rating: 4.8, image: "/images/electric.png" },
  { id: 48, name: "حسن عبد اللطيف", specialty: "كهرباء", category: "electrician", phone: "0105005008", city: "الفيوم", rating: 4.1, image: "/images/electric.png" },
  { id: 49, name: "عمر رجب", specialty: "كهرباء", category: "electrician", phone: "0105005009", city: "دمنهور", rating: 4.2, image: "/images/electric.png" },
  { id: 50, name: "ياسر طارق", specialty: "كهرباء", category: "electrician", phone: "0105005010", city: "كفر الشيخ", rating: 4.9, image: "/images/electric.png" },
];

const testimonialsData = [
  {
    name: "محمد أحمد",
    role: "القاهرة",
    city: "القاهرة",
    rating: 5,
    text: "خدمة احترافية ممتازة! الفني كان دقيق في موعده وحل المشكلة بسرعة فائقة وبضمان معتمد. أنصح بهم بشدة.",
  },
  {
    name: "سارة فهمي",
    role: "الجيزة",
    city: "الجيزة",
    rating: 5,
    text: "المنصة سهلة وبسيطة، والجودة فاقت التوقعات تماماً. فني التكييف جهز كل حاجة ونضف المكان بعد ما خلص.",
  },
  {
    name: "علي عثمان",
    role: "الإسكندرية",
    city: "الإسكندرية",
    rating: 5,
    text: "تجربة راقية وسهلة جدًا من أول الطلب لحد المتابعة. شكراً لفريق خدمة العملاء على سرعة الاستجابة.",
  },
  {
    name: "أحمد محمود",
    role: "طنطا",
    city: "طنطا",
    rating: 5,
    text: "بصراحة كنت متردد في الأول لكن تفاجئت بجودة الشغل والالتزام بالمواعيد والأسعار الشفافة.",
  },
  {
    name: "منى صلاح",
    role: "المنصورة",
    city: "المنصورة",
    rating: 5,
    text: "ممتازين! الفني وصل في وقت قياسي وعالج عطل الكهرباء بأمان وحرفية عالية. خدمة تشرف بجد.",
  },
  {
    name: "إبراهيم حسني",
    role: "القاهرة",
    city: "القاهرة",
    rating: 5,
    text: "أفضل خدمة سباكة اتعاملت معاها، تم فحص التسريب بجهاز دقيق وبدون تكسير عشوائي.",
  },
];

const faqsData = [
  {
    question: "كيف يمكنني طلب خدمة صيانة؟",
    answer: "يمكنك طلب خدمة الصيانة بسهولة عبر الضغط على زر 'اطلب خدمة الآن' في الموقع، واختيار التخصص المناسب والفني المفضل وتحديد الموعد المناسب لك.",
    category: "general",
    order: 1,
  },
  {
    question: "ما هي المدة المتوقعة لوصول الفني؟",
    answer: "يتراوح وقت وصول الفني عادة بين 30 دقيقة إلى ساعتين وفقاً للجدول المختار ومنطقتك الجغرافية، مع إمكانية جدولة الموعد في وقت لاحق يناسبك.",
    category: "general",
    order: 2,
  },
  {
    question: "هل خدمات الصيانة معتمدة ومضمونة؟",
    answer: "نعم بكل تأكيد! جميع أعمال الصيانة المقدمة عبر فنيينا المعتمدين مشمولة بضمان الجودة لمدة 30 يوماً على الخدمة المنفذة.",
    category: "services",
    order: 3,
  },
  {
    question: "كيف يتم تحديد تكلفة الصيانة؟",
    answer: "نحرص على شفافية تامة في التسعير؛ يتم إعلامك بسعر الفحص المبدئي ورسوم الخدمة قبل بدء العمل دون أي مصاريف خفية.",
    category: "pricing",
    order: 4,
  },
  {
    question: "هل يمكنني إلغاء أو تعديل الطلب بعد إرساله؟",
    answer: "نعم، يمكنك إلغاء الطلب مباشرة عبر صفحة 'طلباتي' أو تعديل التفاصيل بالتواصل المباشر مع الفني أو خدمة العملاء بكل سهولة.",
    category: "orders",
    order: 5,
  },
];

const seed = async () => {
  try {
    console.log("[Seeder] Connecting to MongoDB:", MONGO_URI);
    await mongoose.connect(MONGO_URI);
    console.log("[Seeder] Connected successfully. Resetting and populating data...");

    // 1. Clear existing collections
    await Promise.all([
      User.deleteMany({}),
      Technician.deleteMany({}),
      Category.deleteMany({}),
      Booking.deleteMany({}),
      Review.deleteMany({}),
      Faq.deleteMany({}),
      Testimonial.deleteMany({}),
    ]);

    // 2. Insert Categories
    console.log("[Seeder] Seeding categories...");
    const createdCategories = await Category.insertMany(categoriesData);

    // 3. Insert Users (Admin & Customer)
    console.log("[Seeder] Seeding users...");
    const adminUser = new User({
      name: "مدير المنصة",
      email: "admin@etsalah.com",
      password: "admin123", // Will be hashed by pre-save hook
      phone: "01000000000",
      city: "القاهرة",
      address: "المعادي، القاهرة",
      role: "admin",
    });
    await adminUser.save();

    const customerUser = new User({
      name: "حسام أحمد",
      email: "customer@etsalah.com",
      password: "password123", // Will be hashed by pre-save hook
      phone: "01012345678",
      city: "القاهرة",
      address: "مدينة نصر، الحي السابع",
      dateOfBirth: "1995-05-15",
      gender: "male",
      role: "customer",
    });
    await customerUser.save();

    // 4. Insert Technicians
    console.log("[Seeder] Seeding technicians...");
    const techniciansDocs = rawWorkers.map((w) => {
      const skillsMap: Record<string, string[]> = {
        ac: ["تنظيف تكييف", "شحن فريون R410/R22", "معالجة تسريب المياه", "صيانة الكومبريسور"],
        carpenter: ["فك وتركيب أثاث", "صيانة الأبواب والشبابيك", "تركيب كالون ذكي", "تصليح غرف النوم"],
        plumber: ["كشف التسريبات", "تسليك البالوعات والمطابخ", "تركيب خلاطات وسخانات", "تأسيس سباكة"],
        glass: ["تفصيل زجاج سيكوريت", "تركيب مرايا ليد", "صيانة ألوميتال", "واجهات زجاجية"],
        electrician: ["كشف أعطال الكهرباء", "تأسيس الشقق", "تركيب نجف وإضاءة ليد", "لوحات توزيع"],
      };

      return {
        numericId: w.id,
        name: w.name,
        specialty: w.specialty,
        category: w.category,
        phone: w.phone,
        city: w.city,
        rating: w.rating,
        reviewsCount: Math.floor(Math.random() * 25) + 5,
        image: w.image,
        hourlyRate: 150 + (w.id % 4) * 25,
        experienceYears: 5 + (w.id % 12),
        bio: `فني محترف ومعتمد في مجال ${w.specialty} بخبرة سنوات في خدمة أهالي ${w.city}. نلتزم بالمواعيد والجودة واستخدام أحدث المعدات.`,
        available: true,
        verified: true,
        skills: skillsMap[w.category] || ["صيانة عامة", "فحص دوري"],
      };
    });

    const createdTechnicians = await Technician.insertMany(techniciansDocs);

    // 5. Seed Testimonials & FAQs
    console.log("[Seeder] Seeding testimonials & FAQs...");
    await Testimonial.insertMany(testimonialsData);
    await Faq.insertMany(faqsData);

    // 6. Seed Sample Bookings for customer
    console.log("[Seeder] Seeding sample customer bookings...");
    const techAc = createdTechnicians.find((t) => t.numericId === 1);
    const techPlumber = createdTechnicians.find((t) => t.numericId === 21);
    const techElectric = createdTechnicians.find((t) => t.numericId === 41);

    const booking1 = new Booking({
      orderNumber: "ETS-9011",
      user: customerUser._id,
      customerName: customerUser.name,
      customerPhone: customerUser.phone,
      city: customerUser.city,
      address: customerUser.address,
      serviceCategory: "ac",
      technician: techAc?._id,
      technicianNumericId: techAc?.numericId,
      scheduledDate: new Date(Date.now() - 86400000 * 2).toISOString().split("T")[0],
      timeSlot: "morning",
      details: "صيانة دورية لتكييف شارب 2.25 حصان وتنظيف الفلاتر وشحن الفريون.",
      status: "completed",
      estimatedPrice: 200,
      ratingSubmitted: true,
    });
    await booking1.save();

    const booking2 = new Booking({
      orderNumber: "ETS-9024",
      user: customerUser._id,
      customerName: customerUser.name,
      customerPhone: customerUser.phone,
      city: customerUser.city,
      address: customerUser.address,
      serviceCategory: "plumber",
      technician: techPlumber?._id,
      technicianNumericId: techPlumber?.numericId,
      scheduledDate: new Date().toISOString().split("T")[0],
      timeSlot: "afternoon",
      details: "معالجة تسريب مياه أسفل حوض المطبخ وتغيير خلاط المياه.",
      status: "confirmed",
      estimatedPrice: 175,
      ratingSubmitted: false,
    });
    await booking2.save();

    const booking3 = new Booking({
      orderNumber: "ETS-9039",
      user: customerUser._id,
      customerName: customerUser.name,
      customerPhone: customerUser.phone,
      city: customerUser.city,
      address: customerUser.address,
      serviceCategory: "electrician",
      technician: techElectric?._id,
      technicianNumericId: techElectric?.numericId,
      scheduledDate: new Date(Date.now() + 86400000).toISOString().split("T")[0],
      timeSlot: "evening",
      details: "فحص القاطع الكهربائي الرئيسي وتركيب نجفة جديدة في الصالون.",
      status: "pending",
      estimatedPrice: 150,
      ratingSubmitted: false,
    });
    await booking3.save();

    // 7. Seed Reviews for top technicians
    console.log("[Seeder] Seeding technician reviews...");
    if (techAc) {
      await Review.create({
        technician: techAc._id,
        technicianNumericId: techAc.numericId,
        user: customerUser._id,
        customerName: customerUser.name,
        rating: 5,
        comment: "مهندس أحمد قمة في الأخلاق والاحترافية. وصل في الميعاد بالضبط والشغل ممتاز جداً.",
        booking: booking1._id,
      });
      await Review.create({
        technician: techAc._id,
        technicianNumericId: techAc.numericId,
        customerName: "محمود جمال",
        rating: 4.8,
        comment: "شغل نظيف وسعر مناسب جداً، أنصح بالتعامل معه.",
      });
    }

    if (techElectric) {
      await Review.create({
        technician: techElectric._id,
        technicianNumericId: techElectric.numericId,
        customerName: "ياسر كمال",
        rating: 5,
        comment: "فني ممتاز جداً وحل مشكلة الشورت كات في لوحة الكهرباء بأمان وسرعة.",
      });
    }

    console.log("[Seeder] Database seeded successfully with 50 technicians, categories, users, bookings, and reviews!");
    process.exit(0);
  } catch (error) {
    console.error("[Seeder] Failed to seed database:", error);
    process.exit(1);
  }
};

seed();
