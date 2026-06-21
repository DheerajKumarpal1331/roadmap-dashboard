import { useState } from 'react'
import { useProgressContext } from '../App'
import { ROLES, SKILLS } from '../data/skills'

function RoleBadge({ roleId }) {
  const role = ROLES[roleId]
  if (!role) return null
  return (
    <span className="role-badge" style={{ background: `${role.color}20`, color: role.color, border: `1px solid ${role.color}40` }}>
      {role.icon} {role.name}
    </span>
  )
}

export default function SkillItem({ skillId }) {
  const { progress, toggleSkill, toggleSubtopic, getSkillProgress } = useProgressContext()
  const [open, setOpen] = useState(false)
  const skill = SKILLS[skillId]
  const { done, subtopicsDone, subtopicsTotal } = getSkillProgress(skillId)
  const partial = !done && subtopicsDone > 0
  const p = progress[skillId]

  const statusClass = done ? 'tag-done' : partial ? 'tag-partial' : 'tag-pending'
  const statusLabel = done ? 'Done' : partial ? `${subtopicsDone}/${subtopicsTotal}` : 'Pending'

  return (
    <div className="skill-item">
      <div className="skill-item-header" onClick={() => setOpen(o => !o)}>
        {/* master checkbox */}
        <div
          className={`skill-checkbox ${done ? 'done' : partial ? 'partial' : ''}`}
          onClick={e => { e.stopPropagation(); toggleSkill(skillId) }}
        >
          {done && <span className="skill-checkbox-tick">✓</span>}
          {!done && partial && <span className="skill-checkbox-partial" />}
        </div>

        <span className={`skill-item-name ${done ? 'done' : ''}`}>{skill.name}</span>

        <div className="skill-row-badges">
          {skill.roles.map(r => <RoleBadge key={r} roleId={r} />)}
        </div>

        <span className={`tag ${statusClass}`}>{statusLabel}</span>

        <span className={`skill-row-expand ${open ? 'open' : ''}`}>▶</span>
      </div>

      {open && (
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
      )}
    </div>
  )
}
