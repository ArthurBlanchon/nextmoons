import { signIn, auth } from "@/lib/auth"
import { redirect } from "next/navigation"
 
export default async function SignIn() {
  const session = await auth()
  if (session) return redirect("/")

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white flex items-center justify-center">
      <div className="max-w-md w-full mx-4">
        <div className="bg-white rounded-2xl shadow-sm border border-pink-100 p-8 text-center">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Welcome to Period Tracker
            </h1>
            <p className="text-gray-600">
              Track your cycle and sync with Google Calendar
            </p>
          </div>

          {/* Features */}
          <div className="mb-8 grid grid-cols-2 gap-4 text-sm">
            <div className="p-4 rounded-lg bg-pink-50">
              <div className="text-pink-600 font-medium mb-1">Track Periods</div>
              <div className="text-gray-600">Monitor your menstrual cycle</div>
            </div>
            <div className="p-4 rounded-lg bg-yellow-50">
              <div className="text-yellow-600 font-medium mb-1">Fertile Windows</div>
              <div className="text-gray-600">Know your fertile days</div>
            </div>
            <div className="p-4 rounded-lg bg-blue-50">
              <div className="text-blue-600 font-medium mb-1">Google Calendar</div>
              <div className="text-gray-600">Sync with your calendar</div>
            </div>
            <div className="p-4 rounded-lg bg-green-50">
              <div className="text-green-600 font-medium mb-1">Privacy First</div>
              <div className="text-gray-600">Your data stays private</div>
            </div>
          </div>

          {/* Sign In Button */}
          <form
            action={async () => {
              "use server"
              await signIn("google")
            }}
          >
            <button 
              type="submit"
              className="w-full bg-white hover:bg-gray-50 text-gray-900 font-medium py-3 px-4 rounded-lg border border-gray-300 shadow-sm transition-colors duration-200 flex items-center justify-center gap-3"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.07 1.06-3.25 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 13.84c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V6.82H2.18C1.43 8.55 1 10.48 1 12.5s.43 3.95 1.18 5.68l3.66-2.84z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Signin with Google
            </button>
          </form>
        </div>
      </div>
    </div>
  )
} 