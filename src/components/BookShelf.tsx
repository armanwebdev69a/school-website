// BookShelf.tsx
import { useState } from "react"
import { motion, AnimatePresence, type Variants } from "framer-motion"
import { BookOpen, User, FileText, Star, X, ChevronLeft, Library } from "lucide-react"

interface Book {
  id: number
  name: string
  author: string
  description: string
  pages: number
  emoji: string
  genre: string
  rating: number
  accent: string
  accentBg: string
  accentText: string
}

const books: Book[] = [
  {
    id: 1,
    name: "بینوایان",
    author: "ویکتور هوگو",
    description: "داستان ژان والژان، مردی که بعد از سال‌ها زندان دنبال رستگاری می‌گرده. یکی از بزرگ‌ترین رمان‌های تاریخ ادبیات جهانه.",
    pages: 1232,
    emoji: "🏰",
    genre: "کلاسیک",
    rating: 5,
    accent: "text-primary",
    accentBg: "bg-primary/10",
    accentText: "bg-primary",
  },
  {
    id: 2,
    name: "پیرمرد و دریا",
    author: "ارنست همینگوی",
    description: "داستان کوتاه اما عمیق یک ماهیگیر پیر که با بزرگ‌ترین ماهی زندگیش دست و پنجه نرم می‌کنه.",
    pages: 127,
    emoji: "🌊",
    genre: "ادبیات مدرن",
    rating: 4,
    accent: "text-secondary",
    accentBg: "bg-secondary/10",
    accentText: "bg-secondary",
  },
  {
    id: 3,
    name: "شازده کوچولو",
    author: "آنتوان دو سنت‌اگزوپری",
    description: "داستانی که ظاهراً برای بچه‌هاست ولی عمیق‌ترین درس‌های زندگی رو به بزرگ‌ترها می‌ده.",
    pages: 96,
    emoji: "⭐",
    genre: "فلسفی",
    rating: 5,
    accent: "text-accent",
    accentBg: "bg-accent/10",
    accentText: "bg-accent",
  },
  {
    id: 4,
    name: "جنایت و مکافات",
    author: "داستایوفسکی",
    description: "روایت روس‌کولنیکف، دانشجویی که یه قتل مرتکب می‌شه و با وجدانش درگیر می‌مونه.",
    pages: 671,
    emoji: "🪓",
    genre: "روانشناختی",
    rating: 5,
    accent: "text-error",
    accentBg: "bg-error/10",
    accentText: "bg-error",
  },
  {
    id: 5,
    name: "مزرعه‌ی حیوانات",
    author: "جورج اورول",
    description: "تمثیلی تیز از قدرت و فساد که از زبان حیوانات یه مزرعه روایت می‌شه. کوتاه و کوبنده.",
    pages: 112,
    emoji: "🐷",
    genre: "طنز",
    rating: 4,
    accent: "text-warning",
    accentBg: "bg-warning/10",
    accentText: "bg-warning",
  },
  {
    id: 6,
    name: "صد سال تنهایی",
    author: "گابریل گارسیا مارکز",
    description: "حماسه‌ی خانواده‌ی بوئندیا در شهر ماکوندو، جایی که واقعیت و جادو درهم می‌آمیزن.",
    pages: 417,
    emoji: "🌀",
    genre: "رئالیسم جادویی",
    rating: 5,
    accent: "text-success",
    accentBg: "bg-success/10",
    accentText: "bg-success",
  },
]

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.45, ease: "easeOut" },
  }),
}

const modalVariants: Variants = {
  hidden: { opacity: 0, scale: 0.92, y: 20 },
  show: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 260, damping: 22 } },
  exit: { opacity: 0, scale: 0.95, y: 10, transition: { duration: 0.18 } },
}

function Stars({ rating, size = "sm" }: { rating: number; size?: "sm" | "md" }) {
  const cls = size === "sm" ? "w-3.5 h-3.5" : "w-4 h-4"
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`${cls} ${i < rating ? "fill-warning text-warning" : "text-base-300"}`}
        />
      ))}
    </div>
  )
}

