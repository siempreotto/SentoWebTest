import { useState } from 'react'
import { MapPin, Clock, Phone, Globe, ChevronDown, ChevronUp, HelpCircle, AlertCircle } from 'lucide-react'
import Navbar from '../components/Navbar'

const OFFICES = [
  {
    city: 'Oficina Guatemala City',
    address: 'Edificio Spazio, 15 Avenida 5 calle, Cdad. de Guatemala 01015',
    office: '301-A',
    hours: 'Lunes a Viernes, 8:00 am – 16:00',
    phone: '+502 2322-2322',
    web: 'www.spazio.com.gt',
  },
  {
    city: 'Oficina México City',
    address: 'Av. Insurgentes Sur 1079, Col. Noche Buena, CDMX',
    office: '201-B',
    hours: 'Lunes a Viernes, 9:00 am – 18:00',
    phone: '+52 55 1234-5678',
    web: 'www.sento-ai.com',
  },
]

const FAQ_GROUPS = [
  {
    category: 'Gestión de Usuarios y Accesos',
    items: [
      { n: '01', q: '¿Cómo reiniciar la contraseña de un usuario?' },
      { n: '02', q: '¿Cómo crear usuarios (supervisor, encargado de calidad, agente)?' },
    ],
  },
  {
    category: 'Llamadas y datos',
    items: [
      { n: '03', q: '¿Por qué no veo llamadas de algunos días?' },
      { n: '04', q: '¿Por qué algunos agentes no tienen llamadas?' },
    ],
  },
  {
    category: 'Matrices de Calidad y Calificaciones',
    items: [
      { n: '05', q: '¿Por qué algunos agentes no tienen llamadas?' },
      { n: '06', q: '¿Por qué no veo las calificaciones predeterminadas?' },
    ],
  },
]

type Tab = 'ubicaciones' | 'faq' | 'soporte'

