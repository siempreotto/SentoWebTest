import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, ChevronDown } from 'lucide-react'
import SentoLogo from './SentoLogo'

const PRODUCT_INDUSTRIES = [
  { label: 'Banca & Fintech' },
  { label: 'Retail & E-commerce' },
  { label: 'BPO & Contact Centers' },
  { label: 'Seguros' },
  { label: 'Salud' },
]

const PRODUCT_USE_CASES = [
  { label: 'Ventas', desc: 'Detecta objeciones, mejora cierres y aumenta la conversión llamada a llamada.' },
  { label: 'Cobranza', desc: 'Detecta objeciones, mejora cierres y aumenta la conversión llamada a llamada.' },
  { label: 'Atención al cliente', desc: 'Detecta objeciones, mejora cierres y aumenta la conversión llamada a llamada.' },
]

const RESOURCES = [
  { label: 'Casos de éxito' },
  { label: 'Blog' },
  { label: 'Webinars' },
  { label: 'Videos' },
  { label: 'Glosario sobre Speech Analytics' },
]

type DropdownKey = 'producto' | 'recursos' | null

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<DropdownKey>(null)
  const [lang, setLang] = useState<'ES' | 'EN'>('ES')
  const location = useLocation()

  const toggle = (key: DropdownKey) =>
    setActiveDropdown(prev => (prev === key ? null : key))

  const navBg = 'bg-navy'

  return (
    <nav className={`${navBg} shadow-input relative z-50`}>
      {/* Desktop */}
      <div className="hidden lg:flex items-center justify-between px-[120px] py-4">
        {/* Logo */}
        <Link to="/book-demo" className="shrink-0">
          <SentoLogo />
        </Link>

        {/* Menu */}
        <div className="flex items-center gap-8 mx-auto">
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
              Producto <ChevronDown size={16} className={`transition-transform ${activeDropdown === 'producto' ? 'rotate-180' : ''}`} />
            </button>
            {activeDropdown === 'producto' && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-white rounded-b-2xl shadow-card border border-slate-200 p-8 flex gap-8 min-w-[560px]">
                <div className="flex-1">
                  <p className="text-label-l font-medium text-slate-700 mb-6">Por industria</p>
                  <ul className="space-y-5">
                    {PRODUCT_INDUSTRIES.map(i => (
                      <li key={i.label} className="text-label-l text-slate-700 hover:text-teal cursor-pointer transition-colors">
                        {i.label}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex-1">
                  <p className="text-label-l font-medium text-slate-700 mb-6">Por caso de uso</p>
                  <ul className="space-y-5">
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
              Recursos <ChevronDown size={16} className={`transition-transform ${activeDropdown === 'recursos' ? 'rotate-180' : ''}`} />
            </button>
            {activeDropdown === 'recursos' && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-white rounded-b-2xl shadow-card border border-slate-200 p-8 min-w-[340px]">
                <ul className="space-y-5">
                  {RESOURCES.map(r => (
                    <li
                      key={r.label}
                      className="text-label-l text-slate-700 hover:text-teal cursor-pointer transition-colors"
                    >
                      {r.label}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <Link to="/" className="nav-link">Proyecta tu revenue</Link>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-6 shrink-0">
          {/* Language toggle */}
          <div className="flex items-center rounded-full p-0.5 bg-white/10 backdrop-blur-sm shadow-inner">
            <button
              onClick={() => setLang('ES')}
              className={`px-2 py-1 rounded-full text-label-l font-bold transition-all ${
                lang === 'ES' ? 'bg-teal text-white shadow-md' : 'text-white'
              }`}
            >
              ES
            </button>
            <button
              onClick={() => setLang('EN')}
              className={`px-2 py-1 rounded-full text-label-l font-bold transition-all ${
                lang === 'EN' ? 'bg-teal text-white shadow-md' : 'text-white'
              }`}
            >
              EN
            </button>
          </div>

          <Link to="/book-demo" className="btn-secondary">
            Agenda una demo
          </Link>
        </div>
      </div>

      {/* Mobile */}
      <div className="lg:hidden flex items-center justify-between px-8 py-6">
        <Link to="/book-demo">
          <SentoLogo />
        </Link>
        <div className="flex items-center gap-2">
          <Link to="/book-demo" className="btn-secondary text-sm px-4 py-2">
            Agenda una demo
          </Link>
          <button
            className="text-white p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-slate-50 px-6 pb-8">
          <div className="bg-white rounded-2xl p-6 mb-4">
            <p className="text-body-s text-slate-400 mb-4">Menu</p>
            <ul className="space-y-4">
              {['Home', 'Producto', 'Recursos', 'Proyecta tu revenue'].map(item => (
                <li
                  key={item}
                  className="text-label-l text-slate-700 cursor-pointer hover:text-teal transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white rounded-2xl p-6">
            <p className="text-body-s text-slate-400 mb-4">Language selection</p>
            <div className="flex items-center rounded-full p-0.5 bg-white/10 backdrop-blur-sm border border-slate-200 w-fit">
              {(['ES', 'EN'] as const).map(l => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`px-6 py-3 rounded-full text-label-l font-bold transition-all ${
                    lang === l ? 'bg-teal text-white shadow-md' : 'text-slate-700'
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
