import { useState, useMemo } from 'react'
import { SKILLS, ROLES, CATEGORIES } from '../data/skills'
import { useProgressContext } from '../App'
import SkillItem from './SkillItem'

const CAT_COLORS = {
  'Python': '#3b82f6',
  'SQL': '#06b6d4',
  'Programming Fundamentals': '#8b5cf6',
  'Mathematics & Statistics': '#f97316',
  'Machine Learning': '#ec4899',
  'Deep Learning': '#a855f7',
  'AI & LLMs': '#00d4ff',
  'Data Analysis': '#22c55e',
  'Data Engineering': '#f0a500',
  'MLOps & Infrastructure': '#ef4444',
}

const CAT_ICONS = {
  'Python': '🐍',
  'SQL': '🗄️',
  'Programming Fundamentals': '⚙️',
  'Mathematics & Statistics': '📐',
  'Machine Learning': '🤖',
  'Deep Learning': '🧠',
  'AI & LLMs': '✨',
  'Data Analysis': '📊',
  'Data Engineering': '🔧',
  'MLOps & Infrastructure': '🚀',
}

export default function SkillsView() {
  const { getSkillProgress } = useProgressContext()
  const [filterRole, setFilterRole] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterCategory, setFilterCategory] = useState('all')
  const [openCats, setOpenCats] = useState(() => new Set(CATEGORIES))

  function toggleCat(cat) {
    setOpenCats(prev => {
      const next = new Set(prev)
      next.has(cat) ? next.delete(cat) : next.add(cat)
      return next
    })
  }

  const filteredSkills = useMemo(() => {
    return Object.entries(SKILLS).filter(([skillId, skill]) => {
      if (filterRole !== 'all' && !skill.roles.includes(filterRole)) return false
      if (filterCategory !== 'all' && skill.category !== filterCategory) return false
      if (filterStatus !== 'all') {
        const { done, subtopicsDone } = getSkillProgress(skillId)
        const partial = !done && subtopicsDone > 0
        if (filterStatus === 'done' && !done) return false
        if (filterStatus === 'in-progress' && !partial) return false
        if (filterStatus === 'pending' && (done || partial)) return false
      }
      return true
    })
  }, [filterRole, filterStatus, filterCategory, getSkillProgress])

  const byCategory = useMemo(() => {
    const map = {}
    filteredSkills.forEach(([skillId, skill]) => {
      if (!map[skill.category]) map[skill.category] = []
      map[skill.category].push(skillId)
    })
    return map
  }, [filteredSkills])

  const totalDone = filteredSkills.filter(([id]) => getSkillProgress(id).done).length

  return (
    <div className="skills-view">
      {/* Filters */}
      <div className="skills-filters">
        <span className="filter-label">Filter:</span>

        <select className="filter-select" value={filterRole} onChange={e => setFilterRole(e.target.value)}>
          <option value="all">All Roles</option>
          {Object.entries(ROLES).map(([id, r]) => (
            <option key={id} value={id}>{r.icon} {r.name}</option>
          ))}
        </select>

        <div className="filter-divider" />

        <select className="filter-select" value={filterCategory} onChange={e => setFilterCategory(e.target.value)}>
          <option value="all">All Categories</option>
          {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
        </select>

        <div className="filter-divider" />

        <select className="filter-select" value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
          <option value="all">All Status</option>
          <option value="done">Done</option>
          <option value="in-progress">In Progress</option>
          <option value="pending">Pending</option>
        </select>

        <div className="skills-stats">
          {totalDone} / {filteredSkills.length} skills done
        </div>
      </div>

      {/* Categories */}
      {filteredSkills.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">🔍</div>
          No skills match current filters.
        </div>
      ) : (
        CATEGORIES
          .filter(cat => byCategory[cat]?.length > 0)
          .map(cat => {
            const skillIds = byCategory[cat]
            const isOpen = openCats.has(cat)
            const catDone = skillIds.filter(id => getSkillProgress(id).done).length
            const catPct = Math.round((catDone / skillIds.length) * 100)
            const catPctColor = catPct >= 70 ? '#16a34a' : catPct >= 30 ? '#d97706' : '#a1a1aa'
            const catColor = CAT_COLORS[cat] || '#a1a1aa'
            const catIcon = CAT_ICONS[cat] || '📁'

            return (
              <div key={cat} className="category-group">
                <div
                  className={`category-header ${isOpen ? 'open' : ''}`}
                  onClick={() => toggleCat(cat)}
                  style={{ '--cat-color': catColor }}
                >
                  <span style={{ fontSize: 14 }}>{catIcon}</span>
                  <span className="category-name">{cat}</span>
                  <span className="category-count">{catDone}/{skillIds.length}</span>
                  <div className="category-track">
                    <div className="category-fill" style={{ width: `${catPct}%`, background: catColor }} />
                  </div>
                  <span className="category-pct" style={{ color: catColor }}>{catPct}%</span>
                  <span className={`category-chevron ${isOpen ? 'open' : ''}`}>▾</span>
                </div>

                {isOpen && (
                  <div className="category-skills">
                    {skillIds.map(skillId => (
                      <SkillItem key={skillId} skillId={skillId} />
                    ))}
                  </div>
                )}
              </div>
            )
          })
      )}
    </div>
  )
}
