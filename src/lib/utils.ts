import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { type Timetable } from '../content/config'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getTimetable(tables: Timetable, date?: Date) {
  if (!date) return []

  date.setHours(8) // 偏移量，防止被当成昨天
  const dateString = date.toISOString().slice(0, 10)

  if (dateString in tables) return tables[dateString]

  return []
}

// 获取时间戳
export const getTimeStamp = (timeString) =>
  new Date(`${new Date().toISOString().slice(0, 11)}${timeString}`).getTime()

// 得到这一周的所有日期列表
export function getDaysOfThisWeek() {
  const today = new Date()
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