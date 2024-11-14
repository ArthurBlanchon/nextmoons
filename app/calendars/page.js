import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { findCalendar } from "@/lib/calendar-api"

export default async function CalendarsPage() {
    const session = await auth()
    if (!session) return redirect("/login")

    const calendar = await findCalendar()

    return (
      <div>
        <div>
            <pre>{JSON.stringify(calendar, null, 2)}</pre>
        </div>
      </div>
    )
}