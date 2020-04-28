import axios from 'axios'
import { mockPostData, mockUserData } from '../../../__mocks__/axios'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import React from 'react'
import Posts from './Posts'
import MockAdapter from 'axios-mock-adapter'

jest.unmock('axios')
configure({ adapter: new Adapter() })

describe('Posts', () => {
  let postsComponent = shallow(<Posts />)
  it('should return posts and users when requested', async () => {
    let mock = new MockAdapter(axios)
    mock
      .onGet('https://jsonplaceholder.typicode.com/posts')
      .reply(200, mockPostData)
      .onGet('https://jsonplaceholder.typicode.com/users')
      .reply(200, mockUserData)

    console.log(postsComponent.instance().getPostsAndUsers())
    expect(await postsComponent.instance().getPostsAndUsers()).toStrictEqual([
      mockPostData,
      mockUserData,
    ])
  })

  it('should convert posts and users into updatedPosts', async () => {
    expect(postsComponent.instance().state.updatedPosts.length).toEqual(0)

    postsComponent
      .instance()
      .convertIntoUpdatedPosts(mockPostData, mockUserData)

    expect(postsComponent.instance().state.updatedPosts.length).toEqual(1)
    expect(
      postsComponent.instance().state.updatedPosts[0].post.userId,
    ).toStrictEqual(mockUserData[0].id)
    expect(
      postsComponent.instance().state.updatedPosts[0].username,
    ).toStrictEqual('testUser')
  })
})
