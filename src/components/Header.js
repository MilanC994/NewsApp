import React from 'react'
import { Navbar, Form, FormControl } from 'react-bootstrap'
import useHeader from './hooks/useHeader'
import { Link } from 'react-router-dom'

const Header = () => {
  const { search, selectList } = useHeader()

  return (
    <Navbar fixed="top" className="mb1" bg="primary" variant="dark" expand="md">
      <Link to="/" className="link">
        <Navbar.Brand>News Application</Navbar.Brand>
      </Link>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Form
          inline
          className="ml-auto"
          onSubmit={e => {
            e.preventDefault()
          }}
        >
          <FormControl
            type="text"
            placeholder="Search"
            className="mr-sm-2"
            {...search}
          />
          <Form.Control
            as="select"
            className="mr-sm-2 countries-sort-select-list"
            id="inlineFormCustomSelect"
            custom
            {...selectList.item}
          >
            {selectList.options.map(item => (
              <option key={item.value} {...item}>
                {item.name}
              </option>
            ))}
          </Form.Control>
        </Form>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Header
