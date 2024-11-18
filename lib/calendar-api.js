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

/*
// Replaced by createRecurringEvents()
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
*/

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

export async function createRecurringEvents(calendarId, startDate, cycleLength, numberOfCycles = 6) {
  await deleteAllEvents(calendarId)
  
  const session = await auth()
  const eventPromises = []

  // Ensure startDate is in YYYY-MM-DD format
  const formattedStartDate = new Date(startDate + 'T00:00:00Z')
    .toISOString()
    .split('T')[0];

  // Period event
  const periodEvent = {
    summary: "Winter",
    start: {
      date: formattedStartDate
    },
    end: {
      date: new Date(new Date(formattedStartDate + 'T00:00:00Z')
        .setDate(new Date(formattedStartDate + 'T00:00:00Z').getDate() + 4))
        .toISOString()
        .split('T')[0]
    },
    colorId: "4",
    transparency: "transparent",
    recurrence: [`RRULE:FREQ=DAILY;INTERVAL=${cycleLength};COUNT=${numberOfCycles}`]
  }

  // Fertile Window event (recurring every cycleLength days)
  const fertileStartDate = new Date(new Date(startDate).setDate(new Date(startDate).getDate() - 5))
  const fertileEvent = {
    summary: "Autumn",
    start: {
      date: fertileStartDate.toLocaleDateString('en-CA')
    },
    end: {
      date: new Date(new Date(fertileStartDate).setDate(fertileStartDate.getDate() + 5)).toLocaleDateString('en-CA')
    },
    colorId: "9",
    transparency: "transparent",
    recurrence: [`RRULE:FREQ=DAILY;INTERVAL=${cycleLength};COUNT=${numberOfCycles}`]
  }

  // Create both recurring events
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

  try {
    const events = await Promise.all(eventPromises)
    return events
  } catch (error) {
    console.error('Failed to create events:', error)
    throw error
  }
}

export async function getRecurringEventsData(calendarId) {
  try {
    const events = await getCalendarEvents(calendarId)
    
    // Find the recurring Period and Fertile Window events
    const periodEvent = events.find(event => 
      event.summary === "Winter" && event.recurrence
    )
    const fertileEvent = events.find(event => 
      event.summary === "Autumn" && event.recurrence
    )

    if (!periodEvent || !fertileEvent) {
      return null
    }

    // Parse the RRULE to get cycleLength and numberOfCycles
    const rrule = periodEvent.recurrence[0]
    const intervalMatch = rrule.match(/INTERVAL=(\d+)/)
    const countMatch = rrule.match(/COUNT=(\d+)/)
    
    const cycleLength = intervalMatch ? parseInt(intervalMatch[1]) : null
    const numberOfCycles = countMatch ? parseInt(countMatch[1]) : null
    
    // Ensure consistent date format
    const startDate = new Date(periodEvent.start.date + 'T00:00:00Z')
      .toISOString()
      .split('T')[0];

    return {
      calendarId,
      startDate,
      cycleLength,
      numberOfCycles,
      eventIds: [fertileEvent.id, periodEvent.id]
    }
  } catch (error) {
    console.error('Failed to fetch recurring events data:', error)
    return null
  }
}