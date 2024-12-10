export interface State {
  loading: boolean
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
  delta: null
}

export interface Data {
  data: VersionedDataItem[]
}
