// Home.tsx
import { Link } from "react-router-dom"
import { motion, useScroll, useTransform } from "framer-motion"
import { GraduationCap, BookOpen, Library, Sparkles, ArrowLeft, Users, Clock, Star, ChevronDown, Newspaper, Megaphone } from "lucide-react"
import { MdSchool } from "react-icons/md"
import { FaBookReader } from "react-icons/fa"

const sections = [
  {
    title: "بوفه",
    subtitle: "منوی خوشمزه مدرسه",
    desc: "لیست خوراکیها، قیمتها و ساعت کاری بوفه مدرسه رو اینجا ببین.",
    path: "/Bofe",
    icon: Sparkles,
    badge: "روزانه آپدیت میشه",
    accent: "text-primary",
    bg: "bg-primary/10",
  },
  {
    title: "اخبار مدرسه",
    subtitle: "خبرهای تازه و اطلاعیهها",
    desc: "آخرین خبرهای مدرسه، اطلاعیهها و برنامههای پیشرو رو از دست نده.",
    path: "/News",
    icon: Megaphone,
    badge: "همیشه بهروز",
    accent: "text-secondary",
    bg: "bg-secondary/10",
  },
  {
    title: "کتابخونه",
    subtitle: "قفسهی کتابهای ما",
    desc: "کتابهای موجود رو ببین، بخون و درگیر سفرهای تازه شروع کن.",
    path: "/bookShelf",
    icon: Library,
    badge: "۶ کتاب موجود",
    accent: "text-accent",
    bg: "bg-accent/10",
  },
]

const stats = [
  { icon: Users, label: "دانشآموز", value: "۴۵۰+" },
  { icon: BookOpen, label: "کتاب", value: "۶" },
  { icon: Clock, label: "ساعت مطالعه", value: "۲۴/۷" },
  { icon: Star, label: "امتیاز مدرسه", value: "۴.۸" },
]

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" },
  }),
}

