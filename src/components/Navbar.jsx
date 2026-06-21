import { useState } from 'react'
import { useProgressContext } from '../App'

export default function Navbar({ view, setView }) {
  const { lastUpdated, resetAll } = useProgressContext()
  const [showConfirm, setShowConfirm] = useState(false)

  const fmt = lastUpdated
    ? new Date(lastUpdated).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })
    : null

  function handleReset() {
    resetAll()
    setShowConfirm(false)
  }

  return (
    <>
      <nav className="navbar">
        <div className="navbar-brand">
          <div className="brand-mark">R</div>
          Career Roadmap
        </div>

        <div className="navbar-tabs">
          <button className={`tab-btn ${view === 'overview' ? 'active' : ''}`} onClick={() => setView('overview')}>
            Overview
          </button>
          <button className={`tab-btn ${view === 'skills' ? 'active' : ''}`} onClick={() => setView('skills')}>
            Skills
          </button>
          <button className={`tab-btn ${view === 'certs' ? 'active' : ''}`} onClick={() => setView('certs')}>
            Certifications
          </button>
        </div>

        <div className="navbar-right">
          {fmt && <span className="last-updated">saved {fmt}</span>}
          <button className="reset-btn" onClick={() => setShowConfirm(true)}>Reset</button>
        </div>
      </nav>

      {showConfirm && (
        <div className="modal-overlay" onClick={() => setShowConfirm(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-title">Reset all progress?</div>
            <div className="modal-body">
              This will permanently clear all checked skills and subtopics across every role. This cannot be undone.
            </div>
            <div className="modal-actions">
              <button className="btn btn-ghost" onClick={() => setShowConfirm(false)}>Cancel</button>
              <button className="btn btn-danger" onClick={handleReset}>Reset Everything</button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
