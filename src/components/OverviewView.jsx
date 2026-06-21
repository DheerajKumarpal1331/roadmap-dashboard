import { useProgressContext } from '../App'
import { ROLES, SKILLS } from '../data/skills'
import RoleCard from './RoleCard'
import { RadarChart } from './Charts'
import RoleGraph from './RoleGraph'

function ProgressHeader() {
  const { getSkillProgress, getRoleProgress } = useProgressContext()

  const allSkillIds = Object.keys(SKILLS)
  const totalSkills = allSkillIds.length
  const doneSkills = allSkillIds.filter(id => getSkillProgress(id).done).length
  const pct = Math.round((doneSkills / totalSkills) * 100)

  const totalSubtopics = allSkillIds.reduce((acc, id) => acc + getSkillProgress(id).subtopicsTotal, 0)
  const doneSubtopics = allSkillIds.reduce((acc, id) => acc + getSkillProgress(id).subtopicsDone, 0)

  const readyRoles = Object.keys(ROLES).filter(id => getRoleProgress(id).pct >= 70).length

  return (
    <div className="progress-header">
      <div className="progress-header-row">
        <div className="progress-pct">{pct}%</div>
        <div className="progress-meta">
          <span>{doneSkills} of {totalSkills} skills done</span>
          <span className="progress-meta-sep">·</span>
          <span>{doneSubtopics} of {totalSubtopics} topics</span>
          <span className="progress-meta-sep">·</span>
          <span>{readyRoles} roles ≥ 70%</span>
        </div>
      </div>
      <div className="progress-track">
        <div className="progress-fill" style={{ width: `${pct}%` }} />
      </div>
    </div>
  )
}

function RoleReadinessCard() {
  const { getRoleProgress } = useProgressContext()

  const sorted = Object.entries(ROLES)
    .map(([id, role]) => ({ id, role, pct: getRoleProgress(id).pct }))
    .sort((a, b) => b.pct - a.pct)

  return (
    <div className="readiness-card">
      <div className="readiness-card-header">
        <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.7px', fontFamily: 'var(--mono)' }}>
          Role Readiness
        </div>
      </div>
      <div className="readiness-rows">
        {sorted.map(({ id, role, pct }) => (
          <div key={id} className="readiness-row">
            <div className="readiness-role-icon">{role.icon}</div>
            <div className="readiness-role-name">{role.name}</div>
            <div className="readiness-bar">
              <div className="readiness-fill" style={{ width: `${pct}%`, background: role.color }} />
            </div>
            <div className="readiness-pct-val" style={{ color: pct >= 70 ? 'var(--green)' : pct > 0 ? 'var(--amber)' : 'var(--text-3)' }}>
              {pct}%
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function OverviewView({ onSelectRole }) {
  return (
    <div>
      <ProgressHeader />

      <div className="overview-columns">
        <RoleReadinessCard />
        <RadarChart />
      </div>

      <div style={{ marginBottom: 20 }}>
        <RoleGraph />
      </div>

      <div className="roles-section-label">All Roles — click to track skills</div>

      <div className="roles-grid">
        {Object.keys(ROLES).map(roleId => (
          <RoleCard key={roleId} roleId={roleId} onSelect={onSelectRole} />
        ))}
      </div>
    </div>
  )
}
