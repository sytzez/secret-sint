import { ReactNode } from 'react'

export interface LayoutProps {
  title?: string
  onBack?: () => void
  onHome: () => void
  onLogOut?: () => void
  children: ReactNode
}

export default function Layout({
  title,
  onBack,
  onHome,
  onLogOut,
  children,
}: LayoutProps) {
  return (
    <>
      <nav className="shadow-lg bg-red-600 overflow-hidden">
        <div className="max-w-md m-auto p-2 relative  h-16 flex items-center space-between">
          {onBack && (
            <button
              onClick={onBack}
              className="text-white p-2 hover:bg-red-700 rounded-full mr-1"
              title="Back"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                />
              </svg>
            </button>
          )}
          <button
            onClick={onHome}
            className="font-logo text-white text-5xl absolute left-1/2 transform -translate-x-1/2"
          >
            Secret Sint
          </button>
          {onLogOut && (
            <button
              onClick={onLogOut}
              className="text-yellow-200 ml-auto hover:text-white hover:underline"
            >
              Log out
            </button>
          )}
        </div>
      </nav>
      <div className="max-w-md m-auto py-8 px-2 flex gap-2 flex-col">
        {title && (
          <h1 className="text-white text-xl font-bold mb-4">{title}</h1>
        )}
        {children}
      </div>
    </>
  )
}
