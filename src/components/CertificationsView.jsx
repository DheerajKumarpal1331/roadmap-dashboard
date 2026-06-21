import { useState, useMemo } from 'react'
import { CERTIFICATIONS, loadCerts, saveCerts } from '../data/certifications'
import { ROLES } from '../data/skills'

const PROVIDER_COLORS = {
  GCP: '#4285f4', AWS: '#ff9900', Azure: '#0078d4', Databricks: '#ff3621',
  Snowflake: '#29b5e8', DLAI: '#e40046', Google: '#4285f4', IBM: '#054ada',
  PyInst: '#3776ab', Oracle: '#f80000', Tableau: '#e97627', Confluent: '#cc0000',
  K8s: '#326ce5', HashiCorp: '#7b42bc', dbt: '#ff694a', Astronomer: '#017CEE',
  NVIDIA: '#76b900', Meta: '#1877f2', DataCamp: '#03ef62'
}

function useCerts() {
  const [certs, setCerts] = useState(loadCerts)

  function toggleCert(certId) {
    setCerts(prev => {
      const next = { ...prev, [certId]: !prev[certId] }
      saveCerts(next)
      return next
    })
  }

  return { certs, toggleCert }
}

export default function CertificationsView() {
  const { certs, toggleCert } = useCerts()
  const [filterRole, setFilterRole] = useState('all')
  const [filterLevel, setFilterLevel] = useState('all')
  const [filterCost, setFilterCost] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')

  const filtered = useMemo(() => {
    return Object.entries(CERTIFICATIONS).filter(([id, cert]) => {
      if (filterRole !== 'all' && !cert.roles.includes(filterRole)) return false
      if (filterLevel !== 'all' && cert.level !== filterLevel) return false
      if (filterCost !== 'all' && cert.cost !== filterCost) return false
      if (filterStatus === 'done' && !certs[id]) return false
      if (filterStatus === 'pending' && certs[id]) return false
      return true
    })
  }, [filterRole, filterLevel, filterCost, filterStatus, certs])

  // Group by provider
  const byProvider = useMemo(() => {
    const map = {}
    filtered.forEach(([id, cert]) => {
      if (!map[cert.badge]) map[cert.badge] = []
      map[cert.badge].push([id, cert])
    })
    return Object.entries(map).sort((a, b) => a[0].localeCompare(b[0]))
  }, [filtered])

  const totalDone = Object.values(certs).filter(Boolean).length
  const totalAll = Object.keys(CERTIFICATIONS).length
  const filteredDone = filtered.filter(([id]) => certs[id]).length

  const levels = [...new Set(Object.values(CERTIFICATIONS).map(c => c.level))].sort()

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

      {/* Header stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
        {[
          { label: 'Total Certifications', value: totalAll, color: 'var(--cyan)', glow: 'rgba(6,182,212,0.35)', icon: '🎓' },
          { label: 'Completed', value: totalDone, color: 'var(--green)', glow: 'rgba(16,185,129,0.35)', icon: '✅' },
          { label: 'Remaining', value: totalAll - totalDone, color: 'var(--gold)', glow: 'rgba(245,158,11,0.4)', icon: '⏳' }
        ].map(s => (
          <div key={s.label} style={{
            background: 'var(--glass)', backdropFilter: 'var(--blur)', WebkitBackdropFilter: 'var(--blur)',
            border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)',
            padding: '22px 22px 20px', position: 'relative', overflow: 'hidden',
            boxShadow: 'var(--shadow-card)',
            transition: 'all 220ms ease',
          }}>
            <div style={{
              position: 'absolute', top: 0, left: 0, right: 0, height: 2,
              background: s.color, boxShadow: `0 0 16px ${s.glow}`,
              borderRadius: 'var(--radius-lg) var(--radius-lg) 0 0',
            }} />
            <div style={{
              position: 'absolute', top: -30, right: -30, width: 110, height: 110,
              borderRadius: '50%', background: s.color, opacity: 0.07,
              filter: 'blur(24px)', pointerEvents: 'none',
            }} />
            <div style={{ fontSize: 20, marginBottom: 10, position: 'relative' }}>{s.icon}</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 34, fontWeight: 700, color: s.color, lineHeight: 1, marginBottom: 8, letterSpacing: '-1px', position: 'relative' }}>{s.value}</div>
            <div style={{ fontSize: 10, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: 1.2, fontWeight: 700, position: 'relative' }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Role progress mini-bars */}
      <div style={{ background: 'var(--glass)', backdropFilter: 'var(--blur)', WebkitBackdropFilter: 'var(--blur)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '18px 22px', boxShadow: 'var(--shadow-card)' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-muted)', letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 14 }}>
          Certifications by Role
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 10 }}>
          {Object.entries(ROLES).map(([roleId, role]) => {
            const roleCerts = Object.entries(CERTIFICATIONS).filter(([, c]) => c.roles.includes(roleId))
            const roleDone = roleCerts.filter(([id]) => certs[id]).length
            const pct = roleCerts.length > 0 ? Math.round((roleDone / roleCerts.length) * 100) : 0
            return (
              <div key={roleId} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-secondary)', display: 'flex', gap: 5 }}>
                    {role.icon} {role.name}
                  </span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: pct > 0 ? role.color : 'var(--text-muted)' }}>
                    {roleDone}/{roleCerts.length}
                  </span>
                </div>
                <div style={{ height: 5, background: 'rgba(255,255,255,0.04)', borderRadius: 99, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <div style={{ height: '100%', width: `${pct}%`, background: `linear-gradient(90deg, ${role.color}cc, ${role.color})`, borderRadius: 99, transition: 'width 600ms ease', boxShadow: pct > 0 ? `0 0 8px ${role.color}50` : 'none' }} />
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Filters */}
      <div className="skills-filters">
        <span className="filter-label">Filter:</span>
        <select className="filter-select" value={filterRole} onChange={e => setFilterRole(e.target.value)}>
          <option value="all">All Roles</option>
          {Object.entries(ROLES).map(([id, r]) => <option key={id} value={id}>{r.icon} {r.name}</option>)}
        </select>
        <div className="filter-divider" />
        <select className="filter-select" value={filterLevel} onChange={e => setFilterLevel(e.target.value)}>
          <option value="all">All Levels</option>
          {levels.map(l => <option key={l} value={l}>{l}</option>)}
        </select>
        <div className="filter-divider" />
        <select className="filter-select" value={filterCost} onChange={e => setFilterCost(e.target.value)}>
          <option value="all">Free & Paid</option>
          <option value="free">Free</option>
          <option value="paid">Paid</option>
        </select>
        <div className="filter-divider" />
        <select className="filter-select" value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
          <option value="all">All Status</option>
          <option value="done">Done</option>
          <option value="pending">Pending</option>
        </select>
        <div className="skills-stats">{filteredDone} / {filtered.length} done</div>
      </div>

      {/* Cert table grouped by provider */}
      {filtered.length === 0 ? (
        <div className="empty-state"><div className="empty-state-icon">🎓</div>No certifications match filters.</div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {byProvider.map(([badge, certPairs]) => {
            const providerColor = PROVIDER_COLORS[badge] || 'var(--text-secondary)'
            const doneCnt = certPairs.filter(([id]) => certs[id]).length
            return (
              <div key={badge} style={{ background: 'var(--glass)', backdropFilter: 'var(--blur)', WebkitBackdropFilter: 'var(--blur)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: 'var(--shadow-card)' }}>
                {/* Provider header */}
                <div style={{ padding: '13px 20px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 10, background: 'rgba(0,0,0,0.2)' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700, color: providerColor, background: `${providerColor}18`, border: `1px solid ${providerColor}40`, padding: '2px 8px', borderRadius: 99 }}>{badge}</span>
                  <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 13, color: 'var(--text-primary)' }}>
                    {certPairs[0][1].provider.split(' /')[0]}
                  </span>
                  <span style={{ marginLeft: 'auto', fontFamily: 'var(--font-mono)', fontSize: 11, color: doneCnt > 0 ? 'var(--green)' : 'var(--text-muted)' }}>
                    {doneCnt}/{certPairs.length}
                  </span>
                </div>
                {/* Cert rows */}
                <div>
                  {certPairs.map(([certId, cert]) => {
                    const done = !!certs[certId]
                    const diffColor = cert.difficulty === 1 ? 'var(--green)' : cert.difficulty === 2 ? 'var(--gold)' : '#ef4444'
                    const diffLabel = ['', 'Beginner', 'Intermediate', 'Advanced'][cert.difficulty]
                    return (
                      <div
                        key={certId}
                        onClick={() => toggleCert(certId)}
                        style={{
                          display: 'flex', alignItems: 'center', gap: 12,
                          padding: '11px 18px',
                          borderBottom: '1px solid var(--border)',
                          cursor: 'pointer',
                          background: done ? 'rgba(34,197,94,0.03)' : 'transparent',
                          transition: 'background 150ms'
                        }}
                      >
                        {/* checkbox */}
                        <div style={{
                          width: 18, height: 18, borderRadius: 5, border: `2px solid ${done ? 'var(--green)' : 'var(--border-bright)'}`,
                          background: done ? 'var(--green-dim)' : 'transparent',
                          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                          transition: 'all 150ms'
                        }}>
                          {done && <span style={{ fontSize: 11, color: 'var(--green)', fontWeight: 700 }}>✓</span>}
                        </div>

                        {/* name */}
                        <span style={{
                          flex: 1, fontSize: 13, fontWeight: 500,
                          color: done ? 'var(--text-muted)' : 'var(--text-primary)',
                          textDecoration: done ? 'line-through' : 'none',
                          textDecorationColor: 'var(--border-bright)'
                        }}>
                          {cert.name}
                        </span>

                        {/* level */}
                        <span style={{ fontSize: 10, fontWeight: 600, padding: '2px 8px', borderRadius: 99, background: 'var(--border)', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>
                          {cert.level}
                        </span>

                        {/* difficulty */}
                        <span style={{ fontSize: 10, fontWeight: 600, color: diffColor, whiteSpace: 'nowrap', minWidth: 72 }}>
                          {'●'.repeat(cert.difficulty)}{'○'.repeat(3 - cert.difficulty)} {diffLabel}
                        </span>

                        {/* cost */}
                        <span style={{
                          fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 99, whiteSpace: 'nowrap',
                          background: cert.cost === 'free' ? 'var(--green-dim)' : 'var(--gold-dim)',
                          color: cert.cost === 'free' ? 'var(--green)' : 'var(--gold)',
                          border: `1px solid ${cert.cost === 'free' ? 'rgba(34,197,94,0.3)' : 'rgba(240,165,0,0.3)'}`
                        }}>
                          {cert.cost === 'free' ? 'FREE' : 'PAID'}
                        </span>

                        {/* role badges */}
                        <div style={{ display: 'flex', gap: 3, flexWrap: 'wrap', justifyContent: 'flex-end', maxWidth: 140 }}>
                          {cert.roles.slice(0, 3).map(r => (
                            <span key={r} className="role-badge" style={{
                              background: `${ROLES[r]?.color}18`, color: ROLES[r]?.color,
                              border: `1px solid ${ROLES[r]?.color}35`
                            }}>
                              {ROLES[r]?.icon}
                            </span>
                          ))}
                          {cert.roles.length > 3 && (
                            <span className="role-badge" style={{ background: 'var(--border)', color: 'var(--text-muted)' }}>+{cert.roles.length - 3}</span>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
