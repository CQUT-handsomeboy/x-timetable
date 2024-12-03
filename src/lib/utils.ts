import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { type Timetable } from '../content/config'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getTimetable(tables: Timetable, date?: Date) {
  if (typeof date === 'undefined') return []

  const [month, dateday, year] = date
    .toLocaleString('en-US', { timeZone: 'Asia/Shanghai' })
    .split(',')[0]
    .split('/')
    .map((v) => parseInt(v))
  
  const dateString = `${year.toString().padStart(4, '0')}-${month.toString().padStart(2, '0')}-${dateday.toString().padStart(2, '0')}`

  if (dateString in tables) {
    return tables[dateString].sort(
      (a, b) =>
        getTimeStamp(a.time.slice(0, 5)) - getTimeStamp(b.time.slice(0, 5)),
    )
  }

  return []
}

export const today = new Date()

// 获取时间戳
export const getTimeStamp = (timeString: string) => {
  const [hours, minutes] = timeString.split(':').map((v) => parseInt(v))
  const newDate = new Date()
  newDate.setHours(hours)
  newDate.setMinutes(minutes)
  return newDate.getTime()
}

// 得到这一周的所有日期列表
export function getDaysOfThisWeek() {
  const currentDay = today.getDay() // 0 表示周日，1 表示周一，以此类推
  const weekDates: Date[] = []

  for (let i = 1; i < 8; i++) {
    const date = new Date(today)
    date.setDate(today.getDate() - currentDay + i)
    weekDates.push(date)
  }

  return weekDates
}

export const getThisWeekTimetable = (tables: Timetable) =>
  getDaysOfThisWeek().map((date) => getTimetable(tables, date))

export const weekDaysMapping = [
  '周一',
  '周二',
  '周三',
  '周四',
  '周五',
  '周六',
  '周天',
]
