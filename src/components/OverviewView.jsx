import { useProgressContext } from '../App'
import { ROLES, SKILLS } from '../data/skills'
import RoleCard from './RoleCard'
import { RadarChart, RoleBarChart } from './Charts'
import RoleGraph from './RoleGraph'

function HeroStats() {
  const { getSkillProgress, getRoleProgress, getCategoryProgress } = useProgressContext()

  const allSkillIds = Object.keys(SKILLS)
  const totalSkills = allSkillIds.length
  const doneSkills = allSkillIds.filter(id => getSkillProgress(id).done).length
  const pct = Math.round((doneSkills / totalSkills) * 100)

  const roleEntries = Object.entries(ROLES)
  const readyRoles = roleEntries.filter(([id]) => getRoleProgress(id).pct >= 70).length
  const inProgressRoles = roleEntries.filter(([id]) => {
    const p = getRoleProgress(id).pct
    return p > 0 && p < 70
  }).length

  const totalSubtopics = allSkillIds.reduce((acc, id) => acc + getSkillProgress(id).subtopicsTotal, 0)
  const doneSubtopics = allSkillIds.reduce((acc, id) => acc + getSkillProgress(id).subtopicsDone, 0)

  const cats = getCategoryProgress()
  const strongestCat = cats.reduce((a, b) => a.pct >= b.pct ? a : b, { pct: 0, name: '—' })

  const stats = [
    {
      icon: '🎯',
      value: `${pct}%`,
      label: 'Overall Progress',
      sub: `${doneSkills} / ${totalSkills} skills`,
      accent: 'var(--gold)',
      glow: 'rgba(240,165,0,1)',
    },
    {
      icon: '✅',
      value: doneSubtopics,
      label: 'Topics Completed',
      sub: `of ${totalSubtopics} total`,
      accent: 'var(--green)',
      glow: 'rgba(34,197,94,1)',
    },
    {
      icon: '🚀',
      value: readyRoles,
      label: 'Roles ≥ 70%',
      sub: `${inProgressRoles} in progress`,
      accent: 'var(--cyan)',
      glow: 'rgba(0,212,255,1)',
    },
    {
      icon: '🏆',
      value: strongestCat.pct + '%',
      label: 'Best Category',
      sub: strongestCat.name,
      accent: 'var(--purple)',
      glow: 'rgba(139,92,246,1)',
    },
  ]

  return (
    <div className="hero-stats">
      {stats.map((s, i) => (
        <div key={i} className="hero-stat-card">
          {/* Top accent bar with glow */}
          <div className="hero-stat-top-bar" style={{
            background: `linear-gradient(90deg, ${s.accent}, ${s.accent}99)`,
            boxShadow: `0 0 20px ${s.glow}`,
          }} />
          {/* Glow blob in corner */}
          <div className="hero-stat-glow-blob" style={{ background: s.accent }} />
          {/* Diagonal shimmer layer */}
          <div style={{
            position: 'absolute', inset: 0, borderRadius: 'var(--radius-lg)',
            background: `linear-gradient(135deg, ${s.accent}06 0%, transparent 60%)`,
            pointerEvents: 'none',
          }} />
          <div className="hero-stat-icon">{s.icon}</div>
          <div className="hero-stat-value" style={{ color: s.accent }}>{s.value}</div>
          <div className="hero-stat-label">{s.label}</div>
          <div className="hero-stat-sub">{s.sub}</div>
        </div>
      ))}
    </div>
  )
}

function RoleReadinessBar() {
  const { getRoleProgress } = useProgressContext()
  const sorted = Object.entries(ROLES)
    .map(([id, role]) => ({ id, role, pct: getRoleProgress(id).pct }))
    .sort((a, b) => b.pct - a.pct)

  function barColor(pct) {
    if (pct >= 70) return 'var(--green)'
    if (pct >= 30) return 'var(--gold)'
    return 'var(--text-muted)'
  }

  return (
    <div className="readiness-bar">
      <div className="readiness-bar-header">Role Readiness — Ranked</div>
      <div className="readiness-list">
        {sorted.map(({ id, role, pct }) => (
          <div key={id} className="readiness-item">
            <div className="readiness-role-name">
              <span>{role.icon}</span>
              <span>{role.name}</span>
            </div>
            <div className="readiness-track">
              <div
                className="readiness-fill"
                style={{
                  width: `${pct}%`,
                  background: pct >= 70
                    ? `linear-gradient(90deg, ${role.color}, #10b981)`
                    : `linear-gradient(90deg, ${role.color}cc, ${role.color})`,
                  boxShadow: pct > 0 ? `0 0 10px ${role.color}60` : 'none',
                }}
              />
            </div>
            <div className="readiness-pct" style={{ color: barColor(pct) }}>{pct}%</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function OverviewView({ onSelectRole }) {
  return (
    <div>
      <HeroStats />
      <RoleReadinessBar />

      <div className="charts-row">
        <RadarChart />
        <RoleBarChart />
      </div>

      <div className="charts-row" style={{ gridTemplateColumns: '1fr' }}>
        <RoleGraph />
      </div>

      <div className="overview-header" style={{ marginBottom: 16 }}>
        <span className="section-title">All Roles — click to track skills</span>
      </div>

      <div className="roles-grid">
        {Object.keys(ROLES).map(roleId => (
          <RoleCard key={roleId} roleId={roleId} onSelect={onSelectRole} />
        ))}
      </div>
    </div>
  )
}