export default function Home() {
  const { scrollY } = useScroll()
  const yBlob = useTransform(scrollY, [0, 300], [0, 60])

  return (
    <div dir="rtl" className="min-h-screen bg-base-200 overflow-x-hidden">

      {/* ===== Hero ===== */}
      <section className="relative min-h-[90dvh] flex flex-col items-center justify-center px-4 py-20 overflow-hidden">

        {/* blobs */}
        <motion.div
          style={{ y: yBlob }}
          className="pointer-events-none absolute inset-0 -z-10"
          aria-hidden
        >
          <motion.div
            animate={{ x: [0, 20, 0], y: [0, -15, 0] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[-4rem] right-[-4rem] w-64 h-64 sm:w-96 sm:h-96 rounded-full bg-primary/15 blur-3xl"
          />
          <motion.div
            animate={{ x: [0, -25, 0], y: [0, 20, 0] }}
            transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-[-4rem] left-[-4rem] w-56 h-56 sm:w-80 sm:h-80 rounded-full bg-secondary/15 blur-3xl"
          />
        </motion.div>

        {/* floating icon badges */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 180, damping: 14 }}
          className="flex gap-3 mb-6 text-2xl sm:text-3xl"
        >
          {[
            { Icon: MdSchool, color: "text-primary", delay: 0 },
            { Icon: FaBookReader, color: "text-secondary", delay: 0.3 },
            { Icon: Megaphone, color: "text-accent", delay: 0.6 },
          ].map(({ Icon, color, delay }) => (
            <motion.span
              key={color}
              animate={{ y: [0, -7, 0] }}
              transition={{ duration: 2.5 + delay, repeat: Infinity, delay }}
              className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-base-100 shadow flex items-center justify-center ${color}`}
            >
              <Icon className="w-6 h-6 sm:w-7 sm:h-7" />
            </motion.span>
          ))}
        </motion.div>

        {/* headline */}
        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={1}
          className="text-3xl sm:text-5xl lg:text-6xl font-black text-center leading-snug max-w-2xl"
        >
          به{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-l from-primary to-secondary">
            پورتال مدرسه
          </span>{" "}
          خوش اومدی 👋
        </motion.h1>

        {/* subtitle */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={2}
          className="mt-4 text-sm sm:text-base text-base-content/60 text-center max-w-xs sm:max-w-md leading-relaxed"
        >
          همهچیز دربارهی مدرسهت یهجاست؛ بوفه، اخبار، و کتابخونه.
        </motion.p>

        {/* CTA */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={3}
          className="mt-8 flex flex-wrap justify-center gap-3"
        >
          <Link to="/bookShelf" className="btn btn-primary rounded-xl gap-2">
            شروع کن <ArrowLeft className="w-4 h-4" />
          </Link>
          <a href="#sections" className="btn btn-ghost rounded-xl gap-2">
            بیشتر ببین <ChevronDown className="w-4 h-4" />
          </a>
        </motion.div>

        {/* stats grid — 2×2 on mobile, 4 cols on sm+ */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-3 w-full max-w-sm sm:max-w-lg"
        >
          {stats.map((s) => (
            <div
              key={s.label}
              className="bg-base-100 border border-base-300/60 rounded-2xl p-4 flex flex-col items-center gap-1 shadow-sm"
            >
              <s.icon className="w-5 h-5 text-primary" />
              <span className="text-xl font-bold">{s.value}</span>
              <span className="text-xs text-base-content/50">{s.label}</span>
            </div>
          ))}
        </motion.div>
      </section>

      {/* ===== Section cards ===== */}
      <section id="sections" className="max-w-6xl mx-auto px-4 sm:px-6 pb-20">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-2xl sm:text-3xl font-bold mb-2">دنبال چی میگردی؟ 🤔</h2>
          <p className="text-base-content/60 text-sm sm:text-base">یکی از بخشها رو انتخاب کن</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {sections.map((sec, i) => (
            <motion.div
              key={sec.path}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
              custom={i}
              whileHover={{ y: -8 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="card bg-base-100 border border-base-300/60 shadow-sm hover:shadow-xl transition-shadow rounded-2xl"
            >
              <Link to={sec.path} className="block">
                <div className="card-body gap-4">
                  <div className="flex items-start justify-between">
                    <div className={`w-13 h-13 rounded-2xl ${sec.bg} flex items-center justify-center p-3`}>
                      <sec.icon className={`w-7 h-7 ${sec.accent}`} />
                    </div>
                    <span className="badge badge-outline text-xs gap-1">
                      <Sparkles className="w-3 h-3" />
                      {sec.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className="card-title text-lg">{sec.title}</h3>
                    <p className="text-sm text-base-content/60 mt-0.5">{sec.subtitle}</p>
                  </div>

                  <p className="text-sm text-base-content/50 leading-relaxed">{sec.desc}</p>

                  <div className="card-actions justify-end">
                    <span className="btn btn-ghost btn-sm gap-1">
                      بریم ببینیم
                      <motion.span
                        animate={{ x: [0, -4, 0] }}
                        transition={{ duration: 1.2, repeat: Infinity }}
                      >
                        <ArrowLeft className="w-4 h-4" />
                      </motion.span>
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ===== Bottom CTA ===== */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="rounded-3xl bg-gradient-to-l from-primary/15 via-base-100 to-secondary/15 border border-base-300/60 p-8 sm:p-12 text-center"
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity }}
            className="text-4xl mb-4 inline-block"
          >
            📚
          </motion.div>
          <h2 className="text-xl sm:text-3xl font-bold mb-3">
            آمادهی یه سفر کتابی جدید هستی؟
          </h2>
          <p className="text-base-content/60 text-sm sm:text-base max-w-md mx-auto mb-6">
            توی کتابخونهمون شش تا کتاب باحال منتظرتن. یه سر بزن!
          </p>
          <Link to="/bookShelf" className="btn btn-primary rounded-xl gap-2">
            <Library className="w-5 h-5" />
            کتابخونه رو باز کن
          </Link>
        </motion.div>
      </section>
    </div>
  )
}
