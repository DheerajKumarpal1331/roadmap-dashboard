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
            {edges.map((e) => (
              <linearGradient key={`eg-${e.a}-${e.b}`} id={`eg-${e.a}-${e.b}`}
                x1={nodes[e.a].x} y1={nodes[e.a].y} x2={nodes[e.b].x} y2={nodes[e.b].y} gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor={nodes[e.a].role.color} />
                <stop offset="100%" stopColor={nodes[e.b].role.color} />
              </linearGradient>
            ))}
          </defs>

          {/* orbit ring */}
          <circle cx={cx} cy={cy} r={ORBIT_R} fill="none" stroke="#e4e4e7" strokeWidth={1} strokeDasharray="3 7" />
          {/* center dot */}
          <circle cx={cx} cy={cy} r={4} fill="#d97706" opacity={0.5} />

          {/* edges */}
          {edges.map((e, i) => {
            const na = nodes[e.a], nb = nodes[e.b]
            const hi = isConnected(e, hovered)
            const dim = hovered !== null && !hi
            const strokeW = Math.max(0.8, (e.count / maxShared) * 4.5)
            const mx = (na.x + nb.x) / 2, my = (na.y + nb.y) / 2
            const px = cx + (mx - cx) * 0.25, py = cy + (my - cy) * 0.25

            return (
              <g key={i}>
                <path
                  d={`M${na.x},${na.y} Q${px},${py} ${nb.x},${nb.y}`}
                  fill="none"
                  stroke={hi ? `url(#eg-${e.a}-${e.b})` : '#d4d4d8'}
                  strokeWidth={hi ? strokeW + 1.5 : 0.8}
                  opacity={dim ? 0.05 : hi ? 1 : 0.5}
                  style={{ transition: 'opacity 180ms, stroke-width 180ms' }}
                />
                {hi && (
                  <text
                    x={(na.x + nb.x) / 2 * 0.55 + px * 0.45}
                    y={(na.y + nb.y) / 2 * 0.55 + py * 0.45}
                    textAnchor="middle" dominantBaseline="middle"
                    fontSize="9" fontFamily="var(--font-mono)" fontWeight="700"
                    fill="#d97706"
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
              <g key={node.id} opacity={isDim ? 0.2 : 1}
                style={{ cursor: 'pointer', transition: 'opacity 180ms' }}
                onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)}
              >
                {/* progress arc */}
                {node.pct > 0 && (
                  <circle cx={node.x} cy={node.y} r={arcR} fill="none"
                    stroke={node.role.color} strokeWidth={3} strokeLinecap="round"
                    strokeDasharray={`${dash} ${circ}`}
                    transform={`rotate(-90 ${node.x} ${node.y})`}
                    opacity={0.8}
                  />
                )}
                {/* node bg */}
                <circle cx={node.x} cy={node.y} r={r} fill="#fff"
                  stroke={isH ? node.role.color : '#e4e4e7'}
                  strokeWidth={isH ? 2 : 1.5}
                />
                {/* icon */}
                <text x={node.x} y={node.y - 8} textAnchor="middle" fontSize={isH ? 18 : 15}>{node.role.icon}</text>
                {/* pct */}
                <text x={node.x} y={node.y + 10} textAnchor="middle"
                  fontSize="9" fontFamily="var(--font-mono)" fontWeight="700"
                  fill={node.pct > 0 ? node.role.color : '#a1a1aa'}
                >{node.pct}%</text>
              </g>
            )
          })}

          {/* labels */}
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
                fontFamily="var(--font-sans)" fontWeight={isH ? 700 : 500}
                fill={isH ? node.role.color : '#52525b'}
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
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#a1a1aa', letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 12 }}>
                All Roles
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                {nodes.map(node => (
                  <div key={node.id} style={{ display: 'flex', alignItems: 'center', gap: 9, padding: '6px 10px', borderRadius: 8, border: '1px solid #e4e4e7', background: '#fff', cursor: 'pointer', transition: 'border-color 150ms' }}
                    onMouseEnter={() => setHovered(nodes.findIndex(n => n.id === node.id))}
                    onMouseLeave={() => setHovered(null)}
                  >
                    <span style={{ fontSize: 14 }}>{node.role.icon}</span>
                    <span style={{ fontSize: 12, fontWeight: 600, color: '#52525b', flex: 1 }}>{node.role.name}</span>
                    <div style={{ width: 44, height: 4, background: '#f4f4f5', borderRadius: 99, overflow: 'hidden', border: '1px solid #e4e4e7' }}>
                      <div style={{ height: '100%', width: `${node.pct}%`, background: node.role.color, borderRadius: 99 }} />
                    </div>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: node.pct > 0 ? node.role.color : '#a1a1aa', minWidth: 28, textAlign: 'right' }}>{node.pct}%</span>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 12, padding: '9px 11px', background: '#fafafa', borderRadius: 8, border: '1px solid #e4e4e7' }}>
                <div style={{ fontSize: 11, color: '#a1a1aa', lineHeight: 1.7 }}>
                  Arc = skill completion. Line thickness = shared skills. Hover to explore connections.
                </div>
              </div>
            </div>
          ) : (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14, padding: '10px 13px', borderRadius: 10, background: `${nodes[hovered].role.color}0d`, border: `1px solid ${nodes[hovered].role.color}30` }}>
                <span style={{ fontSize: 22 }}>{nodes[hovered].role.icon}</span>
                <div>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 14, color: nodes[hovered].role.color }}>{nodes[hovered].role.name}</div>
                  <div style={{ fontSize: 11, color: '#a1a1aa', fontFamily: 'var(--font-mono)' }}>{nodes[hovered].pct}% complete</div>
                </div>
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#a1a1aa', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 8 }}>
                Shares skills with
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {edges.filter(e => e.a === hovered || e.b === hovered)
                  .sort((a, b) => b.count - a.count)
                  .map(e => {
                    const oi = e.a === hovered ? e.b : e.a
                    const other = nodes[oi]
                    return (
                      <div key={oi} style={{ padding: '9px 12px', background: '#fff', borderRadius: 8, border: `1px solid ${other.role.color}25` }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 5 }}>
                          <span style={{ fontSize: 13 }}>{other.role.icon}</span>
                          <span style={{ fontSize: 12, fontWeight: 600, color: other.role.color }}>{other.role.name}</span>
                          <span style={{ marginLeft: 'auto', fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700, color: '#d97706', background: '#fffbeb', padding: '1px 7px', borderRadius: 99, border: '1px solid #fde68a' }}>{e.count}</span>
                        </div>
                        <div style={{ fontSize: 10, color: '#a1a1aa', lineHeight: 1.6 }}>
                          {e.skills.slice(0, 5).map(s => SKILLS[s]?.name).filter(Boolean).join(' · ')}
                          {e.skills.length > 5 && <span> +{e.skills.length - 5} more</span>}
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
