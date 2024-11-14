import { deleteAllEvents, findCalendar, getCalendarEvents } from "@/lib/calendar-api"

export default async function CalendarsPage() {
    const calendar = await findCalendar()
    const events = await getCalendarEvents(calendar.id)
    const result = await deleteAllEvents(calendar.id)

    return (
      <div>
        <div>
            <pre>{JSON.stringify(result, null, 2)}</pre>
            <pre>{JSON.stringify(events, null, 2)}</pre>
        </div>
      </div>
    )
}