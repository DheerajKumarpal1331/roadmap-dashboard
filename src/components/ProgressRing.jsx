export default function ProgressRing({ pct, size = 100, stroke = 8, color = '#f0a500' }) {
  const r = (size - stroke) / 2
  const circ = 2 * Math.PI * r
  const dash = (pct / 100) * circ
  const cx = size / 2
  const fontSize = size * 0.2
  const subFontSize = size * 0.09

  return (
    <div className="progress-ring-wrap" style={{ width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        {/* glow filter */}
        <defs>
          <filter id={`glow-${color.replace('#', '')}`} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {/* track */}
        <circle
          cx={cx} cy={cx} r={r}
          fill="none"
          stroke="var(--border)"
          strokeWidth={stroke}
        />
        {/* progress */}
        {pct > 0 && (
          <circle
            cx={cx} cy={cx} r={r}
            fill="none"
            stroke={color}
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={`${dash} ${circ}`}
            filter={`url(#glow-${color.replace('#', '')})`}
            style={{ transition: 'stroke-dasharray 600ms cubic-bezier(0.4,0,0.2,1)' }}
          />
        )}
      </svg>
      <div className="progress-ring-label">
        <span className="progress-ring-pct" style={{ fontSize, color: pct > 0 ? color : 'var(--text-muted)' }}>
          {pct}%
        </span>
        <span className="progress-ring-sub" style={{ fontSize: subFontSize }}>done</span>
      </div>
    </div>
  )
}
