import { useState } from 'react'
import { Search } from 'lucide-react'
import Navbar from '../components/Navbar'
import SentoLogo from '../components/SentoLogo'

// Figma blog cover image
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

      <main className="flex-1 flex flex-col gap-[120px] px-6 lg:px-[60px] py-12 max-w-[1480px] mx-auto w-full">
        {/* Hero header */}
        <section
          className={`flex flex-col items-center gap-16 text-center ${
            isDark
              ? 'rounded-2xl shadow-card px-6 py-16'
              : ''
          }`}
          style={isDark ? {
            background: 'radial-gradient(ellipse at bottom left, #21e0e0 0%, #12bcbf 12%, #03989e 23%, #025e82 36%, #014174 42%, #002466 49%, #001948 61%, #000e29 73%, #00040a 100%)',
          } : undefined}
        >
          {/* Logo + Blog wordmark */}
          <div className="relative inline-flex items-start">
            <SentoLogo dark={!isDark} size="lg" />
            <span
              className="absolute -top-1 left-[175px] font-bold italic"
              style={{
                fontSize: '2.2rem',
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
          <div className="flex flex-col gap-6 max-w-[640px]">
            <h1 className={`text-display-l font-bold ${isDark ? 'text-white' : 'text-slate-700'}`}>
              Descubre todas nuestras novedades
            </h1>
            <p className={`text-title-l font-medium ${isDark ? 'text-slate-50/80' : 'text-slate-400'}`}>
              Descubre todas las novedades sobre nuestros clientes, industria y producto en un solo lugar
            </p>
          </div>

          {/* Search */}
          <div className="flex gap-6 items-center w-full max-w-[640px]">
            <div
              className={`flex-1 flex items-center gap-4 px-4 py-2 rounded-lg border ${
                isDark
                  ? 'backdrop-blur-sm bg-white/10 border-slate-200/30 text-white'
                  : 'bg-white/10 border-slate-200 text-slate-700'
              }`}
            >
              <Search size={20} className={isDark ? 'text-slate-50/60' : 'text-slate-400'} />
              <input
                className={`flex-1 bg-transparent outline-none text-label-xl ${
                  isDark ? 'placeholder-slate-50/50 text-white' : 'placeholder-slate-400 text-slate-700'
                }`}
                placeholder="Nuevas herramientas"
                value={query}
                onChange={e => setQuery(e.target.value)}
              />
            </div>
            <button className="btn-primary">Buscar</button>
          </div>
        </section>

        {/* Content grid */}
        <section className="flex flex-wrap gap-16 items-start">
          {/* Featured */}
          <div className="flex-1 min-w-[300px] flex flex-col gap-16">
            <h2 className={`text-headline-m font-medium ${isDark ? 'text-white' : 'text-slate-700'}`}>Destacadas</h2>
            <div className="flex flex-wrap gap-7 justify-center">
              {FEATURED.map(post => (
                <FeaturedCard key={post.id} {...post} />
              ))}
            </div>
          </div>

          {/* Recent */}
          <div className="flex flex-col gap-16 max-w-[440px] min-w-[300px]">
            <h2 className={`text-headline-m font-medium text-right ${isDark ? 'text-white' : 'text-slate-700'}`}>Recientes</h2>
            <div className="flex flex-col gap-8">
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
      className="flex-1 min-w-[250px] max-w-[370px] h-[520px] rounded-2xl border border-slate-400
        relative flex flex-col justify-end p-6 overflow-hidden cursor-pointer
        hover:scale-[1.02] transition-transform"
    >
      {/* Background image + gradient */}
      <div className="absolute inset-0">
        <img src={img} alt={title} className="w-full h-full object-cover rounded-2xl" />
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-transparent from-[17%] to-navy to-[107%]" />
      </div>

      {/* Content */}
      <div className="relative flex flex-col gap-6">
        <span className="tag-badge w-fit">{tag}</span>
        <h3 className="text-headline-m text-white font-medium">{title}</h3>
        <p className="text-body-xl text-white">{excerpt}</p>
      </div>
    </div>
  )
}

function RecentCard({
  date, title, excerpt, img, dark,
}: { date: string; title: string; excerpt: string; img: string; dark: boolean }) {
  return (
    <div className="flex gap-8 items-center max-w-[470px] cursor-pointer hover:opacity-90 transition-opacity">
      <div className="shrink-0 w-[118px] h-[118px] rounded-2xl overflow-hidden">
        <img src={img} alt={title} className="w-full h-full object-cover" />
      </div>
      <div className="flex-1 flex flex-col justify-between gap-2">
        <p className="text-body-s text-slate-400">{date}</p>
        <div className={`flex flex-col gap-2 ${dark ? 'text-white' : 'text-slate-700'}`}>
          <p className="text-headline-s font-medium">{title}</p>
          <p className="text-body-l text-slate-400">{excerpt}</p>
        </div>
      </div>
    </div>
  )
}
