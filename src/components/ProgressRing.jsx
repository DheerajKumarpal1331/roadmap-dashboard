export default function ProgressRing({ pct, size = 100, stroke = 8, color = '#d97706' }) {
  const r = (size - stroke) / 2
  const circ = 2 * Math.PI * r
  const dash = (pct / 100) * circ
  const cx = size / 2
  const fontSize = size * 0.2
  const subFontSize = size * 0.09

  return (
    <div className="progress-ring-wrap" style={{ width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle
          cx={cx} cy={cx} r={r}
          fill="none"
          stroke="#e4e4e7"
          strokeWidth={stroke}
        />
        {pct > 0 && (
          <circle
            cx={cx} cy={cx} r={r}
            fill="none"
            stroke={color}
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={`${dash} ${circ}`}
            style={{ transition: 'stroke-dasharray 600ms cubic-bezier(0.4,0,0.2,1)' }}
          />
        )}
      </svg>
      <div className="progress-ring-label">
        <span className="progress-ring-pct" style={{ fontSize, color: pct > 0 ? color : '#a1a1aa' }}>
          {pct}%
        </span>
        <span className="progress-ring-sub" style={{ fontSize: subFontSize }}>done</span>
      </div>
    </div>
  )
}
