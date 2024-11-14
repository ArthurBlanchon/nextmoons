"use server"

import { auth } from "@/lib/auth"

export async function createCalendar() {
  const session = await auth()
  const name = "Periods of " + session?.user?.name

  const response = await fetch("https://www.googleapis.com/calendar/v3/calendars", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${session?.accessToken}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ 
      summary: name
    })
  })

  if (!response.ok) {
    throw new Error("Failed to create calendar")
  }
  else return response.json()
}

export async function findCalendar() {
  const session = await auth()

  const response = await fetch("https://www.googleapis.com/calendar/v3/users/me/calendarList", {
    headers: { "Authorization":  `Bearer ${session?.accessToken}` }
  })
  const calendars = await response.json()

  const periodsCalendar = calendars.items.find(calendar => calendar.summary === "Periods of " + session?.user?.name)
  if (periodsCalendar) return periodsCalendar
  else return createCalendar()
}

export async function createCycleEvents(calendarId, startDate, cycleLength, numberOfCycles = 6) {
  // First delete all existing events
  await deleteAllEvents(calendarId)
  
  const session = await auth()
  const eventPromises = []

  for (let i = 0; i < numberOfCycles; i++) {
    // Calculate dates for this cycle
    const cycleStartDate = new Date(startDate)
    cycleStartDate.setDate(cycleStartDate.getDate() + (i * cycleLength))
    
    const periodEndDate = new Date(cycleStartDate)
    periodEndDate.setDate(periodEndDate.getDate() + 4)
    
    // Period event (first 4 days)
    const periodEvent = {
      summary: "Period",
      start: {
        date: cycleStartDate.toLocaleDateString('en-CA')
      },
      end: {
        date: periodEndDate.toLocaleDateString('en-CA')
      },
      colorId: "11", // String value for red
      transparency: "transparent"
    }

    const fertileStartDate = new Date(startDate)
    fertileStartDate.setDate(fertileStartDate.getDate() + (i * cycleLength) - 5)
    
    const fertileEndDate = new Date(fertileStartDate)
    fertileEndDate.setDate(fertileEndDate.getDate() + 5)
    
    const fertileEvent = {
      summary: "Fertile Window",
      start: {
        date: fertileStartDate.toLocaleDateString('en-CA')
      },
      end: {
        date: fertileEndDate.toLocaleDateString('en-CA')
      },
      colorId: "5", // String value for yellow/banana
      transparency: "transparent"
    }

    // Add both event creation promises to the array
    for (const event of [periodEvent, fertileEvent]) {
      eventPromises.push(
        fetch(
          `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events`,
          {
            method: "POST",
            headers: {
              "Authorization": `Bearer ${session?.accessToken}`,
              "Content-Type": "application/json"
            },
            body: JSON.stringify(event)
          }
        ).then(async response => {
          if (!response.ok) {
            const errorData = await response.json()
            console.error(`Failed to create ${event.summary} event:`, errorData)
            throw new Error(`Failed to create ${event.summary} event`)
          }
          return response.json()
        })
      )
    }
  }

  // Create all events in parallel
  try {
    const events = await Promise.all(eventPromises)
    return events
  } catch (error) {
    console.error('Failed to create events:', error)
    throw error
  }
}

export async function getCalendarEvents(calendarId) {
  const session = await auth()
  
  const response = await fetch(
    `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events`, {
    headers: {
      "Authorization": `Bearer ${session?.accessToken}`
    }
  })

  if (!response.ok) {
    throw new Error("Failed to fetch calendar events")
  }

  const data = await response.json()
  return data.items
}

export async function deleteAllEvents(calendarId) {
  const session = await auth()
  const events = await getCalendarEvents(calendarId)
  
  // Delete each event
  const deletePromises = events.map(event => 
    fetch(`https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events/${event.id}`, {
      method: 'DELETE',
      headers: {
        "Authorization": `Bearer ${session?.accessToken}`
      }
    })
  )
  
  try {
    await Promise.all(deletePromises)
    return { success: true }
  } catch (error) {
    console.error('Failed to delete events:', error)
    throw new Error('Failed to delete calendar events')
  }
}