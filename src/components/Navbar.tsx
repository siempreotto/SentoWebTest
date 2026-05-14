import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, ChevronDown, ChevronRight } from 'lucide-react'
import SentoLogo from './SentoLogo'

const PRODUCT_INDUSTRIES = [
  { label: 'Banca & Fintech' },
  { label: 'Retail & E-commerce' },
  { label: 'BPO & Contact Centers' },
  { label: 'Seguros' },
  { label: 'Salud' },
]

const PRODUCT_USE_CASES = [
  { label: 'Ventas', desc: 'Detecta objeciones, mejora cierres y aumenta la conversión.' },
  { label: 'Cobranza', desc: 'Detecta objeciones, mejora cierres y aumenta la conversión.' },
  { label: 'Atención al cliente', desc: 'Detecta objeciones, mejora cierres y aumenta la conversión.' },
]

const RESOURCES = [
  { label: 'Casos de éxito' },
  { label: 'Blog' },
  { label: 'Webinars' },
  { label: 'Videos' },
  { label: 'Glosario sobre Speech Analytics' },
]

type DropdownKey = 'producto' | 'recursos' | null
type MobileSection = 'menu' | 'producto' | 'recursos' | null

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileSection, setMobileSection] = useState<MobileSection>('menu')
  const [activeDropdown, setActiveDropdown] = useState<DropdownKey>(null)
  const [lang, setLang] = useState<'ES' | 'EN'>('ES')
  const location = useLocation()

  const toggle = (key: DropdownKey) =>
    setActiveDropdown(prev => (prev === key ? null : key))

  const closeMobile = () => {
    setMobileOpen(false)
    setMobileSection('menu')
  }

  return (
    <nav className="bg-navy shadow-input relative z-50">
      {/* ── Desktop (lg+) ── */}
      <div className="hidden lg:flex items-center justify-between px-10 xl:px-[120px] py-4">
        <Link to="/book-demo" className="shrink-0">
          <SentoLogo />
        </Link>

        <div className="flex items-center gap-6 xl:gap-8 mx-auto">
          <Link
            to="/book-demo"
            className={`nav-link ${location.pathname === '/book-demo' ? 'text-teal-light' : ''}`}
          >
            Home
          </Link>

          {/* Producto dropdown */}
          <div className="relative">
            <button
              className="nav-link flex items-center gap-1"
              onClick={() => toggle('producto')}
              onBlur={() => setTimeout(() => setActiveDropdown(null), 150)}
            >
              Producto
              <ChevronDown size={16} className={`transition-transform ${activeDropdown === 'producto' ? 'rotate-180' : ''}`} />
            </button>
            {activeDropdown === 'producto' && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-white rounded-b-2xl shadow-card border border-slate-200 p-6 flex gap-8 w-[520px]">
                <div className="flex-1">
                  <p className="text-label-l font-medium text-slate-700 mb-4">Por industria</p>
                  <ul className="space-y-4">
                    {PRODUCT_INDUSTRIES.map(i => (
                      <li key={i.label} className="text-label-l text-slate-700 hover:text-teal cursor-pointer transition-colors">
                        {i.label}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex-1">
                  <p className="text-label-l font-medium text-slate-700 mb-4">Por caso de uso</p>
                  <ul className="space-y-4">
                    {PRODUCT_USE_CASES.map(i => (
                      <li key={i.label}>
                        <p className="text-label-l font-medium text-slate-700">{i.label}</p>
                        <p className="text-body-s text-slate-400 mt-1">{i.desc}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>

          {/* Recursos dropdown */}
          <div className="relative">
            <button
              className="nav-link flex items-center gap-1"
              onClick={() => toggle('recursos')}
              onBlur={() => setTimeout(() => setActiveDropdown(null), 150)}
            >
              Recursos
              <ChevronDown size={16} className={`transition-transform ${activeDropdown === 'recursos' ? 'rotate-180' : ''}`} />
            </button>
            {activeDropdown === 'recursos' && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-white rounded-b-2xl shadow-card border border-slate-200 p-6 w-[280px]">
                <ul className="space-y-4">
                  {RESOURCES.map(r => (
                    <li key={r.label} className="text-label-l text-slate-700 hover:text-teal cursor-pointer transition-colors">
                      {r.label}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <Link to="/" className="nav-link whitespace-nowrap">Proyecta tu revenue</Link>
        </div>

        <div className="flex items-center gap-4 shrink-0">
          <LangToggle lang={lang} setLang={setLang} />
          <Link to="/book-demo" className="btn-secondary whitespace-nowrap">
            Agenda una demo
          </Link>
        </div>
      </div>

      {/* ── Mobile / Tablet bar (< lg) ── */}
      <div className="lg:hidden flex items-center justify-between px-4 sm:px-6 py-4">
        <Link to="/book-demo" onClick={closeMobile}>
          <SentoLogo />
        </Link>
        <div className="flex items-center gap-2">
          <Link to="/book-demo" className="btn-secondary text-sm px-3 py-2 hidden sm:inline-flex">
            Agenda una demo
          </Link>
          <button
            className="text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
            onClick={() => { setMobileOpen(!mobileOpen); setMobileSection('menu') }}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* ── Mobile drawer ── */}
      {mobileOpen && (
        <div className="lg:hidden bg-slate-50 border-t border-slate-200">
          {/* Main menu */}
          {mobileSection === 'menu' && (
            <div className="px-4 py-4 flex flex-col gap-3">
              {/* CTA visible only on xs */}
              <Link
                to="/book-demo"
                className="btn-primary w-full justify-center sm:hidden"
                onClick={closeMobile}
              >
                Agenda una demo
              </Link>

              <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
                <MobileNavItem label="Home" onClick={closeMobile} />
                <MobileNavItem
                  label="Producto"
                  hasChildren
                  onClick={() => setMobileSection('producto')}
                />
                <MobileNavItem
                  label="Recursos"
                  hasChildren
                  onClick={() => setMobileSection('recursos')}
                />
                <MobileNavItem label="Proyecta tu revenue" onClick={closeMobile} last />
              </div>

              <div className="bg-white rounded-2xl p-4 shadow-sm">
                <p className="text-body-s text-slate-400 mb-3">Idioma</p>
                <LangToggle lang={lang} setLang={setLang} dark={false} />
              </div>
            </div>
          )}

          {/* Producto sub-menu */}
          {mobileSection === 'producto' && (
            <div className="px-4 py-4 flex flex-col gap-3">
              <button
                className="flex items-center gap-2 text-label-l text-slate-700 font-medium"
                onClick={() => setMobileSection('menu')}
              >
                <ChevronDown size={18} className="rotate-90" /> Producto
              </button>
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
                <div className="px-4 py-3 border-b border-slate-50">
                  <p className="text-body-s text-slate-400 font-medium uppercase tracking-wide">Por industria</p>
                </div>
                {PRODUCT_INDUSTRIES.map((i, idx) => (
                  <MobileNavItem
                    key={i.label}
                    label={i.label}
                    onClick={closeMobile}
                    last={idx === PRODUCT_INDUSTRIES.length - 1 && PRODUCT_USE_CASES.length === 0}
                  />
                ))}
                <div className="px-4 py-3 border-t border-b border-slate-50">
                  <p className="text-body-s text-slate-400 font-medium uppercase tracking-wide">Por caso de uso</p>
                </div>
                {PRODUCT_USE_CASES.map((i, idx) => (
                  <MobileNavItem
                    key={i.label}
                    label={i.label}
                    sub={i.desc}
                    onClick={closeMobile}
                    last={idx === PRODUCT_USE_CASES.length - 1}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Recursos sub-menu */}
          {mobileSection === 'recursos' && (
            <div className="px-4 py-4 flex flex-col gap-3">
              <button
                className="flex items-center gap-2 text-label-l text-slate-700 font-medium"
                onClick={() => setMobileSection('menu')}
              >
                <ChevronDown size={18} className="rotate-90" /> Recursos
              </button>
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
                {RESOURCES.map((r, idx) => (
                  <MobileNavItem
                    key={r.label}
                    label={r.label}
                    onClick={closeMobile}
                    last={idx === RESOURCES.length - 1}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </nav>
  )
}

function LangToggle({
  lang, setLang, dark = true,
}: { lang: 'ES' | 'EN'; setLang: (l: 'ES' | 'EN') => void; dark?: boolean }) {
  return (
    <div className={`flex items-center rounded-full p-0.5 backdrop-blur-sm shadow-inner ${dark ? 'bg-white/10' : 'bg-slate-100 border border-slate-200'}`}>
      {(['ES', 'EN'] as const).map(l => (
        <button
          key={l}
          onClick={() => setLang(l)}
          className={`px-3 py-1 rounded-full text-label-l font-bold transition-all ${
            lang === l
              ? 'bg-teal text-white shadow-md'
              : dark ? 'text-white' : 'text-slate-500'
          }`}
        >
          {l}
        </button>
      ))}
    </div>
  )
}

function MobileNavItem({
  label, sub, onClick, hasChildren = false, last = false,
}: {
  label: string
  sub?: string
  onClick: () => void
  hasChildren?: boolean
  last?: boolean
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center justify-between px-4 py-3.5 text-left hover:bg-slate-50 transition-colors ${!last ? 'border-b border-slate-100' : ''}`}
    >
      <div>
        <p className="text-label-l text-slate-700">{label}</p>
        {sub && <p className="text-body-s text-slate-400 mt-0.5 leading-snug">{sub}</p>}
      </div>
      {hasChildren && <ChevronRight size={16} className="text-slate-400 shrink-0" />}
    </button>
  )
}
