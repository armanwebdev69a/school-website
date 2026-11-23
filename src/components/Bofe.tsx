// Bofe.tsx
import { useState } from "react"
import { motion, AnimatePresence, type Variants } from "framer-motion"
import {
  ShoppingCart, Plus, Minus, Trash2, X,
  ShoppingBag, Package, CheckCircle
} from "lucide-react"

interface Product {
  id: number
  name: string
  price: number
  emoji: string
  category: string
  accent: string
  accentBg: string
  accentText: string
}

interface CartItem extends Product {
  qty: number
}

const products: Product[] = [
  {
    id: 1, name: "ساندویچ مرغ", price: 35000, emoji: "🥪",
    category: "غذا",
    accent: "text-warning", accentBg: "bg-warning/10", accentText: "bg-warning",
  },
  {
    id: 2, name: "پیتزا", price: 42000, emoji: "🍕",
    category: "غذا",
    accent: "text-error", accentBg: "bg-error/10", accentText: "bg-error",
  },
  {
    id: 3, name: "نوشابه", price: 12000, emoji: "🥤",
    category: "نوشیدنی",
    accent: "text-info", accentBg: "bg-info/10", accentText: "bg-info",
  },
  {
    id: 4, name: "آب میوه", price: 15000, emoji: "🧃",
    category: "نوشیدنی",
    accent: "text-success", accentBg: "bg-success/10", accentText: "bg-success",
  },
  {
    id: 5, name: "چیپس", price: 8000, emoji: "🍟",
    category: "تنقلات",
    accent: "text-warning", accentBg: "bg-warning/10", accentText: "bg-warning",
  },
  {
    id: 6, name: "شکلات", price: 18000, emoji: "🍫",
    category: "تنقلات",
    accent: "text-secondary", accentBg: "bg-secondary/10", accentText: "bg-secondary",
  },
  {
    id: 7, name: "کیک", price: 22000, emoji: "🍰",
    category: "دسر",
    accent: "text-pink-500", accentBg: "bg-pink-500/10", accentText: "bg-pink-500",
  },
  {
    id: 8, name: "بستنی", price: 20000, emoji: "🍦",
    category: "دسر",
    accent: "text-primary", accentBg: "bg-primary/10", accentText: "bg-primary",
  },
]

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.06, duration: 0.38, ease: "easeOut" },
  }),
}

const cartVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95, y: 12 },
  show: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 26 } },
  exit: { opacity: 0, scale: 0.97, y: 8, transition: { duration: 0.15 } },
}

function fmt(n: number) {
  return n.toLocaleString("fa-IR") + " تومان"
}

