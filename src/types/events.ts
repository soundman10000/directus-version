export type Event = {
  success: boolean
  message: string
  type: EventTypes
}

export type EventTypes = 'approve' | 'deny' | 'promote'

export type Events = {
  event: Event
}
