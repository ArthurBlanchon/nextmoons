import Calendar from "@/components/calendar";
import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"

export default async function Home() {
  const session = await auth()
  if (!session) return redirect("/login")

  return (
    <div>
      <pre>{JSON.stringify(session, null, 2)}</pre>
      <Calendar />
    </div>
  );
}
