import { NextResponse } from 'next/server'
import { GITHUB_USERNAME } from '@/constants/data'

export async function GET(request: Request) {
  const username = GITHUB_USERNAME
  const { searchParams } = new URL(request.url)
  const year = searchParams.get('year') ? parseInt(searchParams.get('year')!) : new Date().getFullYear()
  const month = searchParams.get('month') ? parseInt(searchParams.get('month')!) : new Date().getMonth() + 1
  
  try {
    // Calculate date range for the selected month
    const startDate = new Date(year, month - 1, 1)
    const endDate = new Date(year, month, 0)
    const startDateString = startDate.toISOString().split('T')[0]
    const endDateString = endDate.toISOString().split('T')[0]
    
    // Use GitHub Contributions API from deno.dev
    // Format: github-contributions-api.deno.dev/username.json?flat=true&from=yyyy-mm-dd&to=yyyy-mm-dd
    try {
      const apiUrl = `https://github-contributions-api.deno.dev/${username}.json?flat=true&from=${startDateString}&to=${endDateString}`
      const apiResponse = await fetch(apiUrl, {
        headers: {
          'Accept': 'application/json',
        },
        next: { revalidate: 3600 } // Cache for 1 hour
      })
      
      if (apiResponse.ok) {
        const apiData = await apiResponse.json()
        
        // The API returns: { contributions: [...], totalContributions: number }
        // Each contribution has: date, contributionCount, color, contributionLevel
        let contributions: { date: string; count: number }[] = []
        let totalContributions = 0
        
        if (apiData.contributions && Array.isArray(apiData.contributions)) {
          // Map the API response to our format
          // API returns: { date, contributionCount, color, contributionLevel }
          contributions = apiData.contributions.map((contrib: any) => ({
            date: contrib.date || '',
            count: contrib.contributionCount || 0
          })).filter((c: any) => c.date && c.date.match(/^\d{4}-\d{2}-\d{2}$/))
          
          // Use totalContributions from API or calculate it
          totalContributions = apiData.totalContributions || contributions.reduce((sum, contrib) => sum + contrib.count, 0)
        } else if (Array.isArray(apiData)) {
          // Fallback: if API returns array directly (with flat=true)
          contributions = apiData.map((contrib: any) => ({
            date: contrib.date || '',
            count: contrib.contributionCount || contrib.count || 0
          })).filter((c: any) => c.date && c.date.match(/^\d{4}-\d{2}-\d{2}$/))
          
          totalContributions = contributions.reduce((sum, contrib) => sum + contrib.count, 0)
        }
        
        console.log(`Fetched ${contributions.length} contributions for ${year}-${month}, total: ${totalContributions}`)
        
        // Sort by date to ensure correct order
        contributions.sort((a, b) => {
          if (!a.date || !b.date) return 0
          return a.date.localeCompare(b.date)
        })
        
        return NextResponse.json({ 
          contributions,
          total: totalContributions,
          month: month,
          year: year
        })
      } else {
        console.warn(`API returned status ${apiResponse.status}`)
        const errorText = await apiResponse.text()
        console.warn('API error response:', errorText)
      }
    } catch (apiError) {
      console.warn('GitHub Contributions API failed:', apiError)
    }
    
    // If API failed, return empty array
    return NextResponse.json({ contributions: [], total: 0, month, year })
  } catch (error) {
    console.error('Error fetching GitHub contributions:', error)
    // Return empty data on error
    return NextResponse.json({ contributions: [] })
  }
}
