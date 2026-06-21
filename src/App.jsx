import { useState, createContext, useContext } from 'react'
import { useProgress } from './hooks/useProgress'
import Navbar from './components/Navbar'
import OverviewView from './components/OverviewView'
import SkillsView from './components/SkillsView'
import RoleDetail from './components/RoleDetail'
import CertificationsView from './components/CertificationsView'

export const ProgressContext = createContext(null)
export const useProgressContext = () => useContext(ProgressContext)

export default function App() {
  const [view, setView] = useState('overview')
  const [selectedRole, setSelectedRole] = useState(null)
  const progressApi = useProgress()

  return (
    <ProgressContext.Provider value={progressApi}>
      <div className="app">
        <Navbar view={view} setView={setView} />
        <main className="main">
          {view === 'overview' && <OverviewView onSelectRole={setSelectedRole} />}
          {view === 'skills' && <SkillsView />}
          {view === 'certs' && <CertificationsView />}
        </main>
        {selectedRole && (
          <RoleDetail roleId={selectedRole} onClose={() => setSelectedRole(null)} />
        )}
      </div>
    </ProgressContext.Provider>

  )
}
