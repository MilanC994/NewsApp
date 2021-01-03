import { createTestStore } from './mockData'
import React from 'react'
import {  mount } from 'enzyme'
import { mountToJson } from 'enzyme-to-json'
import Header from '../components/Header'
import { Provider } from 'react-redux'

const testSelectList = (initialState, expectedValue) => {
    const store = createTestStore(initialState) 

    const wrapper = mount(
        <Provider store={store}>
        <Header />
        </Provider>
    ).childAt(0)

    const element = wrapper.find('.countries-sort-select-list').at(1)
    expect(element.props().value).toEqual(expectedValue)
}

describe('Header test', () => {
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
                    <Header />
                </Provider>
                    ).childAt(0)
        expect(mountToJson(wrapper)).toMatchSnapshot()
            })
    
    test('Renders countries in select list when search bar is empty', () => {
        const initialState = {
            articles: [],
            searchTerm: '',
            sortBy: 'publishedAt',
            country:'us',
            page: 1,
            totalResults: null
        }

        testSelectList(initialState, 'us')
       
    })
    test('Renders sort by in select list when search bar is not empty', () => {
    
        const initialState = {
            articles: [],
            searchTerm: 'the office',
            sortBy: 'publishedAt',
            country:'us',
            page: 1,
            totalResults: null
        }

        testSelectList(initialState, 'publishedAt')
    })
})