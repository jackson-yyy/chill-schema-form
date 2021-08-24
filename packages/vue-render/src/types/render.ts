import { Schema, UiSchema } from '@chill-schema-form/core'

export type RenderProps = {
  schema?: Schema
  uiSchema?: UiSchema
  formData?: Record<string, any>

  // TODO: fix component type
  customComponents?: Record<string, unknown>
  customFormats?: Record<string, (value: any) => boolean>
}
