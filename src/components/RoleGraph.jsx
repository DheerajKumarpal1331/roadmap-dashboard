import { useState, useMemo } from 'react'
import { ROLES, SKILLS } from '../data/skills'
import { useProgressContext } from '../App'

function getSharedSkills(roleA, roleB) {
  const setA = new Set(ROLES[roleA].skills)
  return ROLES[roleB].skills.filter(s => setA.has(s))
}

export default function RoleGraph() {
  const { getRoleProgress } = useProgressContext()
  const [hovered, setHovered] = useState(null)

  const roleIds = Object.keys(ROLES)
  const n = roleIds.length

  // viewBox with generous padding so labels never clip
  const VB_W = 680
  const VB_H = 560
  const cx = VB_W / 2
  const cy = VB_H / 2
  const ORBIT_R = 185
  const NODE_R = 34

  const nodes = roleIds.map((id, i) => {
    const angle = (2 * Math.PI * i) / n - Math.PI / 2
    return {
      id, angle,
      x: cx + ORBIT_R * Math.cos(angle),
      y: cy + ORBIT_R * Math.sin(angle),
      role: ROLES[id],
      pct: getRoleProgress(id).pct
    }
  })

  const edges = useMemo(() => {
    const result = []
    for (let i = 0; i < roleIds.length; i++) {
      for (let j = i + 1; j < roleIds.length; j++) {
        const shared = getSharedSkills(roleIds[i], roleIds[j])
        if (shared.length > 0) result.push({ a: i, b: j, count: shared.length, skills: shared })
      }
    }
    return result
  }, [])

  const maxShared = Math.max(...edges.map(e => e.count))

  function isConnected(e, idx) { return idx !== null && (e.a === idx || e.b === idx) }

  return (
    <div className="chart-card" style={{ gridColumn: '1 / -1' }}>
      <div className="chart-title">Role &amp; Skill Relationship Map — hover a role to see connections</div>
      <div style={{ display: 'flex', gap: 28, alignItems: 'flex-start', flexWrap: 'wrap' }}>

        <svg
          viewBox={`0 0 ${VB_W} ${VB_H}`}
          style={{ display: 'block', width: '100%', maxWidth: 620, flexShrink: 0 }}
        >
          <defs>
            <radialGradient id="orbit-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(240,165,0,0.06)" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
            <filter id="node-glow">
              <feGaussianBlur stdDeviation="4" result="b" />
              <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>

          {/* background glow */}
          <circle cx={cx} cy={cy} r={ORBIT_R + 40} fill="url(#orbit-glow)" />
          {/* orbit ring */}
          <circle cx={cx} cy={cy} r={ORBIT_R} fill="none" stroke="var(--border)" strokeWidth={1} strokeDasharray="3 7" opacity={0.6} />
          {/* center dot */}
          <circle cx={cx} cy={cy} r={4} fill="var(--gold)" opacity={0.4} />

          {/* edges */}
          {edges.map((e, i) => {
            const na = nodes[e.a], nb = nodes[e.b]
            const hi = isConnected(e, hovered)
            const dim = hovered !== null && !hi
            const strokeW = Math.max(0.8, (e.count / maxShared) * 4.5)
            const gradId = `eg-${e.a}-${e.b}`
            const mx = (na.x + nb.x) / 2, my = (na.y + nb.y) / 2
            const px = cx + (mx - cx) * 0.25, py = cy + (my - cy) * 0.25

            return (
              <g key={i}>
                <defs>
                  <linearGradient id={gradId} x1={na.x} y1={na.y} x2={nb.x} y2={nb.y} gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor={na.role.color} />
                    <stop offset="100%" stopColor={nb.role.color} />
                  </linearGradient>
                </defs>
                <path
                  d={`M${na.x},${na.y} Q${px},${py} ${nb.x},${nb.y}`}
                  fill="none"
                  stroke={hi ? `url(#${gradId})` : '#2d3748'}
                  strokeWidth={hi ? strokeW + 1.5 : 0.8}
                  opacity={dim ? 0.03 : hi ? 1 : 0.4}
                  style={{ transition: 'opacity 180ms, stroke-width 180ms' }}
                />
                {hi && (
                  <text
                    x={(na.x + nb.x) / 2 * 0.55 + px * 0.45}
                    y={(na.y + nb.y) / 2 * 0.55 + py * 0.45}
                    textAnchor="middle" dominantBaseline="middle"
                    fontSize="9" fontFamily="var(--font-mono)" fontWeight="700"
                    fill="var(--gold)" opacity={0.95}
                  >
                    {e.count}
                  </text>
                )}
              </g>
            )
          })}

          {/* nodes */}
          {nodes.map((node, i) => {
            const isH = hovered === i
            const isDim = hovered !== null && !isH
            const r = isH ? NODE_R + 5 : NODE_R
            const arcR = r + 4
            const circ = 2 * Math.PI * arcR
            const dash = (node.pct / 100) * circ

            return (
              <g key={node.id} opacity={isDim ? 0.25 : 1}
                style={{ cursor: 'pointer', transition: 'opacity 180ms' }}
                onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)}
              >
                {/* outer glow ring */}
                <circle cx={node.x} cy={node.y} r={r + 10} fill={`${node.role.color}08`} />
                {/* progress arc */}
                {node.pct > 0 && (
                  <circle cx={node.x} cy={node.y} r={arcR} fill="none"
                    stroke={node.role.color} strokeWidth={3} strokeLinecap="round"
                    strokeDasharray={`${dash} ${circ}`}
                    transform={`rotate(-90 ${node.x} ${node.y})`}
                    opacity={0.85}
                    style={{ filter: `drop-shadow(0 0 4px ${node.role.color})` }}
                  />
                )}
                {/* node bg */}
                <circle cx={node.x} cy={node.y} r={r} fill="var(--bg-panel)"
                  stroke={isH ? node.role.color : `${node.role.color}60`}
                  strokeWidth={isH ? 2.5 : 1.5}
                  style={{ transition: 'r 150ms' }}
                />
                {/* icon */}
                <text x={node.x} y={node.y - 8} textAnchor="middle" fontSize={isH ? 18 : 15}>{node.role.icon}</text>
                {/* pct */}
                <text x={node.x} y={node.y + 10} textAnchor="middle"
                  fontSize="9" fontFamily="var(--font-mono)" fontWeight="700"
                  fill={node.pct > 0 ? node.role.color : 'var(--text-muted)'}
                >{node.pct}%</text>
              </g>
            )
          })}

          {/* labels — positioned outside orbit with extra clearance */}
          {nodes.map((node, i) => {
            const labelR = ORBIT_R + NODE_R + 26
            const lx = cx + labelR * Math.cos(node.angle)
            const ly = cy + labelR * Math.sin(node.angle)
            const cosA = Math.cos(node.angle)
            const anchor = cosA > 0.15 ? 'start' : cosA < -0.15 ? 'end' : 'middle'
            const isH = hovered === i

            return (
              <text key={node.id} x={lx} y={ly}
                textAnchor={anchor} dominantBaseline="middle"
                fontSize={isH ? 12 : 11}
                fontFamily="var(--font-body)" fontWeight={isH ? 700 : 500}
                fill={isH ? node.role.color : 'var(--text-secondary)'}
                style={{ cursor: 'pointer', transition: 'all 150ms' }}
                onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)}
              >
                {node.role.name}
              </text>
            )
          })}
        </svg>

        {/* side panel */}
        <div style={{ flex: 1, minWidth: 200 }}>
          {hovered === null ? (
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-muted)', letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 14 }}>
                All Roles
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {nodes.map(node => (
                  <div key={node.id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '6px 10px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', background: 'var(--bg-primary)', cursor: 'pointer', transition: 'border-color 150ms' }}
                    onMouseEnter={() => setHovered(nodes.findIndex(n => n.id === node.id))}
                    onMouseLeave={() => setHovered(null)}
                  >
                    <span style={{ fontSize: 14 }}>{node.role.icon}</span>
                    <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', flex: 1 }}>{node.role.name}</span>
                    <div style={{ width: 48, height: 4, background: 'var(--border)', borderRadius: 99, overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${node.pct}%`, background: node.role.color, borderRadius: 99 }} />
                    </div>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: node.pct > 0 ? node.role.color : 'var(--text-muted)', minWidth: 28, textAlign: 'right' }}>{node.pct}%</span>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 14, padding: '10px 12px', background: 'var(--bg-primary)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }}>
                <div style={{ fontSize: 11, color: 'var(--text-muted)', lineHeight: 1.7 }}>
                  Arc around each node = skill completion. Line thickness = shared skills. Hover to explore connections.
                </div>
              </div>
            </div>
          ) : (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16, padding: '10px 14px', borderRadius: 'var(--radius-md)', background: `${nodes[hovered].role.color}12`, border: `1px solid ${nodes[hovered].role.color}35` }}>
                <span style={{ fontSize: 24 }}>{nodes[hovered].role.icon}</span>
                <div>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 14, color: nodes[hovered].role.color }}>{nodes[hovered].role.name}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>{nodes[hovered].pct}% complete</div>
                </div>
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-muted)', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 10 }}>
                Shares skills with
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                {edges.filter(e => e.a === hovered || e.b === hovered)
                  .sort((a, b) => b.count - a.count)
                  .map(e => {
                    const oi = e.a === hovered ? e.b : e.a
                    const other = nodes[oi]
                    return (
                      <div key={oi} style={{ padding: '9px 12px', background: 'var(--bg-primary)', borderRadius: 'var(--radius-sm)', border: `1px solid ${other.role.color}30` }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 5 }}>
                          <span style={{ fontSize: 13 }}>{other.role.icon}</span>
                          <span style={{ fontSize: 12, fontWeight: 600, color: other.role.color }}>{other.role.name}</span>
                          <span style={{ marginLeft: 'auto', fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700, color: 'var(--gold)', background: 'var(--gold-dim)', padding: '1px 7px', borderRadius: 99 }}>{e.count}</span>
                        </div>
                        <div style={{ fontSize: 10, color: 'var(--text-muted)', lineHeight: 1.6 }}>
                          {e.skills.slice(0, 5).map(s => SKILLS[s]?.name).filter(Boolean).join(' · ')}
                          {e.skills.length > 5 && <span style={{ color: 'var(--text-muted)' }}> +{e.skills.length - 5} more</span>}
                        </div>
                      </div>
                    )
                  })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
