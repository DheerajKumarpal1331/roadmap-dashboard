import { useState, useMemo } from 'react'
import { CERTIFICATIONS, loadCerts, saveCerts } from '../data/certifications'
import { ROLES } from '../data/skills'

const PROVIDER_COLORS = {
  GCP: '#4285f4', AWS: '#f59e0b', Azure: '#0078d4', Databricks: '#ef4444',
  Snowflake: '#29b5e8', DLAI: '#e40046', Google: '#4285f4',
  Tableau: '#e97627', Confluent: '#cc0000',
  K8s: '#326ce5', HashiCorp: '#7b42bc', dbt: '#f97316', NVIDIA: '#76b900',
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

  const statsCards = [
    { label: 'Total', value: totalAll, color: '#2563eb', icon: '🎓' },
    { label: 'Completed', value: totalDone, color: '#16a34a', icon: '✅' },
    { label: 'Remaining', value: totalAll - totalDone, color: '#d97706', icon: '⏳' },
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>

      {/* Stats row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
        {statsCards.map(s => (
          <div key={s.label} style={{
            background: '#fff',
            border: '1px solid #e4e4e7',
            borderRadius: 14,
            padding: '18px 20px 16px',
            position: 'relative', overflow: 'hidden',
            boxShadow: '0 1px 3px rgba(0,0,0,0.07)',
          }}>
            <div style={{
              position: 'absolute', top: 0, left: 0, right: 0, height: 3,
              background: s.color,
              borderRadius: '14px 14px 0 0',
            }} />
            <div style={{ fontSize: 20, marginBottom: 8 }}>{s.icon}</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 30, fontWeight: 700, color: s.color, lineHeight: 1, marginBottom: 6, letterSpacing: '-1px' }}>{s.value}</div>
            <div style={{ fontSize: 11, color: '#a1a1aa', textTransform: 'uppercase', letterSpacing: 1, fontWeight: 600 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Certs by role */}
      <div style={{ background: '#fff', border: '1px solid #e4e4e7', borderRadius: 14, padding: '16px 20px', boxShadow: '0 1px 3px rgba(0,0,0,0.07)' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#a1a1aa', letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 14, display: 'flex', alignItems: 'center', gap: 10 }}>
          Certifications by Role
          <span style={{ flex: 1, height: 1, background: '#e4e4e7', display: 'block' }} />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 10 }}>
          {Object.entries(ROLES).map(([roleId, role]) => {
            const roleCerts = Object.entries(CERTIFICATIONS).filter(([, c]) => c.roles.includes(roleId))
            const roleDone = roleCerts.filter(([id]) => certs[id]).length
            const pct = roleCerts.length > 0 ? Math.round((roleDone / roleCerts.length) * 100) : 0
            return (
              <div key={roleId} style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 11, fontWeight: 600, color: '#52525b', display: 'flex', gap: 5, alignItems: 'center' }}>
                    {role.icon} {role.name}
                  </span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: pct > 0 ? role.color : '#a1a1aa' }}>
                    {roleDone}/{roleCerts.length}
                  </span>
                </div>
                <div style={{ height: 5, background: '#f4f4f5', borderRadius: 99, overflow: 'hidden', border: '1px solid #e4e4e7' }}>
                  <div style={{ height: '100%', width: `${pct}%`, background: role.color, borderRadius: 99, transition: 'width 600ms ease' }} />
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

      {/* Cert list */}
      {filtered.length === 0 ? (
        <div className="empty-state"><div className="empty-state-icon">🎓</div>No certifications match filters.</div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {byProvider.map(([badge, certPairs]) => {
            const providerColor = PROVIDER_COLORS[badge] || '#52525b'
            const doneCnt = certPairs.filter(([id]) => certs[id]).length
            return (
              <div key={badge} style={{ background: '#fff', border: '1px solid #e4e4e7', borderRadius: 14, overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
                {/* Provider header */}
                <div style={{ padding: '11px 18px', borderBottom: '1px solid #f4f4f5', display: 'flex', alignItems: 'center', gap: 10, background: '#fafafa' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700, color: providerColor, background: `${providerColor}14`, border: `1px solid ${providerColor}30`, padding: '2px 8px', borderRadius: 99 }}>{badge}</span>
                  <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 13, color: '#09090b' }}>
                    {certPairs[0][1].provider.split(' /')[0]}
                  </span>
                  <span style={{ marginLeft: 'auto', fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 600, color: doneCnt > 0 ? '#16a34a' : '#a1a1aa' }}>
                    {doneCnt}/{certPairs.length}
                  </span>
                </div>
                {/* Cert rows */}
                <div>
                  {certPairs.map(([certId, cert]) => {
                    const done = !!certs[certId]
                    const diffColor = cert.difficulty === 1 ? '#16a34a' : cert.difficulty === 2 ? '#d97706' : '#dc2626'
                    const diffLabel = ['', 'Beginner', 'Intermediate', 'Advanced'][cert.difficulty]
                    return (
                      <div
                        key={certId}
                        onClick={() => toggleCert(certId)}
                        style={{
                          display: 'flex', alignItems: 'center', gap: 12,
                          padding: '11px 18px',
                          borderBottom: '1px solid #f4f4f5',
                          cursor: 'pointer',
                          background: done ? '#f0fdf4' : '#fff',
                          transition: 'background 150ms',
                        }}
                      >
                        <div style={{
                          width: 17, height: 17, borderRadius: 5,
                          border: `1.5px solid ${done ? '#16a34a' : '#d4d4d8'}`,
                          background: done ? '#dcfce7' : '#fff',
                          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                          transition: 'all 150ms',
                        }}>
                          {done && <span style={{ fontSize: 10, color: '#16a34a', fontWeight: 700 }}>✓</span>}
                        </div>

                        <span style={{
                          flex: 1, fontSize: 13, fontWeight: 500,
                          color: done ? '#a1a1aa' : '#09090b',
                          textDecoration: done ? 'line-through' : 'none',
                        }}>
                          {cert.name}
                        </span>

                        <span style={{ fontSize: 10, fontWeight: 600, padding: '2px 8px', borderRadius: 99, background: '#f4f4f5', color: '#71717a', whiteSpace: 'nowrap' }}>
                          {cert.level}
                        </span>

                        <span style={{ fontSize: 10, fontWeight: 600, color: diffColor, whiteSpace: 'nowrap', minWidth: 80 }}>
                          {'●'.repeat(cert.difficulty)}{'○'.repeat(3 - cert.difficulty)} {diffLabel}
                        </span>

                        <span style={{
                          fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 99, whiteSpace: 'nowrap',
                          background: cert.cost === 'free' ? '#f0fdf4' : '#fffbeb',
                          color: cert.cost === 'free' ? '#16a34a' : '#d97706',
                          border: `1px solid ${cert.cost === 'free' ? '#bbf7d0' : '#fde68a'}`,
                        }}>
                          {cert.cost === 'free' ? 'FREE' : 'PAID'}
                        </span>

                        <div style={{ display: 'flex', gap: 3, flexWrap: 'wrap', justifyContent: 'flex-end', maxWidth: 120 }}>
                          {cert.roles.slice(0, 3).map(r => (
                            <span key={r} className="role-badge" style={{
                              background: `${ROLES[r]?.color}14`, color: ROLES[r]?.color,
                              border: `1px solid ${ROLES[r]?.color}30`,
                            }}>
                              {ROLES[r]?.icon}
                            </span>
                          ))}
                          {cert.roles.length > 3 && (
                            <span className="role-badge" style={{ background: '#f4f4f5', color: '#a1a1aa' }}>+{cert.roles.length - 3}</span>
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
