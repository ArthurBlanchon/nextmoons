import Calendar from "@/components/calendar";
import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { findCalendar, createCycleEvents, getCalendarEvents } from "@/lib/calendar-api"

export default async function Home() {
  const session = await auth()
  if (!session) return redirect("/login")

  const calendar = await findCalendar()
  const events = await getCalendarEvents(calendar.id)

  async function handleCycleUpdate(data) {
    'use server'
    
    try {
      await createCycleEvents(
        calendar.id,
        data.lastPeriodDate,
        data.cycleLength
      );
      return { success: true };
    } catch (error) {
      console.error('Failed to create calendar events:', error);
      return { success: false, error: error.message };
    }
  }

  return (
    <div>
      <Calendar onCycleUpdate={handleCycleUpdate} />
    </div>
  );
}