export default function Contact() {
  const [tab, setTab] = useState<Tab>('ubicaciones')
  const [openFaq, setOpenFaq] = useState<string | null>(null)
  const [form, setForm] = useState({ nombre: '', apellido: '', email: '', telefono: '', mensaje: '' })

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }))

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />

      <main className="flex-1 px-4 sm:px-6 lg:px-16 py-6 sm:py-8 lg:py-12 max-w-[1680px] mx-auto w-full flex flex-col gap-8 sm:gap-10 lg:gap-16">

        {/* ── Hero with form ── */}
        <section
          className="rounded-2xl shadow-card overflow-hidden"
          style={{
            background: 'radial-gradient(ellipse at bottom left, #21e0e0 0%, #12bcbf 12%, #03989e 23%, #025e82 36%, #014174 42%, #002466 49%, #001948 61%, #000e29 73%, #00040a 100%)',
          }}
        >
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 px-4 sm:px-8 lg:px-12 py-8 sm:py-10 lg:py-16 items-start lg:items-center justify-center">
            {/* Left text */}
            <div className="flex flex-col gap-4 sm:gap-6 w-full lg:flex-1">
              <div className="inline-flex items-center justify-center px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-teal-light bg-teal-dark w-fit">
                <span className="text-sm sm:text-title-l text-teal-light font-medium">Respondemos en menos de 24 horas</span>
              </div>
              <h1 className="text-3xl sm:text-5xl lg:text-display-l text-white font-bold leading-tight">Tienes preguntas</h1>
              <p className="text-lg sm:text-headline-l text-slate-400 leading-snug">
                Nosotros te tenemos respuestas
              </p>
            </div>

            {/* Form card */}
            <div className="w-full lg:flex-1 lg:max-w-[640px] backdrop-blur-xl bg-black/20 border border-slate-400 rounded-2xl p-4 sm:p-6 lg:p-8 shadow-glass">
              <div className="flex flex-col gap-5 sm:gap-6 lg:gap-8">
                <div className="flex flex-col sm:flex-row gap-5 sm:gap-6 lg:gap-8">
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
                <FieldGroup label="Número de teléfono">
                  <div className="glass-input flex items-center gap-2 py-0 h-[52px] sm:h-[58px]">
                    <span className="text-xl shrink-0">🇬🇹</span>
                    <div className="w-px h-5 bg-slate-400 shrink-0" />
                    <span className="text-slate-400 text-base sm:text-title-l shrink-0">+502</span>
                    <input
                      className="flex-1 bg-transparent outline-none text-base sm:text-title-l text-slate-700 placeholder-slate-400 min-w-0"
                      placeholder="0000 - 0000"
                      value={form.telefono}
                      onChange={set('telefono')}
                    />
                  </div>
                </FieldGroup>
                <FieldGroup label="Cuéntanos algo">
                  <textarea
                    className="glass-input resize-none h-[100px] sm:h-[126px] py-3"
                    placeholder="¿Cómo podemos ayudarte?"
                    value={form.mensaje}
                    onChange={set('mensaje')}
                  />
                </FieldGroup>
                <button className="btn-primary w-full sm:w-fit">Enviar</button>
              </div>
            </div>
          </div>
        </section>

        {/* ── Tab menu ── */}
        {/* Mobile: scrollable row; sm+: normal flex */}
        <div className="overflow-x-auto pb-1 -mx-4 px-4 sm:mx-0 sm:px-0">
          <div className="flex items-center gap-2 bg-white rounded-lg shadow-input p-2 sm:p-4 w-fit min-w-full sm:min-w-0">
            <TabBtn active={tab === 'ubicaciones'} onClick={() => setTab('ubicaciones')} icon={<MapPin size={16} />}>
              Ubicaciones
            </TabBtn>
            <TabBtn active={tab === 'faq'} onClick={() => setTab('faq')} icon={<HelpCircle size={16} />}>
              <span className="hidden sm:inline">Preguntas frecuentes</span>
              <span className="sm:hidden">FAQ</span>
            </TabBtn>
            <TabBtn active={tab === 'soporte'} onClick={() => setTab('soporte')} icon={<AlertCircle size={16} />}>
              Soporte
            </TabBtn>
          </div>
        </div>

        {/* ── Tab content ── */}
        {tab === 'ubicaciones' && (
          <div className="flex flex-col gap-10 sm:gap-12 lg:gap-16">
            {OFFICES.map(o => (
              <div key={o.city} className="flex flex-col gap-5 sm:gap-6 lg:gap-8">
                <h2 className="text-xl sm:text-headline-m font-medium text-slate-700">{o.city}</h2>
                {/* Map placeholder */}
                <div className="h-[220px] sm:h-[280px] lg:h-[350px] rounded-2xl sm:rounded-[32px] shadow-[0px_4px_40px_rgba(0,0,0,0.1)] bg-slate-50 overflow-hidden flex items-center justify-center">
                  <div className="text-slate-400 text-center px-4">
                    <MapPin size={36} className="mx-auto mb-2 text-teal" />
                    <p className="text-sm sm:text-label-l">{o.address}</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                  <InfoRow icon={<MapPin size={18} />} text={`Dirección: ${o.address}`} />
                  <InfoRow icon={<span className="text-base">🪑</span>} text={`Oficina: ${o.office}`} />
                  <InfoRow icon={<Clock size={18} />} text={`Horario: ${o.hours}`} />
                  <InfoRow icon={<Phone size={18} />} text={`Teléfono: ${o.phone}`} />
                  <InfoRow icon={<Globe size={18} />} text={o.web} />
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === 'faq' && (
          <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 lg:gap-12 items-start">
            {/* Left heading */}
            <div className="w-full lg:w-[360px] xl:w-[420px] shrink-0 flex flex-col gap-3 sm:gap-4">
              <h2 className="text-2xl sm:text-display-s font-bold text-slate-700">Preguntas frecuentes</h2>
              <p className="text-lg sm:text-headline-l text-slate-400 leading-snug">Tal vez ya hemos resuelto tu duda</p>
            </div>

            {/* FAQ accordion */}
            <div className="flex-1 w-full bg-white rounded-lg shadow-input px-4 sm:px-6 lg:px-8 py-2 sm:py-4">
              {FAQ_GROUPS.map(group => (
                <div key={group.category}>
                  <div className="py-3 sm:py-4">
                    <p className="text-base sm:text-headline-s font-medium text-slate-400">{group.category}</p>
                  </div>
                  {group.items.map(item => (
                    <div key={item.n} className="faq-divider">
                      <button
                        className="flex gap-4 sm:gap-8 items-start py-3 sm:py-4 w-full text-left"
                        onClick={() => setOpenFaq(openFaq === item.n ? null : item.n)}
                      >
                        <span className="text-xl sm:text-3xl lg:text-headline-l text-slate-400 font-medium shrink-0 w-8 sm:w-10 lg:w-12 leading-tight">{item.n}</span>
                        <span className="flex-1 text-sm sm:text-title-l text-slate-700 font-medium leading-snug">{item.q}</span>
                        {openFaq === item.n
                          ? <ChevronUp size={20} className="text-slate-400 shrink-0 mt-0.5" />
                          : <ChevronDown size={20} className="text-slate-400 shrink-0 mt-0.5" />
                        }
                      </button>
                      {openFaq === item.n && (
                        <div className="pb-4 pl-12 sm:pl-18 lg:pl-20 text-sm sm:text-body-l text-slate-400">
                          Respuesta a esta pregunta frecuente. Aquí va el contenido de la respuesta detallada.
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 'soporte' && (
          <div className="text-center py-12 sm:py-16">
            <AlertCircle size={40} className="mx-auto text-teal mb-4" />
            <h2 className="text-xl sm:text-headline-m font-medium text-slate-700 mb-2">Centro de Soporte</h2>
            <p className="text-sm sm:text-body-l text-slate-400">Contacta a nuestro equipo de soporte técnico.</p>
          </div>
        )}
      </main>
    </div>
  )
}

function FieldGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-3 flex-1 w-full">
      <label className="text-base sm:text-title-l text-slate-400 font-medium">{label}</label>
      {children}
    </div>
  )
}

function TabBtn({
  active, onClick, icon, children,
}: { active: boolean; onClick: () => void; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-lg text-sm sm:text-label-l font-medium transition-all whitespace-nowrap ${
        active ? 'bg-teal text-white shadow-btn' : 'text-slate-400 hover:text-slate-700'
      }`}
    >
      {icon}
      {children}
    </button>
  )
}

function InfoRow({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-start gap-3">
      <div className="text-slate-700 shrink-0 mt-0.5">{icon}</div>
      <p className="text-sm sm:text-body-l text-slate-700 leading-snug">{text}</p>
    </div>
  )
}
