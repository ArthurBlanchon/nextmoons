import Calendar from "@/components/calendar";
import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { findCalendar, createRecurringEvents, getRecurringEventsData } from "@/lib/calendar-api"

export default async function Home() {
  const session = await auth()
  if (!session) return redirect("/login")

  const calendar = await findCalendar()
  const calendarData = await getRecurringEventsData(calendar.id)
  console.log(calendarData)

   // Transform calendar data to match the expected format
   const initialData = calendarData ? {
    lastPeriodDate: calendarData.startDate,
    cycleLength: calendarData.cycleLength
  } : null

  async function handleCycleUpdate(data) {
    'use server'
    
    try {
      await createRecurringEvents(
        calendar.id,
        data.lastPeriodDate,
        data.cycleLength
      );
      return { 
        success: true,
        calendarId: calendar.id,
        startDate: data.lastPeriodDate,
        cycleLength: data.cycleLength,
        numberOfCycles: 6
      };
    } catch (error) {
      console.error('Failed to create calendar events:', error);
      return { success: false, error: error.message };
    }
  }

  return (
    <div>
      <Calendar 
        onCycleUpdate={handleCycleUpdate} 
        initialData={initialData}
      />
    </div>
  );
}