export default function BookShelf() {
  const [selected, setSelected] = useState<Book | null>(null)

  return (
    <div dir="rtl" className="min-h-screen bg-base-200 overflow-x-hidden">

      {/* ===== Hero header ===== */}
      <section className="relative overflow-hidden px-4 pt-16 pb-12 text-center">
        <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
          <motion.div
            animate={{ x: [0, 18, 0], y: [0, -12, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-16 -right-16 w-72 h-72 rounded-full bg-primary/10 blur-3xl"
          />
          <motion.div
            animate={{ x: [0, -20, 0], y: [0, 14, 0] }}
            transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full bg-secondary/10 blur-3xl"
          />
        </div>

        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-base-100 shadow-md mb-5"
        >
          <Library className="w-8 h-8 text-primary" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="text-3xl sm:text-4xl lg:text-5xl font-black mb-3"
        >
          کتابخونه‌ی{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-l from-primary to-secondary">
            مدرسه
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-base-content/60 text-sm sm:text-base max-w-sm mx-auto"
        >
          {books.length} کتاب موجوده — روی هر کدوم کلیک کن و بیشتر بدون
        </motion.p>
      </section>

      {/* ===== Grid ===== */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {books.map((book, i) => (
            <motion.div
              key={book.id}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-50px" }}
              custom={i}
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 280, damping: 20 }}
              onClick={() => setSelected(book)}
              className="card bg-base-100 border border-base-300/60 shadow-sm hover:shadow-lg transition-shadow rounded-2xl cursor-pointer overflow-hidden group"
            >
              {/* top accent line */}
              <div className={`h-1 w-full ${book.accentText}`} />

              <div className="card-body p-5 gap-0">

                {/* row 1: emoji + badge */}
                <div className="flex items-start justify-between mb-3">
                  <motion.span
                    whileHover={{ rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 0.5 }}
                    className={`text-3xl w-12 h-12 rounded-xl ${book.accentBg} flex items-center justify-center`}
                  >
                    {book.emoji}
                  </motion.span>
                  <span className={`badge badge-outline text-xs ${book.accent}`}>
                    {book.genre}
                  </span>
                </div>

                {/* row 2: title + author */}
                <h2 className="card-title text-base leading-snug mb-0.5">{book.name}</h2>
                <p className={`text-xs font-semibold mb-3 ${book.accent}`}>{book.author}</p>

                {/* row 3: description */}
                <p className="text-sm text-base-content/55 leading-relaxed line-clamp-2 mb-4">
                  {book.description}
                </p>

                {/* row 4: stars + pages */}
                <div className="flex items-center justify-between">
                  <Stars rating={book.rating} />
                  <span className="flex items-center gap-1 text-xs text-base-content/50">
                    <FileText className="w-3.5 h-3.5" />
                    {book.pages} صفحه
                  </span>
                </div>

                {/* row 5: CTA */}
                <div className="card-actions justify-end mt-3">
                  <button
                    className={`btn btn-sm rounded-xl gap-1.5 ${book.accentText} text-base-100 border-none group-hover:scale-105 transition-transform`}
                  >
                    <BookOpen className="w-4 h-4" />
                    بیشتر بدون
                  </button>
                </div>

              </div>
            </motion.div>
          ))}
        </div>
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
                className="bg-base-100 rounded-3xl shadow-2xl w-full max-w-md overflow-hidden"
              >
                <div className={`h-1.5 w-full ${selected.accentText}`} />

                <div className="p-6 flex flex-col gap-4">

                  {/* top */}
                  <div className="flex items-start justify-between">
                    <span
                      className={`text-4xl w-14 h-14 rounded-2xl ${selected.accentBg} flex items-center justify-center`}
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

                  {/* title */}
                  <div>
                    <h2 className="text-2xl font-black">{selected.name}</h2>
                    <p className={`text-sm font-semibold mt-1 flex items-center gap-1.5 ${selected.accent}`}>
                      <User className="w-4 h-4" />
                      {selected.author}
                    </p>
                  </div>

                  {/* genre + stars */}
                  <div className="flex items-center gap-3">
                    <span className={`badge badge-outline ${selected.accent}`}>{selected.genre}</span>
                    <Stars rating={selected.rating} size="md" />
                  </div>

                  <div className="divider my-0" />

                  {/* description */}
                  <p className="text-base-content/70 text-sm leading-relaxed">
                    {selected.description}
                  </p>

                  {/* stat cards */}
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { icon: FileText, label: "صفحه", value: String(selected.pages) },
                      { icon: Star, label: "امتیاز", value: `${selected.rating}/5` },
                      { icon: BookOpen, label: "وضعیت", value: "موجود" },
                    ].map(({ icon: Icon, label, value }) => (
                      <div
                        key={label}
                        className="bg-base-200 rounded-2xl p-3 flex flex-col items-center gap-1"
                      >
                        <Icon className={`w-5 h-5 ${selected.accent}`} />
                        <span className="font-bold text-base">{value}</span>
                        <span className="text-xs text-base-content/50">{label}</span>
                      </div>
                    ))}
                  </div>

                  {/* actions */}
                  <div className="flex gap-2">
                    <button
                      className={`btn flex-1 rounded-xl gap-2 ${selected.accentText} text-base-100 border-none`}
                    >
                      <BookOpen className="w-4 h-4" />
                      شروع مطالعه
                    </button>
                    <button
                      onClick={() => setSelected(null)}
                      className="btn btn-ghost rounded-xl gap-1.5"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      برگشت
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
