import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"

// Définir l'action serveur en dehors du composant
async function createCalendar() {
  "use server"
  const session = await auth()
  const name = "test_calendar"

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
}

export default async function CalendarsPage() {
    const session = await auth()
    if (!session) return redirect("/login")

    const response = await fetch("https://www.googleapis.com/calendar/v3/users/me/calendarList", {
        headers: { "Authorization":  `Bearer ${session?.accessToken}` }
    })
    const calendars = await response.json()

    return (
      <div>
        <div>
          <form action={createCalendar}>
            <button type="submit">Create Calendar</button>
          </form>
        </div>
        <div>
            <pre>{JSON.stringify(calendars, null, 2)}</pre>
        </div>
      </div>
    )
}