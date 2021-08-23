import {mount} from '@vue/test-utils'
import { FormRender, RenderProps } from '../../src/index'
import { uiSchema } from '../data/simpleRender'

describe('test render', () => {

  function initWrapper (props: RenderProps) {
    return mount({
      setup () {
        return () => FormRender(props) as any
      }
    })
  }
  
  test ('simple render', () => {
    const wrapper = initWrapper({
      uiSchema: uiSchema
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
})