import { useState, useCallback } from 'react'
import { SKILLS, ROLES } from '../data/skills'

const STORAGE_KEY = 'roadmap-progress'
const UPDATED_KEY = 'roadmap-last-updated'

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

function save(progress) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
  localStorage.setItem(UPDATED_KEY, new Date().toISOString())
}

export function useProgress() {
  const [progress, setProgress] = useState(load)

  const toggleSubtopic = useCallback((skillId, subtopic) => {
    setProgress(prev => {
      const sp = prev[skillId] || { done: false, subtopics: {} }
      const subtopics = { ...sp.subtopics, [subtopic]: !sp.subtopics[subtopic] }
      const allDone = SKILLS[skillId].subtopics.every(s => subtopics[s])
      const next = { ...prev, [skillId]: { done: allDone, subtopics } }
      save(next)
      return next
    })
  }, [])

  const toggleSkill = useCallback((skillId) => {
    setProgress(prev => {
      const nowDone = !(prev[skillId]?.done)
      const subtopics = {}
      SKILLS[skillId].subtopics.forEach(s => { subtopics[s] = nowDone })
      const next = { ...prev, [skillId]: { done: nowDone, subtopics } }
      save(next)
      return next
    })
  }, [])

  const resetAll = useCallback(() => {
    setProgress({})
    localStorage.removeItem(STORAGE_KEY)
    localStorage.removeItem(UPDATED_KEY)
  }, [])

  const getSkillProgress = useCallback((skillId) => {
    const skill = SKILLS[skillId]
    if (!skill) return { done: false, subtopicsDone: 0, subtopicsTotal: 0, pct: 0 }
    const p = progress[skillId]
    const subtopicsTotal = skill.subtopics.length
    if (!p) return { done: false, subtopicsDone: 0, subtopicsTotal, pct: 0 }
    const subtopicsDone = skill.subtopics.filter(s => p.subtopics?.[s]).length
    const pct = subtopicsTotal > 0 ? Math.round((subtopicsDone / subtopicsTotal) * 100) : (p.done ? 100 : 0)
    return { done: p.done, subtopicsDone, subtopicsTotal, pct }
  }, [progress])

  const getRoleProgress = useCallback((roleId) => {
    const role = ROLES[roleId]
    if (!role) return { doneSkills: 0, totalSkills: 0, doneSubtopics: 0, totalSubtopics: 0, pct: 0 }
    let totalSubtopics = 0
    let doneSubtopics = 0
    let doneSkills = 0
    role.skills.forEach(skillId => {
      const { subtopicsDone, subtopicsTotal, done } = getSkillProgress(skillId)
      totalSubtopics += subtopicsTotal
      doneSubtopics += subtopicsDone
      if (done) doneSkills++
    })
    const pct = totalSubtopics > 0 ? Math.round((doneSubtopics / totalSubtopics) * 100) : 0
    return { doneSkills, totalSkills: role.skills.length, doneSubtopics, totalSubtopics, pct }
  }, [getSkillProgress])

  const getCategoryProgress = useCallback(() => {
    const map = {}
    Object.entries(SKILLS).forEach(([skillId, skill]) => {
      const cat = skill.category
      if (!map[cat]) map[cat] = { done: 0, total: 0 }
      const { subtopicsDone, subtopicsTotal } = getSkillProgress(skillId)
      map[cat].done += subtopicsDone
      map[cat].total += subtopicsTotal
    })
    return Object.entries(map).map(([name, { done, total }]) => ({
      name,
      pct: total > 0 ? Math.round((done / total) * 100) : 0,
      done,
      total
    }))
  }, [getSkillProgress])

  const lastUpdated = localStorage.getItem(UPDATED_KEY)

  return { progress, toggleSubtopic, toggleSkill, resetAll, getSkillProgress, getRoleProgress, getCategoryProgress, lastUpdated }
}
