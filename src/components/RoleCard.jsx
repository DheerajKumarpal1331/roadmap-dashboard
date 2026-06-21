import { useProgressContext } from '../App'
import { ROLES } from '../data/skills'

export default function RoleCard({ roleId, onSelect }) {
  const { getRoleProgress } = useProgressContext()
  const role = ROLES[roleId]
  const { doneSkills, totalSkills, doneSubtopics, totalSubtopics, pct } = getRoleProgress(roleId)

  const status = pct === 0 ? 'not-started' : pct === 100 ? 'complete' : 'in-progress'

  const statusStyles = {
    'not-started': { color: '#a8a6a1', bg: '#f7f6f4', border: '#e2e1de', label: 'Not started' },
    'in-progress':  { color: '#92400e', bg: '#fff7ed', border: '#fed7aa', label: 'In progress' },
    'complete':     { color: '#166534', bg: '#f0fdf4', border: '#bbf7d0', label: 'Complete' },
  }[status]

  return (
    <div
      className="role-card"
      onClick={() => onSelect(roleId)}
      style={{ '--role-color': role.color }}
    >
      <div className="role-card-top">
        <div className="role-card-icon">{role.icon}</div>
        <div className="role-card-pct" style={{ color: pct > 0 ? role.color : '#a8a6a1' }}>{pct}%</div>
      </div>

      <div className="role-card-name">{role.name}</div>

      <div className="role-card-track">
        <div className="role-card-fill" style={{ width: `${pct}%`, background: role.color }} />
      </div>

      <div className="role-card-stats">
        <span className="role-card-stat-text">{doneSkills}/{totalSkills} skills</span>
        <div
          className="role-card-status"
          style={{
            color: statusStyles.color,
            background: statusStyles.bg,
            border: `1px solid ${statusStyles.border}`,
          }}
        >
          {statusStyles.label}
        </div>
      </div>
    </div>
  )
}
