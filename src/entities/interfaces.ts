export type TimePayload = {
  type: 'unique' | 'weekly' | 'daily',
  start: string,
  end: string,
}

export type DeletePayload = {
  id: number,
}

interface Interval extends TimePayload {
  limitDay: string,
}

export type interv = {
  start: string,
  end: string,
}

export interface Rule extends TimePayload {
  id: number,
  day: string,
  limitDay?: string,
  weekdays?: string[],
  intervals?: interv[];
}

export interface DailySchedule extends Interval { }

export interface WeeklySchedule extends Interval {
  weekdays: string[],
}

export interface UniqueDaySchedule extends TimePayload {
  day: string,
}


