export interface State {
  loading: boolean
}

export type Status = 'draft' | 'submitted' | 'approved' | 'published' | 'feedback'

interface Delta {
  status?: Status
  [key: string]: string | number | boolean | null | undefined | unknown
}

type VersionedDataItem = {
  id: string
  key: string
  name: string
  collection: string
  item: string
  hash: string
  date_created: string
  date_updated: string
  user_created: string | null
  user_updated: string | null
  delta: Delta | null
}

export interface Data {
  data: VersionedDataItem[]
  fields: string[]
}
