import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Zap,
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  FileText,
  Calendar,
  ShieldAlert,
  Clock,
  Coins,
  CalendarDays,
  Layers,
  Settings,
  X,
  MessageSquare,
  Mail
} from 'lucide-react';

// --- INTERACTIVE SCHEDULER MODAL ---
interface SchedulerProps {
  isOpen: boolean;
  onClose: () => void;
}

const MeetingScheduler = ({ isOpen, onClose }: SchedulerProps) => {
  const [step, setStep] = useState(1);
  const [selectedDay, setSelectedDay] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [loading, setLoading] = useState(false);

  const days = [
    { id: 'lun', label: 'Lunes 25 de Mayo', desc: 'Próxima semana' },
    { id: 'mar', label: 'Martes 26 de Mayo', desc: 'Disponibilidad alta' },
    { id: 'mie', label: 'Miércoles 27 de Mayo', desc: 'Recomendado' }
  ];

  const times = ['10:00 AM', '11:30 AM', '3:00 PM', '4:30 PM'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep(3);
    }, 1200);
  };

  const reset = () => {
    setStep(1);
    setSelectedDay('');
    setSelectedTime('');
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <motion.div 
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          style={{
            position: 'absolute', top: '1.25rem', right: '1.25rem',
            background: 'transparent', border: 'none', color: 'var(--text-muted)',
            cursor: 'pointer', hover: { color: '#fff' }
          } as any}
        >
          <X size={20} />
        </button>

        {step === 1 && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <div style={{ background: 'rgba(6, 182, 212, 0.1)', padding: '0.5rem', borderRadius: '0.5rem' }}>
                <CalendarDays color="var(--cyan)" size={24} />
              </div>
              <h3 style={{ fontSize: '1.5rem', margin: 0 }}>Agendar Reunión de Inicio</h3>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
              Selecciona el día más conveniente para coordinar el Kickoff del proyecto:
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
              {days.map((day) => (
                <div 
                  key={day.id}
                  onClick={() => setSelectedDay(day.label)}
                  className={`time-slot ${selectedDay === day.label ? 'selected' : ''}`}
                  style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem' }}
                >
                  <span style={{ fontWeight: 600 }}>{day.label}</span>
                  <span style={{ fontSize: '0.8rem', opacity: 0.7 }}>{day.desc}</span>
                </div>
              ))}
            </div>

            <button 
              disabled={!selectedDay}
              onClick={() => setStep(2)}
              className="btn-primary"
              style={{ width: '100%', opacity: selectedDay ? 1 : 0.5, cursor: selectedDay ? 'pointer' : 'not-allowed' }}
            >
              Continuar a Horarios <ArrowRight size={18} />
            </button>
          </div>
        )}

        {step === 2 && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <div style={{ background: 'rgba(6, 182, 212, 0.1)', padding: '0.5rem', borderRadius: '0.5rem' }}>
                <Clock color="var(--cyan)" size={24} />
              </div>
              <h3 style={{ fontSize: '1.5rem', margin: 0 }}>Selecciona un Horario</h3>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
              Horarios disponibles para el <strong>{selectedDay}</strong>:
            </p>

            <form onSubmit={handleSubmit}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem', marginBottom: '1.5rem' }}>
                {times.map((time) => (
                  <div 
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className={`time-slot ${selectedTime === time ? 'selected' : ''}`}
                  >
                    {time}
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.5rem' }}>
                <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Participantes</label>
                <input 
                  type="text" 
                  disabled 
                  value="Equipo Fitness Factory + ATC" 
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: '0.5rem', padding: '0.75rem',
                    color: '#fff', fontSize: '0.9rem'
                  }}
                />
              </div>

              <div style={{ display: 'flex', gap: '1rem' }}>
                <button 
                  type="button" 
                  onClick={() => setStep(1)} 
                  className="btn-outline" 
                  style={{ flex: 1, justifyContent: 'center' }}
                >
                  Atrás
                </button>
                <button 
                  type="submit" 
                  disabled={!selectedTime || loading}
                  className="btn-primary" 
                  style={{ flex: 2, opacity: selectedTime ? 1 : 0.5, cursor: selectedTime ? 'pointer' : 'not-allowed' }}
                >
                  {loading ? 'Confirmando...' : 'Confirmar Cita'}
                </button>
              </div>
            </form>
          </div>
        )}

        {step === 3 && (
          <div style={{ textAlign: 'center', padding: '1rem 0' }}>
            <div style={{ 
              background: 'rgba(16, 185, 129, 0.1)', 
              color: '#10b981', 
              width: '64px', height: '64px', 
              borderRadius: '50%', 
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 1.5rem auto',
              border: '2px solid rgba(16, 185, 129, 0.3)'
            }}>
              <CheckCircle2 size={36} />
            </div>
            <h3 style={{ fontSize: '1.75rem', marginBottom: '0.75rem' }}>¡Reunión Agendada!</h3>
            <p style={{ color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '2rem' }}>
              Hemos coordinado la sesión de Kickoff para el **{selectedDay}** a las **{selectedTime}**. 
              Se ha enviado una invitación de Google Calendar a su equipo.
            </p>
            <button 
              onClick={() => {
                onClose();
                reset();
              }} 
              className="btn-primary"
              style={{ width: '100%' }}
            >
              Listo, volver
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
};

// --- HEADER COMPONENT ---
interface HeaderProps {
  onApprove: () => void;
}

const Header = ({ onApprove }: HeaderProps) => {
  const [isScrolledDown, setIsScrolledDown] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsScrolledDown(true);
      } else {
        setIsScrolledDown(false);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <header style={{
      position: 'fixed', top: '1rem', left: '50%',
      transform: `translate(-50%, ${isScrolledDown ? '-150%' : '0'})`,
      width: '95%', maxWidth: '1200px', zIndex: 50,
      background: 'rgba(15, 23, 42, 0.9)', backdropFilter: 'blur(16px)',
      border: '1px solid rgba(255,255,255,0.05)', borderRadius: '100px',
      padding: '0.75rem 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      transition: 'transform 0.3s ease-in-out'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <img src="/ISOTIPO%20TEXTURA%2001.png" alt="Fitness Factory Logo" style={{ height: '50px', width: 'auto', objectFit: 'contain' }} />
        <span style={{ fontWeight: 700, fontSize: '1.15rem', letterSpacing: '-0.02em' }} className="hidden-mobile">Fitness Factory</span>
      </div>

      <nav className="hidden-tablet" style={{ display: 'flex', gap: '2rem', alignItems: 'center', position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>
        <a href="#salto" style={{ color: 'var(--text-main)', textDecoration: 'none', fontSize: '0.85rem', fontWeight: 600, transition: 'color 0.2s' }}>El Salto</a>
        <a href="#pilares" style={{ color: 'var(--text-main)', textDecoration: 'none', fontSize: '0.85rem', fontWeight: 600, transition: 'color 0.2s' }}>Los Pilares</a>
        <a href="#notificaciones" style={{ color: 'var(--text-main)', textDecoration: 'none', fontSize: '0.85rem', fontWeight: 600, transition: 'color 0.2s' }}>Valor agregado</a>
        <a href="#inversion" style={{ color: 'var(--text-main)', textDecoration: 'none', fontSize: '0.85rem', fontWeight: 600, transition: 'color 0.2s' }}>Inversión</a>
        <a href="#soporte" style={{ color: 'var(--text-main)', textDecoration: 'none', fontSize: '0.85rem', fontWeight: 600, transition: 'color 0.2s' }}>Soporte</a>
      </nav>

      <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
        <button onClick={onApprove} className="btn-primary" style={{ padding: '0.55rem 1.25rem', fontSize: '0.85rem' }}>
          Aprobar Propuesta
        </button>
      </div>
    </header>
  );
};

// --- HERO SECTION ---
interface HeroProps {
  onOpenScheduler: () => void;
}

const Hero = ({ onOpenScheduler }: HeroProps) => (
  <section style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', paddingTop: '8rem', paddingBottom: '4rem', textAlign: 'center' }} className="container">
    <motion.div
      initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
      className="card-glass flex flex-col items-center justify-center p-10 max-w-4xl m-auto"
      style={{ gap: '1.5rem', boxShadow: '0 10px 40px -10px rgba(6, 182, 212, 0.2)' }}
    >
      <div className="badge flex items-center justify-center m-auto" style={{ alignSelf: 'center', marginBottom: '0.5rem' }}>
        PROPUESTA DE DESARROLLO
      </div>

      <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', letterSpacing: '-0.03em', lineHeight: '1.1', maxWidth: '100%' }}>
        Bienvenido equipo de <br /><span className="text-gradient">Fitness Factory</span>
      </h1>

      <p style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--cyan)', marginTop: '-0.5rem' }}>
        Sistema Integral de CRM y Agendamiento
      </p>

      <p style={{ fontSize: '1.1rem', lineHeight: '1.7', color: '#cbd5e1', maxWidth: '800px' }}>
        Una infraestructura de software transaccional robusta diseñada para automatizar, controlar y escalar la operatividad diaria de sus 5 sedes actuales (próximamente 6), integrando paneles para usuarios, un robusto centro de mando administrativo y automatización de suscripciones en tiempo real.
      </p>

      <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        <motion.button
          whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
          className="btn-primary"
          style={{ padding: '0.9rem 2.2rem', fontSize: '1rem' }}
          onClick={() => document.getElementById('salto')?.scrollIntoView()}
        >
          Explorar Propuesta <ArrowRight size={18} />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
          className="btn-outline"
          style={{ padding: '0.9rem 2.2rem', fontSize: '1rem' }}
          onClick={onOpenScheduler}
        >
          Agendar Reunión de Inicio
        </motion.button>
      </div>
    </motion.div>
  </section>
);

// --- CONTEXTO: EL SALTO TECNOLÓGICO ---
const ContextSection = () => (
  <section id="salto" className="section container">
    <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
      <div className="badge" style={{ marginBottom: '1rem' }}>El Contexto Técnico</div>
      <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Un Salto Tecnológico y <span className="text-gradient">Operativo</span></h2>
      <p className="text-muted m-auto max-w-3xl" style={{ fontSize: '1.1rem' }}>
        A diferencia del panel del Reto anterior, esta plataforma es un ecosistema dinámico y transaccional bidireccional diseñado para resolver la operatividad diaria.
      </p>
    </div>

    <div className="grid md-grid-cols-2 gap-8">
      {/* Before Card */}
      <motion.div
        initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
        className="card-glass border-warning bg-warning-light p-8" style={{ position: 'relative', overflow: 'hidden' }}
      >
        <div style={{ position: 'absolute', top: '-1rem', right: '-1rem', opacity: 0.05, color: '#fbbf24' }}>
          <AlertCircle size={180} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
          <AlertCircle size={28} className="text-warning" />
          <h3 className="text-warning" style={{ textTransform: 'uppercase', fontSize: '1rem', letterSpacing: '0.05em' }}>
            Antes: El Panel del Reto FF60
          </h3>
        </div>
        <p style={{ color: '#cbd5e1', fontSize: '1.05rem', lineHeight: '1.7', marginBottom: '1rem' }}>
          Un entorno controlado y estático para un evento puntual:
        </p>
        <ul style={{ color: '#94a3b8', paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.95rem' }}>
          <li>~600 usuarios participando simultáneamente.</li>
          <li>Plataforma de lectura estática: los atletas consultan perfiles, noticias y puntajes.</li>
          <li>Interacción pasiva con la base de datos sin flujos de dinero en tiempo real.</li>
        </ul>
      </motion.div>

      {/* After Card */}
      <motion.div
        initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
        className="card-glass border-success bg-success-light p-8" style={{ position: 'relative', overflow: 'hidden' }}
      >
        <div style={{ position: 'absolute', top: '-1rem', right: '-1rem', opacity: 0.05, color: '#34d399' }}>
          <Zap size={180} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
          <Zap size={28} className="text-success" />
          <h3 className="text-success" style={{ textTransform: 'uppercase', fontSize: '1rem', letterSpacing: '0.05em' }}>
            Ahora: Motor Transaccional en Vivo
          </h3>
        </div>
        <p style={{ color: '#e2e8f0', fontSize: '1.05rem', lineHeight: '1.7', marginBottom: '1rem' }}>
          Ecosistema integral automatizado de control diario:
        </p>
        <ul style={{ color: '#cbd5e1', paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.95rem' }}>
          <li>Más de 1,500 usuarios operando en 5 (o 6) sedes simultáneamente.</li>
          <li>Motor dinámico en tiempo real que sincroniza clases, cupos e inyecciones de datos instantáneas.</li>
          <li>Operación autónoma del flujo de caja, ciclo de vida de suscripciones y conciliación bancaria directa.</li>
        </ul>
      </motion.div>
    </div>
  </section>
);

// --- LOS 4 PILARES DE COMPLEJIDAD ---
const PillarsSection = () => {
  const pillars = [
    {
      title: 'Motor de Agendamiento y Concurrencia',
      desc: 'Sincronización en vivo para más de 1,500 usuarios en 5 (o 6) sedes distintas.',
      items: [
        'Sincronización instantánea de clases y horarios creados por el administrador sin necesidad de recargar la web.',
        'Manejo de picos extremos: Algoritmo backend para procesar en milisegundos a 50 usuarios compitiendo por 20 cupos exactos, asignando cupos con precisión quirúrgica sin sobreventa.'
      ],
      icon: <Calendar size={28} color="var(--cyan)" />,
      badge: 'Tiempo Real'
    },
    {
      title: 'Panel Administrativo de Control y Auditoría',
      desc: 'Centro de mando enfocado en la resolución de conflictos operativos.',
      items: [
        'Gestión de Excepciones: Interfaces dinámicas para auditoría de bitácoras (logs), reescritura de transacciones de pagos y forzar asignaciones.',
        'Personalización total: Control de sedes, horarios, cupos y clases configurables desde el panel, apoyados sobre una compleja red de tablas relacionales.'
      ],
      icon: <ShieldAlert size={28} color="var(--cyan)" />,
      badge: 'Gestión Completa'
    },
    {
      title: 'Ciclo de Vida de Suscripciones',
      desc: 'Sistema autónomo que opera como un reloj evaluando fechas de corte de forma independiente.',
      items: [
        'Control individual para más de 1,500 atletas con fechas de corte independientes moviéndose a lo largo del mes.',
        'Automatización total: El backend ejecuta de forma autónoma los bloqueos de agenda, libera cupos reservados a futuro y cambia estados de acceso sin intervención manual.'
      ],
      icon: <Clock size={28} color="var(--cyan)" />,
      badge: '100% Autónomo'
    },
    {
      title: 'Conciliación Bancaria y Casos Borde',
      desc: 'Integración transaccional robusta para una automatización de reactivaciones 24/7.',
      items: [
        'API Banco R4: Procesamiento de pago móvil directo y reactivación inmediata a cualquier hora.',
        'Auditoría y control de anomalías: Módulo para resolver pagos menores por diferencias de tasa, pagos mixtos (efectivo + app) y caídas temporales de la red bancaria.'
      ],
      icon: <Coins size={28} color="var(--cyan)" />,
      badge: 'Transaccional'
    }
  ];

  return (
    <section id="pilares" className="section container">
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <div className="badge" style={{ marginBottom: '1rem' }}>Estructura del Proyecto</div>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Los 4 Pilares de <span className="text-gradient">Complejidad</span></h2>
        <p className="text-muted m-auto max-w-3xl" style={{ fontSize: '1.1rem' }}>
          La ingeniería detrás del sistema está estructurada para dar una respuesta implacable a cuatro frentes críticos de la operatividad del gimnasio.
        </p>
      </div>

      <div className="grid md-grid-cols-2 gap-6">
        {pillars.map((p, idx) => (
          <motion.div
            key={idx}
            whileHover={{ y: -6, borderColor: 'rgba(6, 182, 212, 0.3)' }}
            className="card-glass p-8"
            style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              gap: '1.25rem',
              border: '1px solid rgba(255,255,255,0.05)',
              position: 'relative'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ background: 'rgba(6, 182, 212, 0.08)', padding: '0.75rem', borderRadius: '0.75rem', display: 'flex', alignItems: 'center' }}>
                {p.icon}
              </div>
              <span className="badge" style={{ fontSize: '0.7rem', padding: '0.3rem 0.8rem' }}>{p.badge}</span>
            </div>
            
            <div>
              <h3 style={{ fontSize: '1.3rem', marginBottom: '0.5rem', color: '#fff' }}>{p.title}</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.5' }}>{p.desc}</p>
            </div>

            <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '1rem', marginTop: 'auto' }}>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', paddingLeft: '1.25rem', color: '#cbd5e1', fontSize: '0.9rem', lineHeight: '1.6' }}>
                {p.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

// --- SECCIÓN DE BONUS: MOTOR DE NOTIFICACIONES ---
const NotificationsSection = () => {
  const features = [
    {
      title: '1. Constructor Dinámico (Manual)',
      desc: 'Herramienta de comunicación directa para campañas masivas, anuncios institucionales o avisos específicos del club.',
      items: [
        'Filtros Avanzados (Sede, Género, Etiquetas)',
        'Personalización Visual (Asunto, Banner)',
        'Botón de Acción (CTA)'
      ],
      icon: (
        <div style={{ position: 'relative', width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Mail size={24} color="var(--cyan)" />
          <div style={{ position: 'absolute', bottom: '-4px', right: '-4px', background: 'var(--bg-dark)', borderRadius: '50%', padding: '1px', display: 'flex', border: '1px solid rgba(6, 182, 212, 0.3)' }}>
            <Settings size={12} color="var(--cyan)" />
          </div>
        </div>
      ),
      glowColor: 'rgba(6, 182, 212, 0.15)',
      borderColor: 'rgba(6, 182, 212, 0.25)',
      badgeColor: 'var(--cyan)'
    },
    {
      title: '2. Alertas Automáticas (Triggers)',
      desc: 'Notificaciones automatizadas e inmediatas activadas por la dinámica diaria y eventos en las sedes.',
      items: [
        'Envío Inmediato por Cancelación de Clase',
        'Variables Dinámicas (Nombre, Atleta, Clase)',
        'Operación 100% Autónoma (Sin intervención humana)'
      ],
      icon: (
        <div style={{ position: 'relative', width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Mail size={24} color="var(--teal)" />
          <div style={{ position: 'absolute', bottom: '-4px', right: '-4px', background: 'var(--bg-dark)', borderRadius: '50%', padding: '1px', display: 'flex', border: '1px solid rgba(20, 184, 166, 0.3)' }}>
            <Zap size={12} color="var(--teal)" />
          </div>
        </div>
      ),
      glowColor: 'rgba(20, 184, 166, 0.15)',
      borderColor: 'rgba(20, 184, 166, 0.25)',
      badgeColor: 'var(--teal)'
    }
  ];

  return (
    <section id="notificaciones" className="section container" style={{ scrollMarginTop: '6rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '4rem', position: 'relative' }}>
        {/* Subtle background glow behind title */}
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '250px', height: '100px', background: 'var(--gradient-brand)', borderRadius: '50%', filter: 'blur(80px)', opacity: 0.15, pointerEvents: 'none' }} />
        
        <div className="badge" style={{ marginBottom: '1rem', border: '1px solid var(--cyan)', background: 'rgba(6, 182, 212, 0.05)' }}>
           Valor Agregado
        </div>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
          Bonus Exclusivo: <span className="text-gradient">Motor de Notificaciones</span>
        </h2>
        <p className="text-muted m-auto max-w-3xl" style={{ fontSize: '1.1rem' }}>
          Un sistema integrado de comunicación directa por correo electrónico para mantener al atleta informado, incentivar la asistencia y automatizar alertas críticas sin fricciones ni tareas manuales.
        </p>
      </div>

      <div className="grid md-grid-cols-2 gap-8 max-w-5xl m-auto">
        {features.map((feat, idx) => (
          <motion.div
            key={idx}
            whileHover={{ y: -6, borderColor: feat.badgeColor, boxShadow: `0 10px 30px -10px ${feat.glowColor}` }}
            className="card-glass p-8"
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem',
              border: `1px solid ${feat.borderColor}`,
              background: `radial-gradient(circle at top right, ${feat.glowColor}, transparent 60%), rgba(15, 23, 42, 0.4)`,
              position: 'relative',
              borderRadius: '1.5rem'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '0.75rem', borderRadius: '0.75rem', display: 'flex', alignItems: 'center' }}>
                {feat.icon}
              </div>
              <span className="badge" style={{ fontSize: '0.7rem', color: feat.badgeColor, border: `1px solid ${feat.borderColor}`, background: 'transparent' }}>
                {idx === 0 ? 'Manual' : 'Automatizado'}
              </span>
            </div>

            <div>
              <h3 style={{ fontSize: '1.4rem', marginBottom: '0.5rem', color: '#fff' }}>{feat.title}</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.5' }}>{feat.desc}</p>
            </div>

            <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '1.25rem', marginTop: 'auto' }}>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', listStyle: 'none', padding: 0 }}>
                {feat.items.map((item, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', color: '#cbd5e1', fontSize: '0.95rem', lineHeight: '1.4' }}>
                    <CheckCircle2 size={18} color={feat.badgeColor} style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

// --- INVERSIÓN Y LÍNEA DE TIEMPO (SIN SUMAS TOTALES) ---
interface InvestmentProps {
  onApprove: () => void;
}

const InvestmentSection = ({ onApprove }: InvestmentProps) => {
  const [activeStep, setActiveStep] = useState(0);

  const hitos = [
    {
      title: 'Hito 1: Kickoff & Núcleo',
      price: '$890 USD',
      day: 'Día 0',
      label: 'Fase Inicial',
      desc: 'Diseño de la arquitectura de la base de datos relacional, configuración del setup de servidores e inyección de variables seguras. Desarrollo del motor de agendamiento y persistencia principal.',
      details: [
        'Diseño y modelado de tablas relacionales complejas para 6 sedes.',
        'Setup del núcleo del Motor de Agendamiento en tiempo real.',
        'Configuración de servidores seguros y variables de entorno.'
      ]
    },
    {
      title: 'Hito 2: Integración & Suscripciones',
      price: '$580 USD',
      day: 'Día 40',
      label: 'Fase Media',
      desc: 'Implementación del ciclo de vida autónomo de suscripciones. Desarrollo e integración del panel de usuario móvil y conexión segura con la API del banco.',
      details: [
        'Módulo autónomo para evaluación de 1,500 fechas de corte.',
        'Integración y pruebas de Webhooks de la API Banco R4.',
        'Despliegue del Panel de Usuario interactivo (atletas).'
      ]
    },
    {
      title: 'Hito 3: Despliegue & QA',
      price: '$960 USD',
      day: 'Día 65',
      label: 'Fase Final',
      desc: 'Desarrollo completo del Panel Administrativo de control de riesgos y gestión de excepciones. Pruebas de estrés y concurrencia del motor, y pase final a producción.',
      details: [
        'Construcción de interfaces administrativas y logs de auditoría.',
        'Pruebas de estrés de alta concurrencia (simulación de carga).',
        'Pase a producción y despliegue final del sistema operativo.'
      ]
    }
  ];

  return (
    <section id="inversion" className="section container">
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <div className="badge" style={{ marginBottom: '1rem' }}>Planificación Económica</div>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Inversión y <span className="text-gradient">Línea de Tiempo</span></h2>
        <p className="text-muted m-auto max-w-3xl" style={{ fontSize: '1.1rem' }}>
          Estructura de desarrollo y pagos fraccionados vinculados directamente al cumplimiento de los hitos del proyecto.
        </p>
      </div>

      {/* Highlights Grid (Hours and Fee, WITHOUT any total sum) */}
      <div className="grid md-grid-cols-2 gap-6 mb-12 max-w-4xl m-auto">
        <div className="card-glass p-6 text-center" style={{ border: '1px solid rgba(6, 182, 212, 0.15)', background: 'rgba(6, 182, 212, 0.02)' }}>
          <span style={{ color: 'var(--cyan)', fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Tiempo de Ingeniería</span>
          <h3 style={{ fontSize: '2.25rem', marginTop: '0.5rem', color: '#fff' }}>+350 Horas</h3>
          <p className="text-muted" style={{ fontSize: '0.9rem', marginTop: '0.25rem' }}>Netas de programación, arquitectura y QA.</p>
        </div>
        <div className="card-glass p-6 text-center" style={{ border: '1px solid rgba(20, 184, 166, 0.15)', background: 'rgba(20, 184, 166, 0.02)' }}>
          <span style={{ color: 'var(--teal)', fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Tarifa Preferencial</span>
          <h3 style={{ fontSize: '2.25rem', marginTop: '0.5rem', color: '#fff' }}>$7 USD <span style={{ fontSize: '1rem', fontWeight: 500, color: 'var(--text-muted)' }}>/ hora</span></h3>
          <p className="text-muted" style={{ fontSize: '0.9rem', marginTop: '0.25rem' }}>Valor preferencial de desarrollo continuo.</p>
        </div>
      </div>

      {/* Interactive Timeline Tabs */}
      <div className="card-glass p-6 max-w-4xl m-auto mb-12" style={{ border: '1px solid rgba(255,255,255,0.05)' }}>
        <h3 className="text-center mb-8" style={{ fontSize: '1.5rem' }}>Avance por Hitos de Desarrollo</h3>
        
        {/* Tab Headers */}
        <div style={{ display: 'flex', overflowX: 'auto', gap: '0.5rem', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '1rem', marginBottom: '1.5rem' }}>
          {hitos.map((h, idx) => (
            <button
              key={idx}
              onClick={() => setActiveStep(idx)}
              style={{
                flex: 1,
                padding: '1rem',
                borderRadius: '0.75rem',
                border: 'none',
                background: activeStep === idx ? 'rgba(6, 182, 212, 0.12)' : 'transparent',
                color: activeStep === idx ? 'var(--cyan)' : 'var(--text-muted)',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.3s',
                textAlign: 'center',
                whiteSpace: 'nowrap',
                boxShadow: activeStep === idx ? 'var(--glow-cyan-soft)' : 'none'
              }}
            >
              <div style={{ fontSize: '0.75rem', opacity: 0.8, textTransform: 'uppercase', marginBottom: '0.25rem' }}>{h.day}</div>
              <div style={{ fontSize: '0.95rem', fontWeight: 700 }}>{h.price}</div>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            style={{ padding: '1rem' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
              <div>
                <span className="badge" style={{ fontSize: '0.7rem', marginBottom: '0.5rem' }}>{hitos[activeStep].label}</span>
                <h4 style={{ fontSize: '1.4rem', color: '#fff', margin: 0 }}>{hitos[activeStep].title}</h4>
              </div>
              <div style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#34d399', border: '1px solid rgba(16, 185, 129, 0.2)', padding: '0.5rem 1.25rem', borderRadius: '50px', fontWeight: 700, fontSize: '1.2rem' }}>
                {hitos[activeStep].price}
              </div>
            </div>
            
            <p style={{ color: '#cbd5e1', lineHeight: '1.7', fontSize: '1.05rem', marginBottom: '1.5rem' }}>
              {hitos[activeStep].desc}
            </p>

            <div style={{ background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.03)', padding: '1.25rem', borderRadius: '1rem' }}>
              <h5 style={{ color: '#fff', fontSize: '0.95rem', marginBottom: '0.75rem' }}>Entregables Clave:</h5>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', paddingLeft: '1.25rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                {hitos[activeStep].details.map((det, i) => (
                  <li key={i}>{det}</li>
                ))}
              </ul>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Methods & Terms */}
      <div className="text-center max-w-3xl m-auto">
        <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '0.75rem', padding: '1rem', marginBottom: '3rem' }}>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            <strong>Nota:</strong> Todos los hitos se facturan en dólares americanos (USD). Métodos de pago aceptados: Transferencia electrónica vía Zelle, Plataforma Binance (USDT), o Efectivo.
          </p>
        </div>
        
        <motion.button
          onClick={onApprove}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="btn-primary"
          style={{ fontSize: '1.15rem', padding: '1.1rem 2.8rem', boxShadow: 'var(--glow-cyan-strong)' }}
        >
          Aprobar Propuesta de Desarrollo
        </motion.button>
      </div>
    </section>
  );
};

// --- SOSTENIBILIDAD Y SOPORTE (RETAINER) ---
const RetainerSection = () => {
  const options = [
    {
      phase: 'Fase 1: Despliegue y Adaptación',
      price: '$250',
      period: 'mes',
      timing: 'Primeros 60 Días',
      icon: <Layers size={24} color="var(--cyan)" />,
      badge: 'Crítico',
      desc: 'Acompañamiento intenso para mitigar la fricción operativa durante el onboarding inicial de los 1,500+ atletas y el equipo de ATC.',
      items: [
        'Hasta 25 horas estimadas mensuales de soporte administrativo y técnico.',
        'Monitoreo diario de bases de datos y rendimiento de servidores.',
        'Auditoría y control diario del microsegundo de integración de webhooks bancarios.',
        'Corrección en caliente de incidencias o fricciones de interfaz con usuarios.',
        'Capacitación y soporte al personal de Atención al Cliente (ATC) de Fitness Factory.'
      ]
    },
    {
      phase: 'Fase 2: Mantenimiento y Optimización',
      price: '$100',
      period: 'mes',
      timing: 'Mes 3 en Adelante (A convenir)',
      icon: <Settings size={24} color="var(--teal)" />,
      badge: 'Estabilidad',
      desc: 'Soporte preventivo a bajo costo. Se activa si las incidencias operativas disminuyen sustancialmente y la plataforma opera de forma autónoma.',
      items: [
        'Garantía básica de Uptime y mantenimiento activo de servidores (Vercel/Supabase).',
        'Custodia y copias de seguridad de la base de datos (vital para la continuidad de los datos).',
        'Prevención de caídas de sistema por actualizaciones en APIs de terceros.',
        'Soporte técnico mínimo ante caídas del servidor.',
        'Optimización y ajustes finos de bajo impacto.'
      ]
    }
  ];

  return (
    <section id="soporte" className="section container">
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <div className="badge" style={{ marginBottom: '1rem' }}>Sostenibilidad Operativa</div>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Soporte y <span className="text-gradient">Acompañamiento Sostenido</span></h2>
        <p className="text-muted m-auto max-w-3xl" style={{ fontSize: '1.1rem' }}>
          La integración con plataformas bancarias y el tráfico masivo requieren resguardo continuo para evitar interrupciones de servicio y mantener la base de datos a salvo.
        </p>
      </div>

      <div className="grid md-grid-cols-2 gap-8 max-w-5xl m-auto">
        {options.map((opt, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -6 }}
            className="card-glass p-8"
            style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              gap: '1.5rem',
              border: opt.badge === 'Crítico' ? '1px solid rgba(6, 182, 212, 0.25)' : '1px solid rgba(255,255,255,0.05)',
              background: opt.badge === 'Crítico' ? 'rgba(6, 182, 212, 0.01)' : 'rgba(255,255,255,0.01)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ background: 'rgba(255,255,255,0.03)', padding: '0.6rem', borderRadius: '0.5rem' }}>
                {opt.icon}
              </div>
              <span className="badge" style={{ fontSize: '0.7rem' }}>{opt.timing}</span>
            </div>

            <div>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>{opt.phase}</span>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.25rem', marginTop: '0.25rem' }}>
                <span style={{ fontSize: '2.5rem', fontWeight: 800, color: '#fff' }}>{opt.price} USD</span>
                <span style={{ color: 'var(--text-muted)' }}>/ {opt.period}</span>
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.75rem', lineHeight: '1.5' }}>
                {opt.desc}
              </p>
            </div>

            <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '1.25rem', marginTop: 'auto' }}>
              <h5 style={{ color: '#fff', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.75rem' }}>
                ¿Qué incluye este plan?
              </h5>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', paddingLeft: '1.25rem', color: '#cbd5e1', fontSize: '0.85rem', lineHeight: '1.5' }}>
                {opt.items.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>

      <div style={{ marginTop: '2.5rem', textAlign: 'center', background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.03)', padding: '1.25rem', borderRadius: '1rem' }} className="max-w-4xl m-auto">
        <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', margin: 0 }}>
          <strong>Nota de Desarrollo:</strong> La adición de nuevas funcionalidades operativas (features), rediseños de interfaces o integraciones bancarias secundarias no contempladas en esta propuesta serán presupuestadas de forma independiente con descuento por continuidad.
        </p>
      </div>
    </section>
  );
};

// --- CALL TO ACTION (CTA) ---
interface CTAProps {
  onApprove: () => void;
  onOpenScheduler: () => void;
}

const CTASection = ({ onApprove, onOpenScheduler }: CTAProps) => (
  <section className="section container text-center" style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingBottom: '8rem' }}>
    <div className="card-glass max-w-4xl m-auto" style={{
      background: 'radial-gradient(circle at top right, rgba(6, 182, 212, 0.1), transparent 60%), rgba(15, 23, 42, 0.5)',
      border: '1px solid rgba(6, 182, 212, 0.15)',
      boxShadow: 'var(--glow-cyan-soft)',
      padding: '3rem 2rem'
    }}>
      <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
        ¿Listo para dar el <span className="text-gradient">Siguiente Paso</span>?
      </h2>
      <p className="text-muted m-auto max-w-2xl mb-8" style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>
        Inicia la automatización de Fitness Factory hoy. Puedes aprobar la propuesta directamente para arrancar con el diseño del núcleo de datos o agendar una videollamada para definir detalles.
      </p>

      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
        <button onClick={onApprove} className="btn-primary" style={{ padding: '1.1rem 2.5rem', fontSize: '1.1rem' }}>
          Aprobar e Iniciar Proyecto <CheckCircle2 size={20} />
        </button>
        <button onClick={onOpenScheduler} className="btn-outline" style={{ padding: '1.1rem 2.5rem', fontSize: '1.1rem' }}>
          Agendar Reunión de Inicio <MessageSquare size={20} />
        </button>
      </div>
    </div>
  </section>
);

// --- FOOTER ---
const Footer = () => (
  <footer className="container text-center" style={{ padding: '2rem 0 4rem 0', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
    <div className="text-muted" style={{ fontSize: '0.85rem', opacity: 0.6 }}>
      Propuesta de desarrollo técnico y comercial confidencial generada para Fitness Factory - 2026.
    </div>
  </footer>
);

// --- APPROVAL SCREEN COMPONENT ---
interface ApprovalProps {
  onOpenScheduler: () => void;
}

const ApprovalScreen = ({ onOpenScheduler }: ApprovalProps) => {
  return (
    <section style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', paddingTop: '4rem', paddingBottom: '4rem', textAlign: 'center', position: 'relative', overflow: 'hidden' }} className="container">
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, pointerEvents: 'none', opacity: 0.05, background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, var(--cyan) 2px, var(--cyan) 4px)', backgroundSize: '100% 4px', zIndex: -1 }}></div>

      <div style={{ position: 'absolute', top: '1.5rem', left: '2rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
         <img src="/ISOTIPO%20TEXTURA%2001.png" alt="Fitness Factory Logo" style={{ height: '50px', width: 'auto', objectFit: 'contain' }} />
         <span style={{ fontWeight: 700, fontSize: '1.1rem', letterSpacing: '-0.02em', color: '#e2e8f0' }}>Fitness Factory</span>
      </div>

      <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', damping: 20 }}>
        <div style={{ position: 'relative', display: 'inline-flex', justifyContent: 'center', alignItems: 'center', margin: '0 auto 2rem auto' }}>
          <div style={{ position: 'absolute', width: '150%', height: '150%', background: 'var(--gradient-brand)', borderRadius: '50%', filter: 'blur(60px)', opacity: 0.2 }}></div>
          <CheckCircle2 color="#06b6d4" size={120} strokeWidth={1.5} style={{ filter: 'drop-shadow(0 0 20px rgba(6,182,212,0.5))' }} />
        </div>
      </motion.div>

      <motion.h1 
        initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}
        className="mb-4" style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', letterSpacing: '-0.04em', lineHeight: '1.1' }}
      >
        ¡PROPUESTA <span className="text-gradient">APROBADA</span>!
      </motion.h1>

      <motion.p 
        initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }}
        style={{ fontSize: '1.2rem', color: '#cbd5e1', marginBottom: '2.5rem', fontWeight: 500 }}
      >
        ¡Gracias por la confianza! | <span style={{ opacity: 0.7, fontWeight: 400 }}>El desarrollo ha sido iniciado formalmente.</span>
      </motion.p>

      {/* Development Roadmap */}
      <motion.div 
        initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5 }}
        className="card-glass w-full max-w-4xl p-10 mb-8" style={{ background: 'rgba(15, 23, 42, 0.9)', boxShadow: '0 20px 40px -15px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)' }}
      >
        <h3 style={{ fontSize: '1.15rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#94a3b8', marginBottom: '2.5rem', fontWeight: 700 }}>
          Estatus de Avance del Proyecto
        </h3>

        {/* Stepper */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem', position: 'relative' }}>
          <div style={{ position: 'absolute', left: '10%', right: '10%', top: '35%', height: '2px', background: 'rgba(255,255,255,0.05)', zIndex: 0 }}></div>
          
          {[
            { step: 1, label: 'Modelado DB & Cimientos', active: true, done: true },
            { step: 2, label: 'Motor Agendamiento', active: false, done: false },
            { step: 3, label: 'Integración Bancaria', active: false, done: false },
            { step: 4, label: 'Admin, QA & Pase', active: false, done: false },
          ].map((item, idx) => (
            <div key={idx} style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem', width: '25%' }}>
              <div style={{ 
                width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', 
                background: item.active ? 'var(--cyan)' : 'var(--bg-dark)', 
                border: item.active ? 'none' : '2px solid rgba(255,255,255,0.1)',
                color: item.active ? '#0f172a' : '#64748b',
                fontWeight: 700, fontSize: '0.9rem',
                boxShadow: item.active ? 'var(--glow-cyan-soft)' : 'none'
              }}>
                {item.done ? '✔' : item.step}
              </div>
              <span style={{ fontSize: '0.8rem', fontWeight: item.active ? 600 : 500, color: item.active ? '#f8fafc' : '#64748b', textAlign: 'center', maxWidth: '100px' }}>
                {item.label}
              </span>
            </div>
          ))}
        </div>

        {/* Summary Block */}
        <div style={{ background: 'rgba(6, 182, 212, 0.05)', border: '1px solid rgba(6, 182, 212, 0.2)', padding: '1.5rem', borderRadius: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <p style={{ color: '#e2e8f0', fontSize: '1.05rem', margin: 0 }}>
              Tu plataforma automatizada (Vercel + Supabase) está **oficialmente en construcción.**
            </p>
            <p style={{ color: 'var(--cyan)', fontSize: '0.95rem', fontWeight: 600, margin: 0 }}>
              Fase 1 iniciada: Modelado e infraestructura del núcleo. Próximo avance programado.
            </p>
        </div>
      </motion.div>

      {/* Kickoff CTA & Drive */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        <button 
          onClick={onOpenScheduler}
          className="btn-primary" 
          style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '1rem 2rem' }}
        >
          <CalendarDays size={20} /> Agendar Videollamada de Kickoff <ArrowRight size={18} />
        </button>
        <a 
          href="https://drive.google.com/drive/folders/1NHX73zVUTJQJS5OhKXmaMIcJuYOSjisN?usp=sharing" 
          target="_blank" 
          rel="noopener noreferrer"
          className="btn-outline" 
          style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '1rem 2rem', background: 'rgba(15, 23, 42, 0.8)', border: '1px solid rgba(6, 182, 212, 0.3)', textDecoration: 'none' }}
        >
          <FileText size={20} /> Carpeta de Documentación
        </a>
      </motion.div>

    </section>
  );
};

// --- MAIN APP COMPONENT ---
function App() {
  const [isApproved, setIsApproved] = useState(false);
  const [isSchedulerOpen, setIsSchedulerOpen] = useState(false);

  // Scroll to top when approved state changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [isApproved]);

  const handleApprove = () => {
    setIsApproved(true);
  };

  const handleOpenScheduler = () => {
    setIsSchedulerOpen(true);
  };

  const handleCloseScheduler = () => {
    setIsSchedulerOpen(false);
  };

  return (
    <>
      {/* Background radial glows */}
      <div style={{ position: 'fixed', top: '-20%', left: '-10%', width: '60%', height: '60%', background: 'var(--cyan)', borderRadius: '50%', filter: 'blur(150px)', opacity: 0.05, pointerEvents: 'none', zIndex: 0 }} />
      <div style={{ position: 'fixed', bottom: '-20%', right: '-10%', width: '60%', height: '60%', background: 'var(--teal)', borderRadius: '50%', filter: 'blur(150px)', opacity: 0.05, pointerEvents: 'none', zIndex: 0 }} />

      <div style={{ position: 'relative', zIndex: 10 }}>
        {isApproved ? (
          <ApprovalScreen onOpenScheduler={handleOpenScheduler} />
        ) : (
          <>
            <Header onApprove={handleApprove} />
            <main>
              <Hero onOpenScheduler={handleOpenScheduler} />
              <ContextSection />
              <PillarsSection />
              <NotificationsSection />
              <InvestmentSection onApprove={handleApprove} />
              <RetainerSection />
              <CTASection onApprove={handleApprove} onOpenScheduler={handleOpenScheduler} />
            </main>
            <Footer />
          </>
        )}
      </div>

      {/* Global Interactive Scheduler Modal */}
      <AnimatePresence>
        {isSchedulerOpen && (
          <MeetingScheduler isOpen={isSchedulerOpen} onClose={handleCloseScheduler} />
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .hidden-tablet { display: none !important; }
          .md-flex-row { flex-direction: column !important; }
          .md-grid-cols-2 { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}

export default App;
