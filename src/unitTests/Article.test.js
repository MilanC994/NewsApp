import React from 'react'
import { mount } from 'enzyme'
import { BrowserRouter as Router } from 'react-router-dom'
import { mountToJson } from 'enzyme-to-json'
import Article from '../components/Article'

describe('Article   test', () => {
  test('Renders correctly', () => {
    const componentProps = {
      location: {
        state: {
          title: 'test Title',
          source: 'testSource',
          author: 'testAuthor',
          description: 'testDescription',
          urlToImage: 'testUrlToImage',
          publishedAt: '2021-01-02T13:25:54Z',
          content: 'test article content',
          url: 'testurl',
        },
      },
    }
    const wrapper = mount(
      <Router>
        <Article {...componentProps} />
      </Router>,
    ).childAt(0)
    expect(mountToJson(wrapper)).toMatchSnapshot()
  })
  test('Does not render component when location props is null', () => {
    const wrapper = mount(
      <Router>
        <Article />
      </Router>,
    ).childAt(0)
    const element = wrapper.find('.article-card')
    expect(element.exists()).toBeFalsy()
  })
})
