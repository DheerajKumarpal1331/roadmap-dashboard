import { useProgressContext } from '../App'
import { ROLES } from '../data/skills'

const CAT_COLORS = {
  'Python': '#3b82f6',
  'SQL': '#06b6d4',
  'Programming Fundamentals': '#8b5cf6',
  'Mathematics & Statistics': '#f97316',
  'Machine Learning': '#ec4899',
  'Deep Learning': '#a855f7',
  'AI & LLMs': '#0ea5e9',
  'Data Analysis': '#22c55e',
  'Data Engineering': '#f59e0b',
  'MLOps & Infrastructure': '#ef4444',
}

// ── Radar Chart ───────────────────────────────────────────────────────────────
export function RadarChart() {
  const { getCategoryProgress } = useProgressContext()
  const cats = getCategoryProgress()
  if (!cats.length) return null

  const size = 280
  const cx = size / 2
  const cy = size / 2
  const maxR = 100
  const n = cats.length
  const levels = 4

  function polar(angle, r) {
    return {
      x: cx + r * Math.cos(angle - Math.PI / 2),
      y: cy + r * Math.sin(angle - Math.PI / 2),
    }
  }

  const angles = cats.map((_, i) => (2 * Math.PI * i) / n)
  const rings = Array.from({ length: levels }, (_, i) => {
    const r = (maxR * (i + 1)) / levels
    const pts = angles.map(a => polar(a, r))
    return pts.map((p, j) => `${j === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ') + 'Z'
  })
  const spokes = angles.map(a => {
    const outer = polar(a, maxR)
    return { x1: cx, y1: cy, x2: outer.x, y2: outer.y }
  })
  const dataPts = cats.map((cat, i) => polar(angles[i], (cat.pct / 100) * maxR))
  const dataPath = dataPts.map((p, j) => `${j === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ') + 'Z'
  const labelPts = cats.map((cat, i) => {
    const p = polar(angles[i], maxR + 22)
    const xFrac = (p.x - cx) / maxR
    const anchor = xFrac > 0.1 ? 'start' : xFrac < -0.1 ? 'end' : 'middle'
    return { ...p, label: cat.name, anchor, pct: cat.pct, color: CAT_COLORS[cat.name] || '#52525b' }
  })

  return (
    <div className="chart-card">
      <div className="chart-title">Skill Strength by Category</div>
      <svg width={size} height={size} className="radar-svg" viewBox={`0 0 ${size} ${size}`} style={{ overflow: 'visible' }}>
        {/* rings */}
        {rings.map((d, i) => (
          <path key={i} d={d} fill="none"
            stroke={i === levels - 1 ? '#d4d4d8' : '#e4e4e7'}
            strokeWidth={i === levels - 1 ? 1.5 : 0.8}
            strokeDasharray={i === levels - 1 ? '3 6' : ''}
          />
        ))}
        {/* spokes */}
        {spokes.map((s, i) => (
          <line key={i} {...s} stroke="#e4e4e7" strokeWidth={0.8} />
        ))}
        {/* data fill */}
        <path d={dataPath} fill="rgba(37,99,235,0.06)" stroke="none" />
        <path d={dataPath} fill="none" stroke="#2563eb" strokeWidth={2} strokeLinejoin="round" />
        {/* colored dots per category */}
        {dataPts.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r={cats[i].pct > 0 ? 4 : 2.5}
            fill={cats[i].pct > 0 ? (CAT_COLORS[cats[i].name] || '#2563eb') : '#e4e4e7'}
            stroke="#fff" strokeWidth={1.5}
          />
        ))}
        {/* labels */}
        {labelPts.map((l, i) => (
          <text key={i} x={l.x} y={l.y}
            textAnchor={l.anchor} dominantBaseline="middle"
            fill={l.pct > 0 ? l.color : '#a1a1aa'}
            fontSize="8" fontFamily="var(--font-mono)" fontWeight="600"
          >{l.label}</text>
        ))}
      </svg>
    </div>
  )
}

// ── Role Bar Chart ────────────────────────────────────────────────────────────
export function RoleBarChart() {
  const { getRoleProgress } = useProgressContext()

  const rows = Object.entries(ROLES)
    .map(([id, role]) => ({ id, role, ...getRoleProgress(id) }))
    .sort((a, b) => b.pct - a.pct)

  return (
    <div className="chart-card">
      <div className="chart-title">Role Readiness Comparison</div>
      <div className="bar-chart-list">
        {rows.map(({ id, role, pct }) => (
          <div key={id} className="bar-row">
            <div className="bar-label">
              <span>{role.icon}</span>
              <span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{role.name}</span>
            </div>
            <div className="bar-track">
              <div
                className="bar-fill"
                style={{ width: `${pct}%`, background: role.color }}
              />
            </div>
            <div className="bar-pct-label" style={{ color: pct > 0 ? role.color : '#a1a1aa' }}>
              {pct}%
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
