import { signIn, auth } from "@/lib/auth"
import { redirect } from "next/navigation"
 
export default async function SignIn() {
  const session = await auth()
  if (session) return redirect("/")

  return (
    <form
      action={async () => {
        "use server"
        await signIn("google")
      }}
    >
      <button type="submit">Signin with Google</button>
    </form>
  )
} 