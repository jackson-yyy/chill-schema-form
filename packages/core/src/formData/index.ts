import { Schema } from '../types'
import { get, set } from 'lodash-es'

export class DataController {
  data = {}
  schema?: Schema

  constructor(data: Record<string, any> = {}, schema: Schema = {}) {
    this.data = data
    this.schema = schema
  }

  setValue(path: string, value: any) {
    set(this.data, path, value)
  }

  getValue(path?: string) {
    return path ? get(this.data, path) : this.data
  }

  getErrors(path: string) {
    path
    return {}
  }
}
