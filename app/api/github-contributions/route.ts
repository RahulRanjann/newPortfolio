import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const username = 'rahulranjann'
  const { searchParams } = new URL(request.url)
  const year = searchParams.get('year') ? parseInt(searchParams.get('year')!) : new Date().getFullYear()
  const month = searchParams.get('month') ? parseInt(searchParams.get('month')!) : new Date().getMonth() + 1
  
  try {
    let allContributions: { date: string; count: number }[] = []
    
    // Method 1: Try GitHub Contributions API service
    try {
      const apiResponse = await fetch(`https://github-contributions-api.vercel.app/api/v1/${username}`, {
        headers: {
          'Accept': 'application/json',
        },
        next: { revalidate: 3600 }
      })
      
      if (apiResponse.ok) {
        const apiData = await apiResponse.json()
        
        // Handle different response formats
        if (apiData.contributions && Array.isArray(apiData.contributions)) {
          allContributions = apiData.contributions.map((contrib: any) => ({
            date: contrib.date || contrib.Date || '',
            count: contrib.count || contrib.Count || contrib.contributionCount || 0
          })).filter((c: any) => c.date)
        } else if (apiData.years && Array.isArray(apiData.years)) {
          apiData.years.forEach((yearData: any) => {
            if (yearData.weeks && Array.isArray(yearData.weeks)) {
              yearData.weeks.forEach((week: any) => {
                if (week.contributionDays && Array.isArray(week.contributionDays)) {
                  week.contributionDays.forEach((day: any) => {
                    if (day.date) {
                      allContributions.push({
                        date: day.date,
                        count: day.contributionCount || 0
                      })
                    }
                  })
                }
              })
            }
          })
        }
      }
    } catch (apiError) {
      console.warn('GitHub Contributions API failed, trying alternative method...')
    }
    
    // Method 2: If API failed, try scraping GitHub profile
    if (allContributions.length === 0) {
      try {
        const profileResponse = await fetch(`https://github.com/${username}`, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (compatible; PortfolioBot/1.0)',
            'Accept': 'text/html',
          },
          next: { revalidate: 3600 }
        })
        
        if (profileResponse.ok) {
          const html = await profileResponse.text()
          
          // Parse SVG contribution graph
          const rectPattern = /<rect[^>]*data-date="([^"]*)"[^>]*data-count="(\d+)"[^>]*>/g
          let match
          
          while ((match = rectPattern.exec(html)) !== null) {
            allContributions.push({
              date: match[1],
              count: parseInt(match[2], 10)
            })
          }
        }
      } catch (scrapeError) {
        console.warn('GitHub profile scraping also failed')
      }
    }
    
    // If still no data, return empty array (will show empty grid)
    if (allContributions.length === 0) {
      console.warn('No contribution data could be fetched')
      return NextResponse.json({ contributions: [] })
    }
    
    // Filter contributions for the selected month
    const startDate = new Date(year, month - 1, 1)
    const endDate = new Date(year, month, 0)
    const startDateString = startDate.toISOString().split('T')[0]
    const endDateString = endDate.toISOString().split('T')[0]
    
    // Filter contributions for the selected month
    const monthContributions = allContributions.filter((contrib) => {
      if (!contrib.date) return false
      // Handle different date formats (YYYY-MM-DD or other formats)
      const contribDate = contrib.date.split('T')[0] // Remove time if present
      return contribDate >= startDateString && contribDate <= endDateString
    })
    
    // Sort by date to ensure correct order
    monthContributions.sort((a, b) => {
      if (!a.date || !b.date) return 0
      return a.date.localeCompare(b.date)
    })
    
    return NextResponse.json({ contributions: monthContributions })
  } catch (error) {
    console.error('Error fetching GitHub contributions:', error)
    // Return empty data on error
    return NextResponse.json({ contributions: [] })
  }
}
