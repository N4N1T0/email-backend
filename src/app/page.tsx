export const dynamic = 'force-static'

export default function LandingPage() {
  return (
    <div className='flex min-h-screen items-center justify-center bg-slate-100'>
      <div className='mx-auto max-w-2xl rounded-xl bg-gray-800 bg-opacity-10 px-6 py-10 text-center shadow-lg backdrop-blur-md'>
        <h1 className='mb-4 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl'>
          Email Sending Backend
        </h1>
        <p className='mb-8 text-lg text-gray-700 sm:text-xl md:text-2xl'>
          is a simple backend for sending emails with Node.js and Next.js
        </p>
      </div>
    </div>
  )
}
