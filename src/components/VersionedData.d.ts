type Status = 'published' | 'draft' | 'archived'

interface DataItem {
  id: string
  status: Status
  text_block_1: string
}

export interface ResponseData {
  data: DataItem
}
