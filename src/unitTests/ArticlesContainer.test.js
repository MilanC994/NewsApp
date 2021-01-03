import { createTestStore, mockResponse } from './mockData'
import React from 'react'
import { mount } from 'enzyme'
import ArticlesContainer from '../components/ArticlesContainer'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import { mountToJson } from 'enzyme-to-json'
import moxios from 'moxios'

beforeEach(() => {
    moxios.install()
    moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith(mockResponse)
    })
})

afterEach(() => {
    moxios.uninstall()
})

const axiosArticlesResponse = response => {
    moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith(response)
    })
}

describe('Articles Container Test test', () => {
    test('Renders correctly', () => {
        const initialState = {
            articles: [],
            searchTerm: '',
            sortBy: 'publishedAt',
            country:'us',
            page: 1,
            totalResults: null
        }
        const store = createTestStore(initialState) 

        const wrapper = mount(
                <Provider store={store}>
                    <ArticlesContainer />
                </Provider>
                    ).childAt(0)
        expect(mountToJson(wrapper)).toMatchSnapshot()
            })
    
    test('Renders load more button when more articles exist', () => {
        const initialState = {
            articles: [],
            searchTerm: '',
            sortBy: 'publishedAt',
            country:'us',
            page: 1,
            totalResults: 35
        }

        const store = createTestStore(initialState) 

        const wrapper = mount(
            <Provider store={store}>
                <Router>
                    <ArticlesContainer />
                </Router>
            </Provider>
        )
        const element = wrapper.find('#load-more-articles-button').at(1)   
        expect(element.exists).toBeTruthy()
       
    })
    test('Does not render load more button when more articles do not exist', () => {    
        const initialState = {
            articles: [],
            searchTerm: '',
            sortBy: 'publishedAt',
            country:'us',
            page: 1,
            totalResults: 0
        }

        const store = createTestStore(initialState) 

        const wrapper = mount(
            <Provider store={store}>
                <Router>
                    <ArticlesContainer />
                </Router>
            </Provider>
        ).at(0).at(0)
        const element = wrapper.find('#load-more-articles-button')
    
         expect(element.exists()).toBeFalsy()
       
    })

})