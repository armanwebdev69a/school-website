// News.tsx
import { useState } from "react"
import { motion, AnimatePresence, type Variants } from "framer-motion"
import {
  Megaphone, Calendar, ChevronLeft, X, Clock,
  Tag, TrendingUp, BookOpen, Award, Users
} from "lucide-react"

interface NewsItem {
  id: number
  title: string
  summary: string
  body: string
  date: string
  readTime: number
  category: string
  categoryIcon: React.ElementType
  accent: string
  accentBg: string
  accentText: string
  emoji: string
  hot: boolean
}

const news: NewsItem[] = [
  {
    id: 1,
    title: "نتایج امتحانات ترم اول اعلام شد",
    summary: "نتایج کلیه‌ی آزمون‌های ترم اول از طریق سامانه‌ی آموزشی قابل مشاهده است.",
    body: "دانش‌آموزان عزیز می‌توانند با ورود به سامانه‌ی آموزشی مدرسه، کارنامه‌ی خود را مشاهده و در صورت نیاز با مشاور آموزشی هماهنگ کنند. اعتراض به نمرات تا پایان هفته‌ی جاری قابل پیگیری است.",
    date: "۲ آذر ۱۴۰۵",
    readTime: 2,
    category: "آموزشی",
    categoryIcon: BookOpen,
    accent: "text-primary",
    accentBg: "bg-primary/10",
    accentText: "bg-primary",
    emoji: "📋",
    hot: true,
  },
  {
    id: 2,
    title: "مسابقات ورزشی بین‌مدرسه‌ای برگزار می‌شود",
    summary: "مدرسه‌ی ما میزبان مسابقات والیبال منطقه در هفته‌ی آینده خواهد بود.",
    body: "مسابقات والیبال بین‌مدرسه‌ای روز شنبه ۸ آذر از ساعت ۹ صبح در سالن ورزشی مدرسه برگزار می‌شود. تیم ما در این دوره با ۱۲ مدرسه‌ی دیگر رقابت خواهد کرد. حضور همه‌ی دانش‌آموزان برای حمایت از تیم توصیه می‌شود.",
    date: "۱ آذر ۱۴۰۵",
    readTime: 3,
    category: "ورزشی",
    categoryIcon: TrendingUp,
    accent: "text-success",
    accentBg: "bg-success/10",
    accentText: "bg-success",
    emoji: "🏐",
    hot: true,
  },
  {
    id: 3,
    title: "جشن دانش‌آموز ممتاز فردا برگزار می‌شود",
    summary: "مراسم تقدیر از دانش‌آموزان برتر نیمسال اول فردا در سالن اجتماعات برپاست.",
    body: "مراسم تجلیل از دانش‌آموزان ممتاز ترم اول فردا ۳ آذر ساعت ۱۱ در سالن اجتماعات مدرسه برگزار می‌شود. به ۳۰ نفر از برترین‌ها جوایز نقدی و تندیس اهدا می‌گردد. حضور والدین دانش‌آموزان منتخب ضروری است.",
    date: "۲ آذر ۱۴۰۵",
    readTime: 2,
    category: "مراسم",
    categoryIcon: Award,
    accent: "text-warning",
    accentBg: "bg-warning/10",
    accentText: "bg-warning",
    emoji: "🏆",
    hot: false,
  },
  {
    id: 4,
    title: "ثبت‌نام اردوی علمی آغاز شد",
    summary: "اردوی یک‌روزه به مرکز علوم و فناوری ویژه‌ی دانش‌آموزان پایه‌ی یازدهم.",
    body: "اردوی علمی-آموزشی پایه‌ی یازدهم به مرکز نوآوری شهر برگزار می‌شود. در این اردو بازدید از آزمایشگاه‌های پیشرفته، کارگاه رباتیک و نشست با مهندسین حرفه‌ای در برنامه است. ظرفیت محدود است؛ هرچه زودتر ثبت‌نام کنید.",
    date: "۲۹ آبان ۱۴۰۵",
    readTime: 4,
    category: "اردو",
    categoryIcon: Users,
    accent: "text-secondary",
    accentBg: "bg-secondary/10",
    accentText: "bg-secondary",
    emoji: "🔭",
    hot: false,
  },
  {
    id: 5,
    title: "کارگاه کدنویسی برای مبتدیان",
    summary: "انجمن دانش‌آموزی مدرسه کارگاه رایگان برنامه‌نویسی Python برگزار می‌کند.",
    body: "انجمن علمی مدرسه کارگاه دو جلسه‌ای Python رو برای همه‌ی پایه‌ها برگزار می‌کنه. نیازی به سابقه‌ی قبلی نیست! فقط یه لپ‌تاپ بیار. جلسه اول: ۵ آذر، جلسه دوم: ۱۲ آذر، هر دو از ساعت ۱۴ تا ۱۶ در کلاس ۱۰۴.",
    date: "۲۸ آبان ۱۴۰۵",
    readTime: 3,
    category: "فناوری",
    categoryIcon: Tag,
    accent: "text-accent",
    accentBg: "bg-accent/10",
    accentText: "bg-accent",
    emoji: "💻",
    hot: false,
  },
  {
    id: 6,
    title: "تغییر ساعت زنگ تفریح دوم",
    summary: "از هفته‌ی آینده ساعت زنگ تفریح دوم ۱۰ دقیقه جلو می‌افتد.",
    body: "به اطلاع می‌رسد از شنبه ۸ آذر، زنگ تفریح دوم از ساعت ۱۰:۳۰ به ۱۰:۲۰ تغییر می‌کند تا با برنامه‌ی جدید استفاده از سالن ناهارخوری هماهنگ شود. زنگ‌های دیگر تغییری نمی‌کنند.",
    date: "۲۷ آبان ۱۴۰۵",
    readTime: 1,
    category: "اطلاعیه",
    categoryIcon: Megaphone,
    accent: "text-error",
    accentBg: "bg-error/10",
    accentText: "bg-error",
    emoji: "🔔",
    hot: false,
  },
]

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.07, duration: 0.4, ease: "easeOut" },
  }),
}

