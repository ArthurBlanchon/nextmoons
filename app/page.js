import Calendar from "@/components/calendar";
import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { findCalendar, createRecurringEvents, getRecurringEventsData } from "@/lib/calendar-api"

export default async function Home() {
  const session = await auth()
  if (!session) return redirect("/login")
  
  // Add error handling for expired/invalid tokens
  if (session.error === "RefreshAccessTokenError") {
    return redirect("/login")
  }

  try {
    const calendar = await findCalendar()
    if (!calendar) {
      throw new Error("Calendar not found")
    }

    const calendarData = await getRecurringEventsData(calendar.id)
    
    // Transform calendar data to match the expected format
    const initialData = calendarData ? {
      lastPeriodDate: calendarData.startDate,
      cycleLength: calendarData.cycleLength
    } : null

    async function handleCycleUpdate(data) {
      'use server'
      
      if (!data.lastPeriodDate || !data.cycleLength) {
        return { success: false, error: "Missing required data" }
      }

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
  } catch (error) {
    console.error('Error in Home page:', error);
    // You might want to show an error UI instead of redirecting
    return (
      <div className="p-4">
        <h1 className="text-red-500">Something went wrong</h1>
        <p>{error.message}</p>
      </div>
    );
  }
}
