import React from 'react'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import User from './User'

configure({ adapter: new Adapter() })

describe('User', () => {
  const assert =
    '<li class="collection-item d-flex">' +
    '<span class="comment-author">testUser</span>' +
    '<span class="comment">testUserComment</span>' +
    '</li>'

  it('should receive props and display user info', () => {
    const wrapper = shallow(
      <User id="4" name="testUser" comment="testUserComment" />,
    )
    expect(wrapper.find('li').html()).toEqual(assert)
  })
})
