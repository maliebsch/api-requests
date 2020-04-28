import React from 'react'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Post from './Post'

configure({ adapter: new Adapter() })

describe('Post', () => {
  const assert =
    '<li class="collection-item">' +
    '<h5 class="post-title">testTitle</h5>' +
    '<div class="post-author green-text text-lighten-3">' +
    'testUser' +
    '</div>' +
    '</li>'

  it('should receive props and display post info', () => {
    const wrapper = shallow(
      <Post key="2" title="testTitle" username="testUser" />,
    )
    expect(wrapper.find('li').html()).toEqual(assert)
  })
})