export default function Bofe() {
  const [cart, setCart] = useState<CartItem[]>([])
  const [cartOpen, setCartOpen] = useState(false)
  const [ordered, setOrdered] = useState(false)
  const [activeCategory, setActiveCategory] = useState("همه")

  const categories = ["همه", ...Array.from(new Set(products.map((p) => p.category)))]
  const filtered = activeCategory === "همه" ? products : products.filter((p) => p.category === activeCategory)

  const totalQty = cart.reduce((s, i) => s + i.qty, 0)
  const totalPrice = cart.reduce((s, i) => s + i.price * i.qty, 0)

  function addToCart(product: Product) {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === product.id)
      if (existing) return prev.map((i) => i.id === product.id ? { ...i, qty: i.qty + 1 } : i)
      return [...prev, { ...product, qty: 1 }]
    })
  }

  function changeQty(id: number, delta: number) {
    setCart((prev) =>
      prev
        .map((i) => i.id === id ? { ...i, qty: i.qty + delta } : i)
        .filter((i) => i.qty > 0)
    )
  }

  function removeFromCart(id: number) {
    setCart((prev) => prev.filter((i) => i.id !== id))
  }

  function handleOrder() {
    setOrdered(true)
    setCart([])
    setTimeout(() => {
      setOrdered(false)
      setCartOpen(false)
    }, 2200)
  }

  const qtyInCart = (id: number) => cart.find((i) => i.id === id)?.qty ?? 0

  return (
    <div dir="rtl" className="min-h-screen bg-base-200 overflow-x-hidden">

      {/* ===== Hero ===== */}
      <section className="relative overflow-hidden px-4 pt-16 pb-10 text-center">
        <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
          <motion.div
            animate={{ x: [0, 18, 0], y: [0, -12, 0] }}
            transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-warning/10 blur-3xl"
          />
          <motion.div
            animate={{ x: [0, -16, 0], y: [0, 14, 0] }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full bg-primary/10 blur-3xl"
          />
        </div>

        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-base-100 shadow-md mb-5"
        >
          <ShoppingBag className="w-8 h-8 text-warning" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.45 }}
          className="text-3xl sm:text-4xl lg:text-5xl font-black mb-3"
        >
          بوفه‌ی{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-l from-warning to-error">
            مدرسه
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18, duration: 0.45 }}
          className="text-base-content/55 text-sm sm:text-base max-w-xs mx-auto"
        >
          سفارش بده، تحویل بگیر، لذت ببر 🎉
        </motion.p>
      </section>

      {/* ===== Category Filter ===== */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-5">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.22, duration: 0.38 }}
          className="flex gap-2 flex-wrap"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`btn btn-sm rounded-full transition-all ${
                activeCategory === cat ? "btn-warning" : "btn-ghost border border-base-300"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>
      </section>

      {/* ===== Products Grid ===== */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-32">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((product, i) => {
            const qty = qtyInCart(product.id)
            return (
              <motion.div
                key={product.id}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-30px" }}
                custom={i}
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
                className="card bg-base-100 border border-base-300/60 shadow-sm hover:shadow-md transition-shadow rounded-2xl overflow-hidden"
              >
                <div className={`h-1 w-full ${product.accentText}`} />
                <div className="card-body p-4 gap-0 items-center text-center">

                  <motion.span
                    whileHover={{ scale: 1.15, rotate: [-3, 3, 0] }}
                    transition={{ duration: 0.4 }}
                    className={`text-3xl w-14 h-14 rounded-2xl ${product.accentBg} flex items-center justify-center mb-3`}
                  >
                    {product.emoji}
                  </motion.span>

                  <h3 className="font-bold text-sm mb-1 leading-tight">{product.name}</h3>
                  <span className={`text-xs badge badge-outline mb-3 ${product.accent}`}>
                    {product.category}
                  </span>
                  <p className="font-black text-base mb-3">{fmt(product.price)}</p>

                  {qty === 0 ? (
                    <button
                      onClick={() => addToCart(product)}
                      className={`btn btn-sm w-full rounded-xl gap-1.5 ${product.accentText} text-base-100 border-none`}
                    >
                      <Plus className="w-4 h-4" />
                      افزودن
                    </button>
                  ) : (
                    <div className="flex items-center justify-between w-full gap-1">
                      <button
                        onClick={() => changeQty(product.id, -1)}
                        className="btn btn-sm btn-ghost btn-circle border border-base-300"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="font-black text-lg w-6 text-center">{qty}</span>
                      <button
                        onClick={() => changeQty(product.id, 1)}
                        className={`btn btn-sm btn-circle border-none ${product.accentText} text-base-100`}
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}

                </div>
              </motion.div>
            )
          })}
        </div>
      </section>

      {/* ===== Floating Cart Button ===== */}
      <AnimatePresence>
        {totalQty > 0 && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setCartOpen(true)}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30 btn btn-warning rounded-2xl shadow-xl gap-3 px-6 h-14 text-base"
          >
            <div className="relative">
              <ShoppingCart className="w-5 h-5" />
              <span className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-error text-white text-[10px] font-black flex items-center justify-center">
                {totalQty}
              </span>
            </div>
            مشاهده سبد خرید
            <span className="font-black opacity-80 text-sm">{fmt(totalPrice)}</span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* ===== Cart Popup ===== */}
      <AnimatePresence>
        {cartOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setCartOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            />

            <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
              <motion.div
                variants={cartVariants}
                initial="hidden"
                animate="show"
                exit="exit"
                className="bg-base-100 rounded-t-3xl sm:rounded-3xl shadow-2xl w-full sm:max-w-md max-h-[85vh] flex flex-col overflow-hidden"
              >
                {/* Cart Header */}
                <div className="flex items-center justify-between px-5 py-4 border-b border-base-300">
                  <div className="flex items-center gap-2">
                    <ShoppingCart className="w-5 h-5 text-warning" />
                    <h2 className="font-black text-lg">سبد خرید</h2>
                    <span className="badge badge-warning badge-sm">{totalQty} عدد</span>
                  </div>
                  <button
                    onClick={() => setCartOpen(false)}
                    className="btn btn-ghost btn-sm btn-circle"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Cart Body */}
                <div className="flex-1 overflow-y-auto px-5 py-3">
                  {ordered ? (
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="flex flex-col items-center justify-center gap-3 py-12"
                    >
                      <CheckCircle className="w-16 h-16 text-success" />
                      <p className="font-black text-xl text-success">سفارش ثبت شد! 🎉</p>
                      <p className="text-base-content/50 text-sm">به زودی آماده‌ست</p>
                    </motion.div>
                  ) : cart.length === 0 ? (
                    <div className="flex flex-col items-center justify-center gap-3 py-12 text-base-content/40">
                      <Package className="w-14 h-14 opacity-30" />
                      <p>سبدت خالیه!</p>
                    </div>
                  ) : (
                    <AnimatePresence>
                      {cart.map((item) => (
                        <motion.div
                          key={item.id}
                          layout
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20, transition: { duration: 0.18 } }}
                          className="flex items-center gap-3 py-3 border-b border-base-200 last:border-0"
                        >
                          <span className={`text-xl w-10 h-10 rounded-xl ${item.accentBg} flex items-center justify-center flex-shrink-0`}>
                            {item.emoji}
                          </span>

                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-sm truncate">{item.name}</p>
                            <p className={`text-xs ${item.accent}`}>{fmt(item.price)}</p>
                          </div>

                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => changeQty(item.id, -1)}
                              className="btn btn-xs btn-ghost btn-circle border border-base-300"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="font-black w-5 text-center text-sm">{item.qty}</span>
                            <button
                              onClick={() => changeQty(item.id, 1)}
                              className={`btn btn-xs btn-circle border-none ${item.accentText} text-base-100`}
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="btn btn-ghost btn-xs btn-circle text-error"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  )}
                </div>

                {/* Cart Footer */}
                {!ordered && cart.length > 0 && (
                  <div className="px-5 py-4 border-t border-base-300 flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                      <span className="text-base-content/60 text-sm">جمع کل</span>
                      <span className="font-black text-lg">{fmt(totalPrice)}</span>
                    </div>
                    <button
                      onClick={handleOrder}
                      className="btn btn-warning w-full rounded-xl gap-2 h-12"
                    >
                      <CheckCircle className="w-5 h-5" />
                      ثبت سفارش
                    </button>
                  </div>
                )}
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
