import { createTestStore } from './mockData'
import React from 'react'
import {  mount } from 'enzyme'
import { mountToJson } from 'enzyme-to-json'
import Header from '../components/Header'
import { Provider } from 'react-redux'

// const setUp = (initialState, expectedValue) => {
//     const store = createTestStore(initialState) 

//     const wrapper = mount(
//         <Provider store={store}>
//         <Header />
//         </Provider>
//     ).childAt(0)

//     const element = wrapper.find('.countries-sort-select-list').at(1)
//     expect(element.props().value).toEqual(expectedValue)
// }
const setUp = (initialState) => {
    const store = createTestStore(initialState) 

    const wrapper = mount(
                        <Provider store={store}>
                            <Header />
                        </Provider>
                    ).childAt(0)
    return wrapper
}

describe('Header test', () => {
    //TODO - figure out how to pass parameters to beforeEach
    test('Renders correctly', () => {
        const initialState = {
            articles: [],
            searchTerm: '',
            sortBy: 'publishedAt',
            country:'us',
            page: 1,
            totalResults: null
        }
        const wrapper = setUp(initialState)
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
        const wrapper = setUp(initialState)
        const element = wrapper.find('.countries-sort-select-list').at(1)
        expect(element.props().value).toEqual('us')
       
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
        const wrapper = setUp(initialState)
        const element = wrapper.find('.countries-sort-select-list').at(1)
        expect(element.props().value).toEqual('publishedAt')
    })
})