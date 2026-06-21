import { useProgressContext } from '../App'
import { ROLES } from '../data/skills'

const CAT_COLORS = {
  'Python': '#3b82f6',
  'SQL': '#06b6d4',
  'Programming Fundamentals': '#8b5cf6',
  'Mathematics & Statistics': '#f97316',
  'Machine Learning': '#ec4899',
  'Deep Learning': '#a855f7',
  'AI & LLMs': '#00d4ff',
  'Data Analysis': '#22c55e',
  'Data Engineering': '#f0a500',
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
    return { ...p, label: cat.name, anchor, pct: cat.pct, color: CAT_COLORS[cat.name] || 'var(--text-muted)' }
  })

  return (
    <div className="chart-card">
      <div className="chart-title">Skill Strength by Category</div>
      <svg width={size} height={size} className="radar-svg" viewBox={`0 0 ${size} ${size}`} style={{ overflow: 'visible' }}>
        <defs>
          <radialGradient id="radar-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(240,165,0,0.15)" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>
        {/* rings */}
        {rings.map((d, i) => (
          <path key={i} d={d} fill={i === levels - 1 ? 'none' : 'none'} stroke={i === levels - 1 ? 'var(--border-bright)' : 'var(--border)'} strokeWidth={i === levels - 1 ? 1.5 : 0.8} strokeDasharray={i === levels - 1 ? '3 6' : ''} opacity={0.7} />
        ))}
        {/* spokes */}
        {spokes.map((s, i) => (
          <line key={i} {...s} stroke="var(--border)" strokeWidth={0.8} />
        ))}
        {/* data fill with glow */}
        <path d={dataPath} fill="rgba(240,165,0,0.08)" stroke="none" />
        <path d={dataPath} fill="none" stroke="var(--gold)" strokeWidth={2} strokeLinejoin="round"
          style={{ filter: 'drop-shadow(0 0 6px rgba(240,165,0,0.5))' }} />
        {/* colored dots per category */}
        {dataPts.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r={cats[i].pct > 0 ? 4 : 2}
            fill={cats[i].pct > 0 ? (CAT_COLORS[cats[i].name] || 'var(--gold)') : 'var(--border-bright)'}
            stroke="var(--bg-card)" strokeWidth={1.5}
            style={{ filter: cats[i].pct > 0 ? `drop-shadow(0 0 5px ${CAT_COLORS[cats[i].name] || '#f0a500'})` : '' }}
          />
        ))}
        {/* labels */}
        {labelPts.map((l, i) => (
          <text key={i} x={l.x} y={l.y}
            textAnchor={l.anchor} dominantBaseline="middle"
            fill={l.pct > 0 ? l.color : 'var(--text-muted)'}
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
        {rows.map(({ id, role, pct, doneSkills, totalSkills }) => (
          <div key={id} className="bar-row">
            <div className="bar-label">
              <span>{role.icon}</span>
              <span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{role.name}</span>
            </div>
            <div className="bar-track">
              <div
                className="bar-fill"
                style={{
                  width: `${pct}%`,
                  background: pct >= 70
                    ? `linear-gradient(90deg, ${role.color}, var(--green))`
                    : pct >= 30
                    ? `linear-gradient(90deg, ${role.color}, var(--gold))`
                    : role.color,
                  boxShadow: pct > 0 ? `0 0 10px ${role.color}55` : 'none',
                }}
              />
            </div>
            <div className="bar-pct-label" style={{ color: pct > 0 ? role.color : 'var(--text-muted)' }}>
              {pct}%
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
