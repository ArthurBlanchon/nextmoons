import { signIn, auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import Image from "next/image"
import Link from 'next/link'
 
export default async function SignIn() {
  const session = await auth()
  if (session) return redirect("/")

  return (
    <div className="min-h-screen bg-[#FAF9F6] flex">
      {/* Left Section - Image */}
      <div className="hidden lg:flex lg:w-1/2 relative">
        <div className="w-full relative pl-12">
          <Image
            src="/nextmoons-cover.png"
            alt="Moon phases illustration"
            className="object-contain"
            style={{ width: '100%', height: '100vh' }}
            width={1000}
            height={1000}
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/10 to-transparent" />
        </div>
      </div>

      {/* Right Section - Content */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 lg:px-16">
        <div className="max-w-md mx-auto w-full">
          {/* Header */}
          <div className="mb-12 space-y-4">
            <div className="flex items-center gap-3 mb-2">
              <Image
                src="/nextmoons-logo.png"
                alt="Nextmoons Logo"
                width={30}
                height={30}
                className="w-10 h-10"
              />
              <h1 className="text-display font-light tracking-tight text-gray-900">
                Nextmoons
              </h1>
            </div>
            <p className="text-subtitle text-gray-600 leading-relaxed">
              Align work with your natural rhythm.
              Schedule around your cycles in Google Calendar.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-2 gap-6 mb-12">
            <div className="space-y-2">
              <div className="w-8 h-8 rounded-full bg-rose-50 flex items-center justify-center">
                <svg className="w-4 h-4 text-rose-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-medium text-body text-gray-900">Smart Scheduling</h3>
              <p className="text-small text-gray-500">Plan meetings and tasks around your energy levels</p>
            </div>
            <div className="space-y-2">
              <div className="w-8 h-8 rounded-full bg-amber-50 flex items-center justify-center">
                <svg className="w-4 h-4 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-medium text-body text-gray-900">Peak Performance</h3>
              <p className="text-small text-gray-500">Leverage your natural productivity cycles</p>
            </div>
            <div className="space-y-2">
              <div className="w-8 h-8 rounded-full bg-purple-50 flex items-center justify-center">
                <svg className="w-4 h-4 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
              </div>
              <h3 className="font-medium text-body text-gray-900">Seamless Sync</h3>
              <p className="text-small text-gray-500">Direct integration with Google Calendar</p>
            </div>
            <div className="space-y-2">
              <div className="w-8 h-8 rounded-full bg-teal-50 flex items-center justify-center">
                <svg className="w-4 h-4 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="font-medium text-body text-gray-900">Private & Discreet</h3>
              <p className="text-small text-gray-500">Professional calendar labels for workplace privacy</p>
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
              className="w-full bg-white hover:bg-gray-50 text-gray-900 font-medium py-4 px-6 rounded-xl border border-gray-200 shadow-sm transition-all duration-200 flex items-center justify-center gap-3 hover:shadow-md"
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
              Continue with Google
            </button>
          </form>

          {/* Footer */}
          <p className="mt-8 text-center text-small text-gray-500">
            By continuing, you agree to our{" "}
            <Link 
              href="/terms" 
              className="font-semibold hover:underline"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link 
              href="/privacy" 
              className="font-semibold hover:underline"
            >
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
} 