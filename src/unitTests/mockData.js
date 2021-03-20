import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import reducer from '../redux/reducer'

export const createTestStore = initialState => {
  const createStoreWithMiddleware = applyMiddleware(thunk)(createStore)
  return createStoreWithMiddleware(reducer, initialState)
}
export const mockArticles = [
  {
    author: 'Jim Halpert',
    content: 'test content 1',
    description: 'test description 1',
    publishedAt: '2021-01-02T13:25:54Z',
    source: { id: null, name: 'test src 1' },
    title: 'test title 1',
    url: 'test site url 1',
    urlToImage: 'test image url 1',
  },
  {
    author: 'Pam Beasley',
    content: 'test content 2',
    description: 'test description 2',
    publishedAt: '2021-01-02T13:25:54Z',
    source: { id: null, name: 'test src 2' },
    title: 'test title 2',
    url: 'test site url 2',
    urlToImage: 'test image url 2',
  },
  {
    author: 'Stanley Hudson',
    content: 'test content 3',
    description: 'test description 3',
    publishedAt: '2021-01-02T13:25:54Z',
    source: { id: null, name: 'test src 3' },
    title: 'test title 3',
    url: 'test site url 3',
    urlToImage: 'test image url 3',
  },
  {
    author: 'Dwight Schrute',
    content: 'test content 4',
    description: 'test description 4',
    publishedAt: '2021-01-02T13:25:54Z',
    source: { id: null, name: 'test src 4' },
    title: 'test title 4',
    url: 'test site url 4',
    urlToImage: 'test image url 4',
  },
  {
    author: 'Creed Bratton',
    content: 'test content 5',
    description: 'test description 5',
    publishedAt: '2021-01-02T13:25:54Z',
    source: { id: null, name: 'test src 5' },
    title: 'test title 5',
    url: 'testsiteurl5',
    urlToImage: 'testimageurl5',
  },
]

export const mockResponse = {
  status: 200,
  statusText: '',
  data: {
    status: 'ok',
    totalResults: 5,
    articles: mockArticles,
  },
}

export const mockState = {
  articles: [],
  searchTerm: '',
  sortBy: 'publishedAt',
  country: 'us',
  page: 1,
  totalResults: 35,
}
