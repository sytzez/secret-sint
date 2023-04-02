export interface ProgressBarProps {
  label: string
  progress: number
}

export default function ProgressBar({ label, progress }: ProgressBarProps) {
  return (
    <div className="mb-2">
      <p className="text-white mb-1">{label}</p>
      <div className="bg-gradient-to-r from-red-900 to-red-800 rounded-full h-8 shadow-md">
        <div
          className="bg-gradient-to-r from-yellow-300 to-yellow-200 rounded-full h-8"
          style={{ width: `${progress * 100}%`, minWidth: '2rem' }}
        />
      </div>
    </div>
  )
}
