import { useState } from 'react'
import { Search } from 'lucide-react'
import Navbar from '../components/Navbar'
import SentoLogo from '../components/SentoLogo'

const COVER = 'https://www.figma.com/api/mcp/asset/a0023608-4bab-4583-9aff-0b0f5c571af4'

const FEATURED = [
  { id: 1, tag: 'Producto', title: 'Título principal del blog', excerpt: 'Subtítulo o primeras líneas de lo que habla el blog', img: COVER },
  { id: 2, tag: 'Producto', title: 'Título principal del blog', excerpt: 'Subtítulo o primeras líneas de lo que habla el blog', img: COVER },
  { id: 3, tag: 'Producto', title: 'Título principal del blog', excerpt: 'Subtítulo o primeras líneas de lo que habla el blog', img: COVER },
  { id: 4, tag: 'Producto', title: 'Título principal del blog', excerpt: 'Subtítulo o primeras líneas de lo que habla el blog', img: COVER },
]

const RECENT = Array.from({ length: 7 }, (_, i) => ({
  id: i + 1,
  date: 'May 10, 2026',
  title: 'Título principal del blog',
  excerpt: 'Subtítulo o primeras líneas de lo que habla el blog',
  img: COVER,
}))

type Theme = 'light' | 'dark'

export default function Blog() {
  const [theme] = useState<Theme>('light')
  const [query, setQuery] = useState('')
  const isDark = theme === 'dark'

  return (
    <div className={`min-h-screen flex flex-col ${isDark ? 'bg-navy-deep' : 'bg-white'}`}>
      <Navbar />

      <main className="flex-1 flex flex-col gap-10 sm:gap-14 lg:gap-[80px] xl:gap-[120px] px-4 sm:px-6 lg:px-[60px] py-8 sm:py-10 lg:py-12 max-w-[1480px] mx-auto w-full">

        {/* ── Hero header ── */}
        <section
          className={`flex flex-col items-center gap-8 sm:gap-10 lg:gap-14 text-center ${
            isDark ? 'rounded-2xl shadow-card px-4 sm:px-8 py-10 sm:py-12 lg:py-16' : ''
          }`}
          style={isDark ? {
            background: 'radial-gradient(ellipse at bottom left, #21e0e0 0%, #12bcbf 12%, #03989e 23%, #025e82 36%, #014174 42%, #002466 49%, #001948 61%, #000e29 73%, #00040a 100%)',
          } : undefined}
        >
          {/* Logo + Blog wordmark */}
          <div className="relative inline-flex items-center">
            <SentoLogo dark={!isDark} size="lg" />
            <span
              className="font-bold italic ml-1"
              style={{
                fontSize: '2rem',
                lineHeight: 1,
                background: 'linear-gradient(135deg, #03989e 0%, #21e0e0 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontFamily: 'Georgia, serif',
              }}
            >
              Blog
            </span>
          </div>

          {/* Titles */}
          <div className="flex flex-col gap-3 sm:gap-4 lg:gap-6 max-w-[640px] px-2">
            <h1 className={`text-3xl sm:text-5xl lg:text-display-l font-bold leading-tight ${isDark ? 'text-white' : 'text-slate-700'}`}>
              Descubre todas nuestras novedades
            </h1>
            <p className={`text-sm sm:text-title-l font-medium ${isDark ? 'text-slate-50/80' : 'text-slate-400'}`}>
              Descubre todas las novedades sobre nuestros clientes, industria y producto en un solo lugar
            </p>
          </div>

          {/* Search */}
          <div className="flex gap-3 sm:gap-4 items-center w-full max-w-[640px]">
            <div
              className={`flex-1 flex items-center gap-3 px-3 sm:px-4 py-2 rounded-lg border ${
                isDark
                  ? 'backdrop-blur-sm bg-white/10 border-slate-200/30'
                  : 'bg-white border-slate-200'
              }`}
            >
              <Search size={18} className={isDark ? 'text-slate-50/60 shrink-0' : 'text-slate-400 shrink-0'} />
              <input
                className={`flex-1 bg-transparent outline-none text-sm sm:text-label-xl min-w-0 ${
                  isDark ? 'placeholder-slate-50/50 text-white' : 'placeholder-slate-400 text-slate-700'
                }`}
                placeholder="Nuevas herramientas"
                value={query}
                onChange={e => setQuery(e.target.value)}
              />
            </div>
            <button className="btn-primary shrink-0">Buscar</button>
          </div>
        </section>

        {/* ── Content ── */}
        {/* On mobile: stack vertically (featured then recent).
            On lg: side by side */}
        <section className="flex flex-col lg:flex-row gap-10 sm:gap-12 lg:gap-16 items-start">

          {/* Featured */}
          <div className="flex-1 flex flex-col gap-6 sm:gap-8 lg:gap-10 min-w-0">
            <h2 className={`text-xl sm:text-headline-m font-medium ${isDark ? 'text-white' : 'text-slate-700'}`}>
              Destacadas
            </h2>
            {/* 1 col on xs, 2 cols on sm+ */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 lg:gap-7">
              {FEATURED.map(post => (
                <FeaturedCard key={post.id} {...post} />
              ))}
            </div>
          </div>

          {/* Recent */}
          <div className="flex flex-col gap-6 sm:gap-8 lg:gap-10 w-full lg:w-[380px] xl:w-[440px] shrink-0">
            <h2 className={`text-xl sm:text-headline-m font-medium lg:text-right ${isDark ? 'text-white' : 'text-slate-700'}`}>
              Recientes
            </h2>
            {/* On mobile: 2-col thumbnail grid; on sm+: single column list */}
            <div className="flex flex-col gap-5 sm:gap-6 lg:gap-8">
              {RECENT.map(post => (
                <RecentCard key={post.id} {...post} dark={isDark} />
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

function FeaturedCard({
  tag, title, excerpt, img,
}: { tag: string; title: string; excerpt: string; img: string }) {
  return (
    <div
      className="w-full h-[380px] sm:h-[440px] lg:h-[520px] rounded-2xl border border-slate-400
        relative flex flex-col justify-end p-4 sm:p-5 lg:p-6 overflow-hidden cursor-pointer
        hover:scale-[1.02] transition-transform"
    >
      <div className="absolute inset-0">
        <img src={img} alt={title} className="w-full h-full object-cover rounded-2xl" />
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-transparent from-[17%] to-navy to-[107%]" />
      </div>
      <div className="relative flex flex-col gap-3 sm:gap-4 lg:gap-6">
        <span className="tag-badge w-fit text-sm sm:text-title-l px-3 py-1 sm:px-4 sm:py-2">{tag}</span>
        <h3 className="text-lg sm:text-xl lg:text-headline-m text-white font-medium leading-snug">{title}</h3>
        <p className="text-sm sm:text-body-xl text-white/90">{excerpt}</p>
      </div>
    </div>
  )
}

function RecentCard({
  date, title, excerpt, img, dark,
}: { date: string; title: string; excerpt: string; img: string; dark: boolean }) {
  return (
    <div className="flex gap-4 sm:gap-6 lg:gap-8 items-start cursor-pointer hover:opacity-90 transition-opacity">
      <div className="shrink-0 w-[80px] h-[80px] sm:w-[100px] sm:h-[100px] lg:w-[118px] lg:h-[118px] rounded-xl sm:rounded-2xl overflow-hidden">
        <img src={img} alt={title} className="w-full h-full object-cover" />
      </div>
      <div className="flex-1 min-w-0 flex flex-col gap-1.5 sm:gap-2">
        <p className="text-xs sm:text-body-s text-slate-400">{date}</p>
        <div className={`flex flex-col gap-1 sm:gap-2 ${dark ? 'text-white' : 'text-slate-700'}`}>
          <p className="text-sm sm:text-headline-s font-medium leading-snug line-clamp-2">{title}</p>
          <p className="text-xs sm:text-body-l text-slate-400 line-clamp-2">{excerpt}</p>
        </div>
      </div>
    </div>
  )
}
