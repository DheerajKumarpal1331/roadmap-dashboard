import { useProgressContext } from '../App'
import { ROLES } from '../data/skills'
import ProgressRing from './ProgressRing'

export default function RoleCard({ roleId, onSelect }) {
  const { getRoleProgress } = useProgressContext()
  const role = ROLES[roleId]
  const { doneSkills, totalSkills, doneSubtopics, totalSubtopics, pct } = getRoleProgress(roleId)

  const status = pct === 0 ? 'not-started' : pct === 100 ? 'complete' : 'in-progress'
  const statusLabel = { 'not-started': 'Not started', 'in-progress': 'In progress', 'complete': 'Complete' }[status]

  const statusStyle = {
    'not-started': { color: 'rgba(255,255,255,0.35)', bg: 'rgba(255,255,255,0.05)', border: 'rgba(255,255,255,0.08)' },
    'in-progress':  { color: '#f59e0b', bg: 'rgba(245,158,11,0.1)', border: 'rgba(245,158,11,0.25)' },
    'complete':     { color: '#10b981', bg: 'rgba(16,185,129,0.1)', border: 'rgba(16,185,129,0.25)' },
  }[status]

  return (
    <div
      className="role-card"
      onClick={() => onSelect(roleId)}
      style={{ '--role-color': role.color }}
    >
      {/* Radial glow from top-center */}
      <div
        className="role-card-bg"
        style={{ background: `radial-gradient(ellipse 80% 60% at 50% 0%, ${role.color}, transparent)` }}
      />
      {/* Subtle bottom edge glow on hover */}
      <div
        className="role-card-bottom-glow"
        style={{ background: `linear-gradient(90deg, transparent, ${role.color}80, transparent)` }}
      />

      <div className="role-card-icon">{role.icon}</div>
      <div className="role-card-name">{role.name}</div>

      <ProgressRing pct={pct} size={108} stroke={8} color={role.color} />

      <div className="role-card-stats">
        <div className="role-stat">
          <span className="role-stat-value" style={{ color: role.color }}>{doneSkills}</span>
          <span className="role-stat-label">of {totalSkills} skills</span>
        </div>
        <div className="role-stat-divider" />
        <div className="role-stat">
          <span className="role-stat-value" style={{ color: 'rgba(255,255,255,0.6)' }}>{doneSubtopics}</span>
          <span className="role-stat-label">of {totalSubtopics} topics</span>
        </div>
      </div>

      <div
        className="role-card-status"
        style={{ color: statusStyle.color, background: statusStyle.bg, borderColor: statusStyle.border }}
      >
        <span className="status-dot" style={{ background: statusStyle.color, boxShadow: status === 'in-progress' ? `0 0 8px ${statusStyle.color}` : 'none' }} />
        {statusLabel}
      </div>

      <span className="role-card-open-hint">open to track →</span>
    </div>
  )
}
