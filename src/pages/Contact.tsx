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

      <main className="flex-1 px-6 lg:px-16 py-12 max-w-[1680px] mx-auto w-full flex flex-col gap-16">
        {/* Hero with form */}
        <section
          className="rounded-2xl shadow-card overflow-hidden"
          style={{
            background: 'radial-gradient(ellipse at bottom left, #21e0e0 0%, #12bcbf 12%, #03989e 23%, #025e82 36%, #014174 42%, #002466 49%, #001948 61%, #000e29 73%, #00040a 100%)',
          }}
        >
          <div className="flex flex-wrap gap-16 px-4 py-16 items-center justify-center">
            {/* Left text */}
            <div className="flex flex-col gap-6 flex-1 min-w-[280px]">
              <div className="inline-flex items-center justify-center px-4 py-2 rounded-full border border-teal-light bg-teal-dark w-fit">
                <span className="text-title-l text-teal-light font-medium">Respondemos en menos de 24 horas</span>
              </div>
              <h1 className="text-display-l text-white font-bold">Tienes preguntas</h1>
              <p className="text-headline-l text-slate-400">
                Nosotros te tenemos respuestas
              </p>
            </div>

            {/* Form card */}
            <div className="flex-1 min-w-[280px] max-w-[640px] backdrop-blur-xl bg-black/20 border border-slate-400 rounded-2xl p-8 shadow-glass">
              <div className="flex flex-col gap-8">
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
                <FieldGroup label="Número de teléfono">
                  <div className="glass-input flex items-center gap-3 py-0 h-[58px]">
                    <span className="text-2xl shrink-0">🇬🇹</span>
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
                <FieldGroup label="Cuéntanos algo">
                  <textarea
                    className="glass-input resize-none h-[126px] py-4"
                    placeholder="¿Cómo podemos ayudarte?"
                    value={form.mensaje}
                    onChange={set('mensaje')}
                  />
                </FieldGroup>
                <button className="btn-primary w-fit">Enviar</button>
              </div>
            </div>
          </div>
        </section>

        {/* Tab menu */}
        <div className="flex items-center gap-2 bg-white rounded-lg shadow-input p-4 h-[72px] w-fit">
          <TabBtn active={tab === 'ubicaciones'} onClick={() => setTab('ubicaciones')} icon={<MapPin size={18} />}>
            Ubicaciones
          </TabBtn>
          <TabBtn active={tab === 'faq'} onClick={() => setTab('faq')} icon={<HelpCircle size={18} />}>
            Preguntas frecuentes
          </TabBtn>
          <TabBtn active={tab === 'soporte'} onClick={() => setTab('soporte')} icon={<AlertCircle size={18} />}>
            Soporte
          </TabBtn>
        </div>

        {/* Tab content */}
        {tab === 'ubicaciones' && (
          <div className="flex flex-col gap-16">
            {OFFICES.map(o => (
              <div key={o.city} className="flex flex-col gap-8">
                <h2 className="text-headline-m font-medium text-slate-700">{o.city}</h2>
                {/* Map placeholder */}
                <div className="h-[350px] rounded-[32px] shadow-[0px_4px_40px_rgba(0,0,0,0.1)] bg-slate-50 overflow-hidden flex items-center justify-center">
                  <div className="text-slate-400 text-center">
                    <MapPin size={48} className="mx-auto mb-2 text-teal" />
                    <p className="text-label-l">{o.address}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-6 justify-between">
                  <InfoRow icon={<MapPin size={20} />} text={`Dirección: ${o.address}`} />
                  <InfoRow icon={<span className="text-lg">🪑</span>} text={`Oficina: ${o.office}`} />
                  <InfoRow icon={<Clock size={20} />} text={`Horario: ${o.hours}`} />
                  <InfoRow icon={<Phone size={20} />} text={`Teléfono: ${o.phone}`} />
                  <InfoRow icon={<Globe size={20} />} text={o.web} />
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === 'faq' && (
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            {/* Left heading */}
            <div className="lg:w-[420px] shrink-0 flex flex-col gap-6">
              <h2 className="text-display-s font-bold text-slate-700">Preguntas frecuentes</h2>
              <p className="text-headline-l text-slate-400">Tal vez ya hemos resuelto tu duda</p>
            </div>

            {/* FAQ accordion */}
            <div className="flex-1 bg-white rounded-lg shadow-input px-8 py-4">
              {FAQ_GROUPS.map(group => (
                <div key={group.category}>
                  <div className="py-4">
                    <p className="text-headline-s font-medium text-slate-400">{group.category}</p>
                  </div>
                  {group.items.map(item => (
                    <div key={item.n} className="faq-divider">
                      <button
                        className="flex gap-8 items-start py-4 w-full text-left"
                        onClick={() => setOpenFaq(openFaq === item.n ? null : item.n)}
                      >
                        <span className="text-headline-l text-slate-400 font-medium shrink-0 w-12">{item.n}</span>
                        <span className="flex-1 text-title-l text-slate-700 font-medium">{item.q}</span>
                        {openFaq === item.n
                          ? <ChevronUp size={24} className="text-slate-400 shrink-0" />
                          : <ChevronDown size={24} className="text-slate-400 shrink-0" />
                        }
                      </button>
                      {openFaq === item.n && (
                        <div className="pb-4 pl-20 text-body-l text-slate-400">
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
          <div className="text-center py-16">
            <AlertCircle size={48} className="mx-auto text-teal mb-4" />
            <h2 className="text-headline-m font-medium text-slate-700 mb-2">Centro de Soporte</h2>
            <p className="text-body-l text-slate-400">Contacta a nuestro equipo de soporte técnico.</p>
          </div>
        )}
      </main>
    </div>
  )
}

function FieldGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-[19px] flex-1 min-w-[200px]">
      <label className="text-title-l text-slate-400 font-medium">{label}</label>
      {children}
    </div>
  )
}

function TabBtn({
  active, onClick, icon, children,
}: { active: boolean; onClick: () => void; icon: React.ReactNode; children: string }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg text-label-l font-medium transition-all ${
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
    <div className="flex items-center gap-4 max-w-[390px]">
      <div className="text-slate-700 shrink-0">{icon}</div>
      <p className="text-body-l text-slate-700">{text}</p>
    </div>
  )
}
