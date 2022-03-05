import React from 'react'
import { mount } from 'enzyme'
import { Provider } from 'react-redux'
import { mountToJson } from 'enzyme-to-json'
import moxios from 'moxios'
import ArticlesContainer from '../components/ArticlesContainer'
import { createTestStore, mockResponse } from './mockData'

beforeEach(() => {
  moxios.install()
  moxios.wait(() => {
    const request = moxios.requests.mostRecent()
    request.respondWith(mockResponse)
  })
})

afterEach(() => {
  moxios.uninstall()
})

const setUp = (initialState) => {
  const store = createTestStore(initialState)

  const wrapper = mount(
    <Provider store={store}>
      <ArticlesContainer />
    </Provider>,
  ).childAt(0)

  return wrapper
}

describe('Articles Container Test test', () => {
  test('Renders correctly', () => {
    const initialState = {
      articles: [],
      searchTerm: '',
      sortBy: 'publishedAt',
      country: 'us',
      page: 1,
      totalResults: null,
    }
    const wrapper = setUp(initialState)
    expect(mountToJson(wrapper)).toMatchSnapshot()
  })

  test('Renders load more button when more articles exist', () => {
    const initialState = {
      articles: [],
      searchTerm: '',
      sortBy: 'publishedAt',
      country: 'us',
      page: 1,
      totalResults: 35,
    }
    const wrapper = setUp(initialState)
    const element = wrapper.find('#load-more-articles-button').at(1)
    expect(element.exists).toBeTruthy()
  })
  test('Does not render load more button when more articles do not exist', () => {
    const initialState = {
      articles: [],
      searchTerm: '',
      sortBy: 'publishedAt',
      country: 'us',
      page: 1,
      totalResults: 0,
    }
    const wrapper = setUp(initialState)
    const element = wrapper.find('#load-more-articles-button')

    expect(element.exists()).toBeFalsy()
  })
})
