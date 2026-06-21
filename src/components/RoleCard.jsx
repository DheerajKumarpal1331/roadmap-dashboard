import { useProgressContext } from '../App'
import { ROLES } from '../data/skills'

export default function RoleCard({ roleId, onSelect }) {
  const { getRoleProgress } = useProgressContext()
  const role = ROLES[roleId]
  const { doneSkills, totalSkills, doneSubtopics, totalSubtopics, pct } = getRoleProgress(roleId)

  const status = pct === 0 ? 'Not started' : pct === 100 ? 'Complete' : 'In progress'

  return (
    <div
      onClick={() => onSelect(roleId)}
      style={{
        background: `linear-gradient(145deg, ${role.color}09 0%, transparent 55%), #fff`,
        border: '1px solid var(--border)',
        borderLeft: `4px solid ${role.color}`,
        borderRadius: 'var(--r-xl)',
        padding: '14px 16px 14px 14px',
        cursor: 'pointer',
        transition: 'box-shadow 150ms, transform 150ms, border-color 150ms',
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        animation: 'up 280ms ease both',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.boxShadow = 'var(--shadow-md)'
        e.currentTarget.style.transform = 'translateY(-2px)'
        e.currentTarget.style.borderColor = role.color
      }}
      onMouseLeave={e => {
        e.currentTarget.style.boxShadow = ''
        e.currentTarget.style.transform = ''
        e.currentTarget.style.borderColor = role.color
        e.currentTarget.style.borderTopColor = 'var(--border)'
        e.currentTarget.style.borderRightColor = 'var(--border)'
        e.currentTarget.style.borderBottomColor = 'var(--border)'
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
        <span style={{ fontSize: 20, lineHeight: 1 }}>{role.icon}</span>
        <span style={{ fontWeight: 700, fontSize: 14, color: 'var(--text)', letterSpacing: '-0.2px', lineHeight: 1.25 }}>
          {role.name}
        </span>
      </div>

      {/* Progress bar — thicker, role-colored track */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
        <div style={{
          flex: 1,
          height: 6,
          background: `${role.color}20`,
          borderRadius: 3,
          overflow: 'hidden',
        }}>
          <div style={{
            width: `${Math.max(pct, 0)}%`,
            height: '100%',
            background: role.color,
            borderRadius: 3,
            transition: 'width 500ms ease',
          }} />
        </div>
        <span style={{
          fontFamily: 'var(--mono)',
          fontSize: 14,
          fontWeight: 700,
          color: pct > 0 ? role.color : 'var(--text-3)',
          letterSpacing: '-0.5px',
          minWidth: 32,
          textAlign: 'right',
        }}>
          {pct}%
        </span>
      </div>

      {/* Footer */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--text-3)' }}>
          {doneSkills}/{totalSkills} skills
        </span>
        <span style={{
          fontSize: 10,
          fontWeight: 600,
          color: pct === 0 ? 'var(--text-3)' : pct === 100 ? 'var(--green)' : 'var(--amber)',
          letterSpacing: '0.1px',
        }}>
          {status}
        </span>
      </div>
    </div>
  )
}
