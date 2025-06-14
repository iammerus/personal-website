export interface Experience {
  period: string
  role: string
  company: string
  location: string
  description: string
  achievements: string[]
  technologies: string[]
}

export interface Education {
  period: string
  degree: string
  institution: string
  location: string
  details?: string[]
}

export interface Skill {
  name: string
  level: number
  category: string
}

export interface Contact {
  name: string
  title: string
  location: string
  phone: string
  email: string
  website?: string
  github?: string
  linkedin?: string
}

export interface ResumeData {
  contact: Contact
  profile: string
  experience: Experience[]
  education: Education[]
  skills: Skill[]
  technologies: string[]
}

export function parseResumeMarkdown(markdownContent: string): ResumeData {
  const lines = markdownContent.split('\n').filter(line => line.trim() !== '')
  
  // Parse contact information (first few lines)
  const contactLine = lines[0]
  const contactParts = contactLine.split(', ')
  const name = contactParts[0]
  const title = 'Senior Full-Stack Engineer' // From the content
  const location = contactParts[1] || 'Harare, Zimbabwe'
  const phone = contactParts[2] || '+263(0)783-944-585'
  const email = contactParts[3] || 'melvin.rufetu@proton.me'
  
  // Find LINKS section
  const linksIndex = lines.findIndex(line => line.startsWith('LINKS'))
  const links = linksIndex >= 0 ? lines[linksIndex].replace('LINKS ', '').split(', ') : []
  
  // Find PROFILE section
  const profileIndex = lines.findIndex(line => line.startsWith('PROFILE'))
  let profile = ''
  if (profileIndex >= 0) {
    // Get all lines until EXPERIENCE
    const experienceIndex = lines.findIndex(line => line.startsWith('EXPERIENCE'))
    const profileLines = lines.slice(profileIndex + 1, experienceIndex >= 0 ? experienceIndex : profileIndex + 10)
    profile = profileLines.join(' ').trim()
  }
  
  // Parse experience
  const experience: Experience[] = []
  const experienceIndex = lines.findIndex(line => line.startsWith('EXPERIENCE'))
  
  if (experienceIndex >= 0) {
    let currentExp: Partial<Experience> = {}
    let currentAchievements: string[] = []
    let currentTechnologies: string[] = []
    
    for (let i = experienceIndex + 1; i < lines.length; i++) {
      const line = lines[i].trim()
      
      // Skip empty lines
      if (!line) continue
      
      // Check if this is a new job entry (date pattern)
      const dateMatch = line.match(/^([A-Za-z]+ \d{4})\s*—\s*([A-Za-z]+ \d{4}|Present)\s+(.+?)(?:\s+(.+))?$/)
      
      if (dateMatch) {
        // Save previous experience if it exists
        if (currentExp.role) {
          experience.push({
            period: currentExp.period || '',
            role: currentExp.role || '',
            company: currentExp.company || '',
            location: currentExp.location || '',
            description: currentExp.description || '',
            achievements: [...currentAchievements],
            technologies: [...currentTechnologies]
          })
        }
        
        // Start new experience
        const [, startDate, endDate, roleAndCompany, location] = dateMatch
        const roleCompanyParts = roleAndCompany.split(', ')
        
        currentExp = {
          period: `${startDate} — ${endDate}`,
          role: roleCompanyParts[0],
          company: roleCompanyParts[1] || '',
          location: location || '',
          description: ''
        }
        currentAchievements = []
        currentTechnologies = []
      } else if (line.startsWith('Tech Stack:')) {
        // Extract technologies
        const techString = line.replace('Tech Stack:', '').trim()
        currentTechnologies = techString.split(',').map(tech => tech.trim())
      } else if (line.startsWith('¢') || line.startsWith('•') || line.startsWith('e')) {
        // Achievement bullet point
        const achievement = line.replace(/^[¢•e]\s*/, '').trim()
        if (achievement) {
          currentAchievements.push(achievement)
        }
      }
    }
    
    // Don't forget the last experience
    if (currentExp.role) {
      experience.push({
        period: currentExp.period || '',
        role: currentExp.role || '',
        company: currentExp.company || '',
        location: currentExp.location || '',
        description: currentExp.description || '',
        achievements: [...currentAchievements],
        technologies: [...currentTechnologies]
      })
    }
  }
  
  // Define skills based on resume content
  const skills: Skill[] = [
    // Frontend
    { name: 'React', level: 95, category: 'Frontend' },
    { name: 'Vue.js', level: 90, category: 'Frontend' },
    { name: 'TypeScript', level: 90, category: 'Frontend' },
    { name: 'Next.js', level: 85, category: 'Frontend' },
    { name: 'Nuxt.js', level: 85, category: 'Frontend' },
    
    // Backend
    { name: 'Node.js', level: 90, category: 'Backend' },
    { name: 'Laravel', level: 85, category: 'Backend' },
    { name: 'PHP', level: 85, category: 'Backend' },
    { name: 'GraphQL', level: 80, category: 'Backend' },
    { name: 'REST APIs', level: 95, category: 'Backend' },
    
    // Database
    { name: 'PostgreSQL', level: 85, category: 'Database' },
    { name: 'MySQL', level: 85, category: 'Database' },
    { name: 'Redis', level: 80, category: 'Database' },
    { name: 'Elasticsearch', level: 75, category: 'Database' },
    
    // DevOps & Cloud
    { name: 'AWS', level: 85, category: 'DevOps' },
    { name: 'Docker', level: 80, category: 'DevOps' },
    { name: 'CI/CD', level: 75, category: 'DevOps' },
    { name: 'Kubernetes', level: 70, category: 'DevOps' }
  ]
  
  // Extract all technologies mentioned
  const technologies = Array.from(new Set(
    experience.flatMap(exp => exp.technologies)
  )).filter(Boolean)
  
  return {
    contact: {
      name,
      title,
      location,
      phone,
      email,
      github: 'https://github.com/melvinmupondori',
      linkedin: 'https://linkedin.com/in/melvinmupondori'
    },
    profile,
    experience,
    education: [], // Not provided in the current resume
    skills,
    technologies
  }
}

// Utility function to get years of experience
export function getYearsOfExperience(experiences: Experience[]): number {
  if (experiences.length === 0) return 0
  
  const currentYear = new Date().getFullYear()
  const startYear = Math.min(
    ...experiences
      .map(exp => {
        const match = exp.period.match(/(\w+ \d{4})/)
        if (match) {
          const year = parseInt(match[1].split(' ')[1])
          return year
        }
        return currentYear
      })
      .filter(year => !isNaN(year))
  )
  
  return currentYear - startYear
}

// Utility to group skills by category
export function groupSkillsByCategory(skills: Skill[]): Record<string, Skill[]> {
  return skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = []
    }
    acc[skill.category].push(skill)
    return acc
  }, {} as Record<string, Skill[]>)
}
