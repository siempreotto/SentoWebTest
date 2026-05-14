type Props = { dark?: boolean; size?: 'sm' | 'lg' }

export default function SentoLogo({ dark = false, size = 'sm' }: Props) {
  const textColor = dark ? '#334155' : 'white'
  const h = size === 'lg' ? 40 : 24
  const w = size === 'lg' ? 202 : 121

  return (
    <svg width={w} height={h} viewBox="0 0 202 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Sento">
      {/* Isotipo (círculo con punto) */}
      <circle cx="10" cy="20" r="9" stroke="#03989e" strokeWidth="2" fill="none" />
      <circle cx="10" cy="20" r="3" fill="#03989e" />
      {/* Wordmark "sento" */}
      <text
        x="26"
        y="28"
        fontFamily="Montserrat, sans-serif"
        fontWeight="700"
        fontSize={size === 'lg' ? '26' : '18'}
        fill={textColor}
        letterSpacing="-0.5"
      >
        sento
      </text>
    </svg>
  )
}
