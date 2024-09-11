'use client'

import { useState, useEffect } from 'react'
import {
  eachDayOfInterval,
  startOfWeek,
  endOfWeek,
  format,
  startOfMonth,
  endOfMonth,
  isSameMonth,
  addMonths,
  subMonths,
  isSameDay,
  addWeeks,
} from 'date-fns'

export default function Home() {
  const [currentMonth, setCurrentMonth] = useState(() => new Date())
  const [today, setToday] = useState(() => new Date())
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setCurrentMonth(new Date())
    setToday(new Date())
    setIsLoading(false)
  }, [])

  if (isLoading) {
    return null
  }

  const monthStart = startOfMonth(currentMonth)
  const monthEnd = endOfMonth(currentMonth)
  const calendarStart = startOfWeek(monthStart, { weekStartsOn: 1 })
  const calendarEnd = addWeeks(endOfWeek(monthEnd, { weekStartsOn: 1 }), 1) // Ensure 6 weeks
  const calendarDays = eachDayOfInterval({ start: calendarStart, end: calendarEnd })

  const firstWeek = eachDayOfInterval({ start: calendarStart, end: endOfWeek(calendarStart, { weekStartsOn: 1 }) })

  const goToPreviousMonth = () => setCurrentMonth(prevMonth => subMonths(prevMonth, 1))
  const goToNextMonth = () => setCurrentMonth(prevMonth => addMonths(prevMonth, 1))
  const goToCurrentMonth = () => setCurrentMonth(new Date())

  return (
    <main className="p-16 bg-neutral-900 text-gray-300">
      <div className="flex justify-between items-center mb-4">
        <button onClick={goToPreviousMonth} className="bg-neutral-700 px-4 py-2 rounded">
          Previous
        </button>
        <button onClick={goToCurrentMonth} className="text-2xl font-bold hover:text-white transition-colors">
          {format(currentMonth, 'MMMM yyyy')}
        </button>
        <button onClick={goToNextMonth} className="bg-neutral-700 px-4 py-2 rounded">
          Next
        </button>
      </div>
      <div className="grid grid-cols-7 gap-px border border-neutral-700 bg-neutral-700">
        {firstWeek.map(day => (
          <div key={day.toString()} className="p-2 bg-neutral-800 text-sm font-medium">
            {format(day, 'EEE').toUpperCase()}
          </div>
        ))}
        {calendarDays.map(day => (
          <div
            key={day.toString()}
            className={`p-2 bg-neutral-800 h-24 ${!isSameMonth(day, monthStart) ? 'text-neutral-600' : ''}`}
          >
            <div className="flex items-center justify-center w-8 h-8">
              <div
                className={`flex items-center justify-center w-7 h-7 rounded-full ${
                  isSameDay(day, today) ? 'bg-white text-neutral-900 font-bold' : ''
                }`}
              >
                {format(day, 'd')}
              </div>
            </div>
            {/* Placeholder for events */}
            <div className="mt-1 text-xs">
              {/* Example event */}
              {isSameMonth(day, monthStart) && Math.random() > 0.8 && (
                <div className="bg-neutral-700 p-1 rounded">Event ({Math.floor(Math.random() * 8 + 1)}h)</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}
