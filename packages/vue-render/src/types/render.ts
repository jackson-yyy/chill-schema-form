import { Schema, UiSchema } from './schema'

export type RenderProps = {
  schema: Schema
  uiSchema: UiSchema
  formData: Record<string, any>

  // TODO: fix component type
  customComponents: Record<string, unknown>
  customFormats: Record<string, (value: any) => boolean>
}
