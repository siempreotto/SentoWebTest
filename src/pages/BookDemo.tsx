import { useState } from 'react'
import { Eye, Wrench, DollarSign, ChevronDown } from 'lucide-react'
import Navbar from '../components/Navbar'
import SentoLogo from '../components/SentoLogo'

const TEAM_SIZES = ['1–10', '11–50', '51–200', '201–500', '500+']
const INDUSTRIES = ['Banca & Fintech', 'Retail & E-commerce', 'BPO & Contact Centers', 'Seguros', 'Salud', 'Otro']

const FEATURES = [
  { icon: Eye, label: 'Recorrido por la plataforma con datos reales' },
  { icon: Wrench, label: 'Configuración para industria' },
  { icon: DollarSign, label: 'Cálculo de ROI personalizado' },
]

export default function BookDemo() {
  const [form, setForm] = useState({
    nombre: '', apellido: '', email: '', telefono: '',
    empresa: '', cargo: '', equipo: TEAM_SIZES[0], industria: INDUSTRIES[0], mensaje: '',
  })

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }))

  return (
    <div className="min-h-screen bg-navy-deep flex flex-col">
      <Navbar />

      {/* Hero section */}
      <main className="flex-1 flex items-center justify-center px-6 py-16">
        <div
          className="w-full max-w-[1480px] rounded-[32px] shadow-card overflow-hidden"
          style={{
            background: 'radial-gradient(ellipse at bottom right, #21e0e0 0%, #12bcbf 12%, #03989e 23%, #025e82 36%, #014174 42%, #002466 49%, #001948 61%, #000e29 73%, #00040a 100%)',
          }}
        >
          <div className="flex flex-col lg:flex-row gap-16 p-16 items-center">
            {/* Left panel */}
            <div className="flex flex-col gap-16 lg:w-[520px] shrink-0">
              <SentoLogo size="lg" />

              <div className="flex flex-col gap-6">
                <h1 className="text-display-l text-white font-bold leading-[80px]">
                  Ve sento en acción
                </h1>
                <p className="text-title-l text-slate-400">
                  Demo personalizada de 30 minutos. Sin compromiso.
                </p>
                <div className="inline-flex items-center justify-center px-4 py-2 rounded-full border border-teal-light bg-teal-dark w-fit">
                  <span className="text-title-l text-teal-light font-medium">
                    Respondemos en menos de 24 horas
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-6">
                {FEATURES.map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-center gap-8">
                    <div className="shrink-0 w-16 h-16 flex items-center justify-center">
                      <Icon size={40} className="text-teal-light" />
                    </div>
                    <p className="text-title-l text-slate-400">{label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right panel — form */}
            <div className="flex-1 backdrop-blur-xl bg-black/20 border border-slate-400 rounded-2xl p-8 shadow-glass">
              <div className="flex flex-col gap-8">
                {/* Nombre / Apellido */}
                <div className="flex gap-8 flex-wrap">
                  <FieldGroup label="Nombre">
                    <input className="glass-input" placeholder="Raúl" value={form.nombre} onChange={set('nombre')} />
                  </FieldGroup>
                  <FieldGroup label="Apellido">
                    <input className="glass-input" placeholder="López" value={form.apellido} onChange={set('apellido')} />
                  </FieldGroup>
                </div>

                <FieldGroup label="Correo corporativo">
                  <input className="glass-input" type="email" placeholder="raul@empresa.com" value={form.email} onChange={set('email')} />
                </FieldGroup>

                {/* Phone */}
                <FieldGroup label="Número de teléfono">
                  <div className="glass-input flex items-center gap-3 py-0 h-[58px]">
                    <span className="text-2xl shrink-0">🇬🇹</span>
                    <ChevronDown size={16} className="text-slate-400 shrink-0" />
                    <div className="w-px h-6 bg-slate-400 shrink-0" />
                    <span className="text-slate-400 text-title-l shrink-0">+502</span>
                    <input
                      className="flex-1 bg-transparent outline-none text-title-l text-slate-700 placeholder-slate-400"
                      placeholder="0000 - 0000"
                      value={form.telefono}
                      onChange={set('telefono')}
                    />
                  </div>
                </FieldGroup>

                {/* Empresa / Cargo / Equipo */}
                <div className="flex gap-6 flex-wrap">
                  <FieldGroup label="Empresa" className="flex-1 min-w-[140px]">
                    <input className="glass-input" placeholder="Sento-ai" value={form.empresa} onChange={set('empresa')} />
                  </FieldGroup>
                  <FieldGroup label="Cargo" className="flex-1 min-w-[140px]">
                    <input className="glass-input" placeholder="Gerente de CX" value={form.cargo} onChange={set('cargo')} />
                  </FieldGroup>
                  <FieldGroup label="Equipo" className="flex-1 min-w-[120px]">
                    <div className="glass-input flex items-center justify-between h-[58px] cursor-pointer">
                      <span className="text-title-l text-slate-700">{form.equipo} agentes</span>
                      <ChevronDown size={16} className="text-slate-400" />
                    </div>
                  </FieldGroup>
                </div>

                <FieldGroup label="Cuéntanos algo">
                  <textarea
                    className="glass-input resize-none h-[126px] py-4"
                    placeholder="Cuéntanos sobre tu empresa y objetivos..."
                    value={form.mensaje}
                    onChange={set('mensaje')}
                  />
                </FieldGroup>

                <button type="submit" className="btn-primary w-fit">
                  Enviar
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

function FieldGroup({
  label, children, className = '',
}: { label: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={`flex flex-col gap-[19px] flex-1 min-w-[200px] ${className}`}>
      <label className="text-title-l text-slate-400 font-medium">{label}</label>
      {children}
    </div>
  )
}