const modalVariants: Variants = {
  hidden: { opacity: 0, scale: 0.93, y: 16 },
  show: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 280, damping: 24 } },
  exit: { opacity: 0, scale: 0.96, y: 8, transition: { duration: 0.16 } },
}

export default function SchoolNews() {
  const [selected, setSelected] = useState<NewsItem | null>(null)
  const [activeCategory, setActiveCategory] = useState<string>("همه")

  const categories = ["همه", ...Array.from(new Set(news.map((n) => n.category)))]

  const filtered =
    activeCategory === "همه" ? news : news.filter((n) => n.category === activeCategory)

  return (
    <div dir="rtl" className="min-h-screen bg-base-200 overflow-x-hidden">

      {/* ===== Hero ===== */}
      <section className="relative overflow-hidden px-4 pt-16 pb-10 text-center">
        <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
          <motion.div
            animate={{ x: [0, 20, 0], y: [0, -14, 0] }}
            transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-primary/10 blur-3xl"
          />
          <motion.div
            animate={{ x: [0, -18, 0], y: [0, 12, 0] }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full bg-secondary/10 blur-3xl"
          />
        </div>

        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-base-100 shadow-md mb-5"
        >
          <Megaphone className="w-8 h-8 text-primary" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.45 }}
          className="text-3xl sm:text-4xl lg:text-5xl font-black mb-3"
        >
          اخبار{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-l from-primary to-secondary">
            مدرسه
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18, duration: 0.45 }}
          className="text-base-content/55 text-sm sm:text-base max-w-xs mx-auto"
        >
          آخرین اطلاعیه‌ها و رویدادهای مدرسه رو اینجا دنبال کن
        </motion.p>
      </section>

      {/* ===== Category Filter ===== */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.4 }}
          className="flex gap-2 flex-wrap"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`btn btn-sm rounded-full transition-all ${
                activeCategory === cat
                  ? "btn-primary"
                  : "btn-ghost border border-base-300"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>
      </section>

      {/* ===== News Grid ===== */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-24">
        <AnimatePresence mode="popLayout">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((item, i) => {
              const Icon = item.categoryIcon
              return (
                <motion.article
                  key={item.id}
                  layout
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: "-40px" }}
                  custom={i}
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 280, damping: 20 }}
                  onClick={() => setSelected(item)}
                  className="card bg-base-100 border border-base-300/60 shadow-sm hover:shadow-lg transition-shadow rounded-2xl cursor-pointer overflow-hidden group relative"
                >
                  {/* hot badge */}
                  {item.hot && (
                    <span className="absolute top-3 left-3 badge badge-error badge-sm gap-1 z-10">
                      🔥 داغ
                    </span>
                  )}

                  {/* top accent */}
                  <div className={`h-1 w-full ${item.accentText}`} />

                  <div className="card-body p-5 gap-0">

                    {/* emoji + category */}
                    <div className="flex items-start justify-between mb-3">
                      <motion.span
                        whileHover={{ rotate: [0, -8, 8, 0] }}
                        transition={{ duration: 0.5 }}
                        className={`text-2xl w-11 h-11 rounded-xl ${item.accentBg} flex items-center justify-center`}
                      >
                        {item.emoji}
                      </motion.span>
                      <span className={`badge badge-outline text-xs ${item.accent}`}>
                        <Icon className="w-3 h-3 ml-1" />
                        {item.category}
                      </span>
                    </div>

                    {/* title */}
                    <h2 className="font-bold text-base leading-snug mb-2 line-clamp-2">
                      {item.title}
                    </h2>

                    {/* summary */}
                    <p className="text-sm text-base-content/55 leading-relaxed line-clamp-2 mb-4">
                      {item.summary}
                    </p>

                    {/* footer */}
                    <div className="flex items-center justify-between mt-auto">
                      <span className="flex items-center gap-1 text-xs text-base-content/50">
                        <Calendar className="w-3.5 h-3.5" />
                        {item.date}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-base-content/50">
                        <Clock className="w-3.5 h-3.5" />
                        {item.readTime} دقیقه
                      </span>
                    </div>

                    {/* CTA */}
                    <div className="card-actions justify-end mt-3">
                      <button
                        className={`btn btn-sm rounded-xl gap-1.5 ${item.accentText} text-base-100 border-none group-hover:scale-105 transition-transform`}
                      >
                        <BookOpen className="w-3.5 h-3.5" />
                        بیشتر بخوان
                      </button>
                    </div>

                  </div>
                </motion.article>
              )
            })}
          </div>
        </AnimatePresence>

        {filtered.length === 0 && (
          <div className="text-center py-24 text-base-content/40">
            <Megaphone className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p>خبری در این دسته‌بندی نیست.</p>
          </div>
        )}
      </section>

      {/* ===== Modal ===== */}
      <AnimatePresence>
        {selected && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelected(null)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            />

            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div
                variants={modalVariants}
                initial="hidden"
                animate="show"
                exit="exit"
                className="bg-base-100 rounded-3xl shadow-2xl w-full max-w-md overflow-hidden max-h-[90vh] flex flex-col"
              >
                <div className={`h-1.5 w-full flex-shrink-0 ${selected.accentText}`} />

                <div className="p-6 flex flex-col gap-4 overflow-y-auto">

                  {/* top row */}
                  <div className="flex items-start justify-between">
                    <span
                      className={`text-3xl w-12 h-12 rounded-2xl ${selected.accentBg} flex items-center justify-center flex-shrink-0`}
                    >
                      {selected.emoji}
                    </span>
                    <button
                      onClick={() => setSelected(null)}
                      className="btn btn-ghost btn-sm btn-circle"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  {/* category + meta */}
                  <div className="flex items-center gap-2 flex-wrap">
                    {selected.hot && (
                      <span className="badge badge-error badge-sm">🔥 داغ</span>
                    )}
                    <span className={`badge badge-outline text-xs ${selected.accent}`}>
                      {selected.category}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-base-content/50 mr-auto">
                      <Calendar className="w-3.5 h-3.5" />
                      {selected.date}
                    </span>
                  </div>

                  {/* title */}
                  <h2 className="text-xl font-black leading-snug">{selected.title}</h2>

                  <div className="divider my-0" />

                  {/* body */}
                  <p className="text-base-content/70 text-sm leading-loose">
                    {selected.body}
                  </p>

                  {/* stat row */}
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { icon: Clock, label: "زمان مطالعه", value: `${selected.readTime} دقیقه` },
                      { icon: Calendar, label: "تاریخ", value: selected.date },
                    ].map(({ icon: Icon, label, value }) => (
                      <div
                        key={label}
                        className="bg-base-200 rounded-2xl p-3 flex flex-col items-center gap-1"
                      >
                        <Icon className={`w-5 h-5 ${selected.accent}`} />
                        <span className="font-bold text-sm">{value}</span>
                        <span className="text-xs text-base-content/50">{label}</span>
                      </div>
                    ))}
                  </div>

                  {/* close */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => setSelected(null)}
                      className="btn btn-ghost flex-1 rounded-xl gap-1.5"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      برگشت
                    </button>
                    <button
                      className={`btn flex-1 rounded-xl gap-1.5 ${selected.accentText} text-base-100 border-none`}
                    >
                      <Megaphone className="w-4 h-4" />
                      اشتراک خبرنامه
                    </button>
                  </div>

                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
