import { Schema } from './types'
import { get, set } from 'lodash-es'

export class DataController {
  data = {}
  schema?: Schema

  watchMap: Record<string, (() => void)[]> = {}

  constructor(data: Record<string, any> = {}, schema: Schema = {}) {
    this.data = data
    this.schema = schema
    this.watchMap = {}
  }

  setValue(path: string, value: any) {
    set(this.data, path, value)

    // TODO: setValue后调用对应的callback
  }

  getValue(path?: string) {
    return path ? get(this.data, path) : this.data
  }

  getErrors(path: string) {
    path
    return {}
  }
}
