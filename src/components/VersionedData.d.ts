export interface State {
  loading: boolean
}

export interface Data {
  data: DataItem | null
}

interface DataItem {
  id: string
  status: Status
  text_block_1: string
}

export interface ResponseData {
  data: DataItem
}
