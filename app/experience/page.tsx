"use client"

import { useState, useEffect } from "react"
import { useTypeWriter } from "@/hooks/use-typewriter"
import { EXPERIENCES, STATS, PAGE_HEADINGS, GITHUB_USERNAME } from "@/constants/data"

interface Contribution {
  date: string
  count: number
}

export default function Experience() {
  const [showContent, setShowContent] = useState(false)
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0)
  const [contributions, setContributions] = useState<Contribution[]>([])
  const [totalContributions, setTotalContributions] = useState(0)
  const [loadingContributions, setLoadingContributions] = useState(true)
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1)
  const headingTyping = useTypeWriter(PAGE_HEADINGS.experience.title, 40, 0)

  useEffect(() => {
    if (headingTyping.isComplete) {
      const timer = setTimeout(() => {
        setShowContent(true)
      }, 300)
      return () => clearTimeout(timer)
    }
  }, [headingTyping.isComplete])

  useEffect(() => {
    // Fetch GitHub contributions
    const fetchContributions = async () => {
      setLoadingContributions(true)
      try {
        const response = await fetch(`/api/github-contributions?year=${selectedYear}&month=${selectedMonth}`)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        console.log('Fetched contributions data:', {
          contributionsCount: data.contributions?.length || 0,
          total: data.total,
          month: data.month,
          year: data.year,
          sample: data.contributions?.slice(0, 3)
        })
        
        if (data.contributions && Array.isArray(data.contributions)) {
          setContributions(data.contributions)
          setTotalContributions(data.total || 0)
          console.log(`Set ${data.contributions.length} contributions, total: ${data.total}`)
        } else {
          console.warn('No contributions found or invalid format:', data)
          setContributions([])
          setTotalContributions(0)
        }
      } catch (error) {
        console.error('Error fetching contributions:', error)
        setContributions([])
      } finally {
        setLoadingContributions(false)
      }
    }
    
    if (showContent) {
      fetchContributions()
    }
  }, [showContent, selectedYear, selectedMonth])


  return (
    <main className="relative min-h-screen pt-24 pb-12">
      {/* Background */}
      <div className="absolute inset-0 cyber-grid opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-10 relative z-10">
        {/* Header */}
        <div className="mb-12">
          <div className="inline-block mb-4">
            <p className="text-sm font-mono text-primary/70">{PAGE_HEADINGS.experience.prefix}</p>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white min-h-[60px] md:min-h-[80px]">
            {headingTyping.displayedText ? (
              <>
                {headingTyping.displayedText.includes("experience.exe") ? (
                  <>
                    {headingTyping.displayedText.split("experience.exe")[0]}
                    <span className="text-primary">experience.exe</span>
                    {headingTyping.displayedText.split("experience.exe")[1]}
                    {!headingTyping.isComplete && <span className="animate-blink">|</span>}
                  </>
                ) : (
                  <>
                    {headingTyping.displayedText}
                    {!headingTyping.isComplete && <span className="animate-blink">|</span>}
                  </>
                )}
              </>
            ) : (
              <span className="animate-blink">|</span>
            )}
          </h1>
          {showContent && (
            <p className="text-gray-400 font-mono text-sm mt-4 animate-fade-in">
            Initializing System Logs: Retrieving career history data blocks... Status: Loaded successfully.
          </p>
          )}
        </div>

        {showContent && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fade-in">
          {/* Timeline */}
          <div className="lg:col-span-2">
            <div className="relative pl-4">
              {/* Vertical Line - centered on bubbles (16px padding + 24px to center of 48px bubble = 40px) */}
              <div className="absolute left-10 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-transparent z-0" />

              {/* Experience Items */}
              <div className="space-y-8">
                {EXPERIENCES.map((exp, idx) => (
                  <div
                    key={idx}
                    className="cursor-pointer relative"
                    onClick={() => setExpandedIndex(expandedIndex === idx ? null : idx)}
                  >
                    {/* Timeline Dot */}
                    <div className="flex items-start gap-6">
                      <div className="relative z-10 flex-shrink-0">
                        {/* Outer circle with consistent styling - all bubbles same size */}
                        <div
                          className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all relative ${
                            exp.isActive
                              ? "border-primary bg-background shadow-[0_0_15px_rgba(0,255,157,0.4)]"
                              : "border-primary/40 bg-background hover:border-primary/60"
                          }`}
                          style={{ zIndex: 10 }}
                        >
                          {/* Inner dot - consistent styling for all */}
                          <span className={`rounded-full transition-all ${
                            exp.isActive
                              ? "w-3 h-3 bg-primary shadow-[0_0_8px_rgba(0,255,157,0.8)]"
                              : "w-2.5 h-2.5 bg-primary/60"
                          }`} />
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1 mt-2 border border-primary/20 rounded-lg p-5 hover:border-primary/60 transition-all hover:bg-muted/50 box-glow">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="text-xl font-bold text-white">{exp.title}</h3>
                            <p className="text-sm text-gray-400 font-mono">
                              @ {exp.company} • {exp.location}
                            </p>
                          </div>
                          {exp.isActive && (
                            <span className="px-3 py-1 text-xs bg-primary/20 border border-primary text-primary rounded-full font-mono tracking-wider">
                              ● ACTIVE_PROCESS
                            </span>
                          )}
                        </div>

                        <p className="text-xs text-primary/70 font-mono mb-4">{exp.period}</p>

                        {/* Expandable Content */}
                        {expandedIndex === idx && (
                          <div className="mt-4 pt-4 border-t border-primary/10">
                            <ul className="space-y-2 mb-4">
                              {exp.description.map((desc, i) => (
                                <li key={i} className="text-sm text-gray-300 flex gap-3">
                                  <span className="text-primary flex-shrink-0">›</span>
                                  <span>{desc}</span>
                                </li>
                              ))}
                            </ul>

                            {/* Skills */}
                            <div className="flex flex-wrap gap-2">
                              {exp.skills.map((skill, i) => (
                                <span
                                  key={i}
                                  className="px-2 py-1 text-xs border border-primary/30 rounded bg-primary/5 text-primary font-mono hover:bg-primary/10 transition-colors"
                                >
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        <div className="mt-3 text-xs text-gray-500 font-mono">
                          {expandedIndex === idx ? "$ click to collapse" : "$ click to expand"}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Stats Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 border border-primary/20 rounded-lg p-6 bg-muted/50 backdrop-blur-sm box-glow">
              <h3 className="text-sm font-mono text-primary uppercase tracking-wider mb-6 flex items-center gap-2">
                <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                System Stats
              </h3>

              <div className="space-y-6">
                {/* Experience */}
                <div>
                  <p className="text-xs text-gray-500 uppercase font-mono tracking-wider mb-2">EXPERIENCE</p>
                  <p className="text-3xl font-bold text-primary">{String(STATS.experience.years).padStart(2, '0')}</p>
                  <p className="text-xs text-gray-400">{STATS.experience.label}</p>
                </div>

                {/* Projects */}
                <div>
                  <p className="text-xs text-gray-500 uppercase font-mono tracking-wider mb-2">PROJECTS</p>
                  <p className="text-3xl font-bold text-primary">{STATS.projects.count}</p>
                  <p className="text-xs text-gray-400">{STATS.projects.label}</p>
                </div>

                {/* Contributions */}
                <div>
                  <p className="text-xs text-gray-500 uppercase font-mono tracking-wider mb-2">CONTRIBUTIONS</p>
                  <p className="text-3xl font-bold text-primary">
                    {totalContributions > 0 ? totalContributions : STATS.contributions.default}
                  </p>
                  <p className="text-xs text-gray-400">
                    {totalContributions > 0 ? 'this month' : STATS.contributions.label}
                  </p>
                </div>

                {/* Skills Breakdown */}
                <div className="pt-6 border-t border-primary/10">
                  <p className="text-xs text-gray-500 uppercase font-mono tracking-wider mb-4">SKILL_MATRIX</p>
                  <div className="space-y-3">
                    {STATS.skillMatrix.map((skill, i) => (
                      <div key={i}>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-xs text-gray-400">{skill.name}</span>
                          <span className="text-xs text-primary font-bold">{skill.percent}%</span>
                        </div>
                        <div className="h-1 bg-muted rounded overflow-hidden">
                          <div
                            className="h-full bg-primary transition-all duration-500"
                            style={{ width: `${skill.percent}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Activity Log - GitHub Style (1 Month) */}
                <div className="pt-6 border-t border-primary/10">
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-xs text-gray-500 uppercase font-mono tracking-wider">ACTIVITY_LOG</p>
                    {/* Year and Month Selectors */}
                    <div className="flex gap-2">
                      <select
                        value={selectedYear}
                        onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                        className="px-2 py-1 text-xs bg-muted border border-primary/30 rounded text-primary font-mono hover:border-primary transition-colors focus:outline-none focus:border-primary"
                      >
                        {Array.from({ length: 5 }, (_, i) => {
                          const year = new Date().getFullYear() - i
                          return (
                            <option key={year} value={year} className="bg-muted text-white">
                              {year}
                            </option>
                          )
                        })}
                      </select>
                      <select
                        value={selectedMonth}
                        onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
                        className="px-2 py-1 text-xs bg-muted border border-primary/30 rounded text-primary font-mono hover:border-primary transition-colors focus:outline-none focus:border-primary"
                      >
                        {[
                          'January', 'February', 'March', 'April', 'May', 'June',
                          'July', 'August', 'September', 'October', 'November', 'December'
                        ].map((month, index) => (
                          <option key={index + 1} value={index + 1} className="bg-muted text-white">
                            {month}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {/* Month label with total contributions */}
                    <div className="flex items-center justify-between mb-1">
                      <div className="text-[10px] text-gray-500 font-mono">
                        {new Date(selectedYear, selectedMonth - 1, 1).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                      </div>
                      {!loadingContributions && totalContributions > 0 && (
                        <div className="text-[10px] text-primary font-mono font-bold">
                          {totalContributions} {totalContributions === 1 ? 'contribution' : 'contributions'}
                        </div>
                      )}
                    </div>
                    
                    {/* Weekday labels */}
                    <div className="grid grid-cols-7 gap-1 mb-1">
                      {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, i) => (
                        <div key={i} className="text-[9px] text-gray-600 font-mono text-center">
                          {i % 2 === 0 ? day : ''}
                        </div>
                      ))}
                    </div>
                    
                    {/* GitHub-style contribution graph - 1 month */}
                    {loadingContributions ? (
                      <div className="grid grid-cols-7 gap-1">
                        {Array.from({ length: 35 }, (_, i) => (
                          <div key={i} className="h-3 w-3 rounded-sm bg-muted border border-primary/10 animate-pulse" />
                        ))}
                      </div>
                    ) : contributions.length === 0 ? (
                      <div className="text-center py-4">
                        <p className="text-xs text-gray-500 font-mono">No contribution data available for this month</p>
                        <div className="grid grid-cols-7 gap-1 mt-2">
                          {(() => {
                            const firstDay = new Date(selectedYear, selectedMonth - 1, 1)
                            const lastDay = new Date(selectedYear, selectedMonth, 0)
                            const daysInMonth = lastDay.getDate()
                            const startDayOfWeek = firstDay.getDay()
                            const gridDays: (Date | null)[] = []
                            
                            for (let i = 0; i < startDayOfWeek; i++) {
                              gridDays.push(null)
                            }
                            
                            for (let day = 1; day <= daysInMonth; day++) {
                              gridDays.push(new Date(selectedYear, selectedMonth - 1, day))
                            }
                            
                            return gridDays.map((date, i) => (
                              <div key={i} className={`h-3 w-3 rounded-sm border ${date ? 'bg-muted border-primary/10' : ''}`} />
                            ))
                          })()}
                        </div>
                      </div>
                    ) : (
                      <div className="grid grid-cols-7 gap-1">
                        {(() => {
                          // Get first day of selected month
                          const firstDay = new Date(selectedYear, selectedMonth - 1, 1)
                          const lastDay = new Date(selectedYear, selectedMonth, 0)
                          const daysInMonth = lastDay.getDate()
                          
                          // Get day of week for first day (0 = Sunday, 6 = Saturday)
                          const startDayOfWeek = firstDay.getDay()
                          
                          // Create array for all days in the grid (including empty cells for days before month starts)
                          const gridDays: (Date | null)[] = []
                          
                          // Add empty cells for days before month starts
                          for (let i = 0; i < startDayOfWeek; i++) {
                            gridDays.push(null)
                          }
                          
                          // Add all days in the month
                          for (let day = 1; day <= daysInMonth; day++) {
                            gridDays.push(new Date(selectedYear, selectedMonth - 1, day))
                          }
                          
                          return gridDays.map((date, i) => {
                            if (!date) {
                              return <div key={i} className="h-3 w-3" /> // Empty cell
                            }
                            
                            // Format date as YYYY-MM-DD (handle timezone issues)
                            const year = date.getFullYear()
                            const month = String(date.getMonth() + 1).padStart(2, '0')
                            const day = String(date.getDate()).padStart(2, '0')
                            const dateString = `${year}-${month}-${day}`
                          
                          // Find contribution for this date (try exact match and also check if date string contains the date)
                          const contribution = contributions.find(c => {
                            if (!c.date) return false
                            const contribDate = c.date.split('T')[0] // Remove time if present
                            return contribDate === dateString
                          })
                          const count = contribution?.count || 0
                          
                          // Map count to activity level (0-4)
                          const getActivityLevel = (count: number): number => {
                            if (count === 0) return 0
                            if (count <= 2) return 1
                            if (count <= 5) return 2
                            if (count <= 10) return 3
                            return 4
                          }
                          
                          const activityLevel = getActivityLevel(count)
                          
                          const getColor = (level: number) => {
                            switch (level) {
                              case 0: return 'bg-muted border-primary/10'
                              case 1: return 'bg-primary/20 border-primary/30'
                              case 2: return 'bg-primary/40 border-primary/50'
                              case 3: return 'bg-primary/60 border-primary/70'
                              case 4: return 'bg-primary border-primary'
                              default: return 'bg-muted border-primary/10'
                            }
                          }

                            return (
                              <div
                                key={i}
                                className={`h-3 w-3 rounded-sm border ${getColor(activityLevel)} hover:border-primary hover:scale-125 transition-all cursor-pointer group relative`}
                                title={`${count} ${count === 1 ? 'contribution' : 'contributions'} on ${date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`}
                              >
                                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-muted border border-primary/50 rounded text-xs text-white whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none z-20 transition-opacity">
                                  <div className="font-mono">
                                    {count} {count === 1 ? 'contribution' : 'contributions'}
                                  </div>
                                  <div className="text-gray-400 text-[10px] mt-0.5">
                                    {date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                                  </div>
                                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2 h-2 bg-muted border-r border-b border-primary/50 rotate-45" />
                                </div>
                              </div>
                            )
                          })
                        })()}
                      </div>
                    )}
                    {/* Legend and Stats */}
                    <div className="mt-3 space-y-2">
                      <div className="flex items-center justify-between text-[10px] text-gray-500 font-mono">
                        <span>Less</span>
                        <div className="flex gap-1">
                          <div className="w-3 h-3 rounded-sm bg-muted border border-primary/10" />
                          <div className="w-3 h-3 rounded-sm bg-primary/20 border border-primary/30" />
                          <div className="w-3 h-3 rounded-sm bg-primary/40 border border-primary/50" />
                          <div className="w-3 h-3 rounded-sm bg-primary/60 border border-primary/70" />
                          <div className="w-3 h-3 rounded-sm bg-primary border border-primary" />
                        </div>
                        <span>More</span>
                      </div>
                      {!loadingContributions && contributions.length > 0 && (
                        <div className="pt-2 border-t border-primary/10">
                          <div className="flex items-center justify-between text-[10px] text-gray-400 font-mono">
                            <span>Active days:</span>
                            <span className="text-primary">
                              {contributions.filter(c => c.count > 0).length} / {contributions.length}
                            </span>
                          </div>
                          {(() => {
                            const maxContributions = Math.max(...contributions.map(c => c.count))
                            const maxDay = contributions.find(c => c.count === maxContributions)
                            if (maxDay && maxContributions > 0) {
                              const date = new Date(maxDay.date)
                              return (
                                <div className="flex items-center justify-between text-[10px] text-gray-400 font-mono mt-1">
                                  <span>Best day:</span>
                                  <span className="text-primary">
                                    {maxContributions} on {date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                  </span>
                                </div>
                              )
                            }
                            return null
                          })()}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        )}
      </div>
    </main>
  )
}
