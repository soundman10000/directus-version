type JSONPrimitive = string | number | boolean | null
export type JSONValue = JSONPrimitive | JSONObject | JSONArray
type JSONArray = Array<JSONValue>
type JSONObject = { [key: string]: JSONValue }

export const formatValue = (value: JSONValue): string => {
  if (typeof value === 'object') {
    if (value === null) {
      return 'null'
    } else if (Array.isArray(value)) {
      return `[${value.map((v) => formatValue(v)).join(', ')}]`
    } else {
      return `{${Object.entries(value)
        .map(([k, v]) => `${k}: ${formatValue(v)}`)
        .join(', ')}}`
    }
  }
  return String(value)
}
