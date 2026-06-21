import { useState, useEffect } from 'react'
import { useProgressContext } from '../App'
import { ROLES, SKILLS } from '../data/skills'

function SkillCheckbox({ done, partial }) {
  return (
    <div className={`skill-checkbox ${done ? 'done' : partial ? 'partial' : ''}`}>
      {done && <span className="skill-checkbox-tick">✓</span>}
      {!done && partial && <span className="skill-checkbox-partial" />}
    </div>
  )
}

function RoleBadge({ roleId }) {
  const role = ROLES[roleId]
  if (!role) return null
  return (
    <span className="role-badge" style={{ background: `${role.color}18`, color: role.color, border: `1px solid ${role.color}35` }}>
      {role.icon} {role.name}
    </span>
  )
}

function SubtopicList({ skillId }) {
  const { progress, toggleSubtopic } = useProgressContext()
  const skill = SKILLS[skillId]
  const p = progress[skillId]

  return (
    <div className="subtopics-list">
      {skill.subtopics.map(sub => {
        const checked = !!(p?.subtopics?.[sub])
        return (
          <div key={sub} className="subtopic-item" onClick={() => toggleSubtopic(skillId, sub)}>
            <div className={`subtopic-checkbox ${checked ? 'done' : ''}`}>
              {checked && <span className="subtopic-tick">✓</span>}
            </div>
            <span className={`subtopic-name ${checked ? 'done' : ''}`}>{sub}</span>
          </div>
        )
      })}
    </div>
  )
}

function PanelSkillRow({ skillId, currentRoleId }) {
  const { toggleSkill, getSkillProgress } = useProgressContext()
  const [open, setOpen] = useState(false)
  const skill = SKILLS[skillId]
  const { done, subtopicsDone, subtopicsTotal } = getSkillProgress(skillId)
  const partial = !done && subtopicsDone > 0
  const sharedRoles = skill.roles.filter(r => r !== currentRoleId)

  return (
    <div className="skill-row">
      <div className="skill-row-header" onClick={() => setOpen(o => !o)}>
        <div onClick={e => { e.stopPropagation(); toggleSkill(skillId) }}>
          <SkillCheckbox done={done} partial={partial} />
        </div>
        <span className={`skill-row-name ${done ? 'done' : ''}`}>{skill.name}</span>
        <span className="skill-mini-progress">{subtopicsDone}/{subtopicsTotal}</span>
        <div className="skill-row-badges">
          {sharedRoles.slice(0, 2).map(r => <RoleBadge key={r} roleId={r} />)}
          {sharedRoles.length > 2 && (
            <span className="role-badge" style={{ background: 'var(--bg)', color: 'var(--text-3)', border: '1px solid var(--border)' }}>
              +{sharedRoles.length - 2}
            </span>
          )}
        </div>
        <span className={`skill-row-expand ${open ? 'open' : ''}`}>▶</span>
      </div>
      {open && <SubtopicList skillId={skillId} />}
    </div>
  )
}

export default function RoleDetail({ roleId, onClose }) {
  const { getRoleProgress } = useProgressContext()
  const role = ROLES[roleId]
  const { doneSkills, totalSkills, doneSubtopics, totalSubtopics, pct } = getRoleProgress(roleId)

  useEffect(() => {
    const onKey = e => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <>
      <div className="panel-overlay" onClick={onClose} />
      <aside className="panel">
        <div className="panel-header">
          <div className="panel-title-row">
            <div className="panel-role-name">
              <span>{role.icon}</span>
              <span style={{ color: role.color }}>{role.name}</span>
            </div>
            <button className="panel-close" onClick={onClose}>×</button>
          </div>

          <div className="panel-progress-summary">
            <div className="panel-progress-bar-wrap">
              <div className="panel-progress-bar-track">
                <div className="panel-progress-bar-fill" style={{ width: `${pct}%`, background: role.color }} />
              </div>
              <div className="panel-progress-label">{pct}% complete</div>
            </div>
            <div className="panel-stats-row">
              <div className="panel-stat">
                <span className="panel-stat-value" style={{ color: role.color }}>{doneSkills}</span>
                <span className="panel-stat-label">/ {totalSkills} skills</span>
              </div>
              <div className="panel-stat">
                <span className="panel-stat-value">{doneSubtopics}</span>
                <span className="panel-stat-label">/ {totalSubtopics} topics</span>
              </div>
            </div>
          </div>
        </div>

        <div className="panel-body">
          {role.skills.map(skillId => (
            <PanelSkillRow key={skillId} skillId={skillId} currentRoleId={roleId} />
          ))}
        </div>
      </aside>
    </>
  )
}
