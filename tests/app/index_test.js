/* global describe, it, expect, beforeEach */
import React from 'react'
import { mount } from 'enzyme'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import App from '../../src/app/index'

const mock = new MockAdapter(axios)

describe('App', () => {
  beforeEach(() => {
    mock.reset()
  })

  it(`should render the app with the auth button, not authorized`, () => {
    mock
      .onGet('/authorized').reply(200, true)
      .onGet('/page/0/0').reply(200, [])

    const wrapper = mount(<App />)
    expect(wrapper.update().find('#app').length).toBe(0)
    expect(wrapper.state().authorized).toBeFalsy()
  })

  it(`should render the app authorized`, (done) => {
    mock
      .onGet('/authorized').reply(200, true)
      .onGet('/page/0/0').reply(200, [])

    const wrapper = mount(<App />)

    setTimeout(() => {
      expect(wrapper.state().authorized).toBeTruthy()
      expect(wrapper.update().find('#app').length).toBe(1)
      done()
    }, 1)
  })

  it(`should have no tweets`, (done) => {
    mock
      .onGet('/authorized').reply(200, true)
      .onGet('/page/0/0').reply(200, [])

    const wrapper = mount(<App />)

    setTimeout(() => {
      expect(wrapper.state().done).toBeTruthy()
      done()
    }, 1)
  })

  it(`should have tweets`, (done) => {
    mock
      .onGet('/authorized').reply(200, true)
      .onGet('/page/0/0').reply(200, [{_id: 'dummy'}])

    const wrapper = mount(<App />)

    setTimeout(() => {
      expect(wrapper.state().tweets.length).toBe(1)
      done()
    }, 1)
  })
})
