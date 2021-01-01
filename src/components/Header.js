import React from 'react'
import { Navbar, Form, Button, FormControl } from 'react-bootstrap'
import useHeader from './hooks/useHeader'

const Header = () => {
  const { search, selectList } = useHeader()

    return (
        <Navbar fixed="top" className="mb1" bg="primary" variant="dark" expand="md">
        <Navbar.Brand href="#">News Application</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Form inline className="ml-auto" onSubmit={(e)=>{e.preventDefault()}}>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" { ...search }/>
            <Form.Control
              as="select"
              className="mr-sm-2" 
              id="inlineFormCustomSelect"
              custom
              {...selectList.item}
            >
              {selectList.options.map(item => <option key={item.value} {...item}>{item.name}</option>)}
            </Form.Control> 
          </Form>
            {/* <Nav style={{ border:"2px solid red" }}>
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#link">Link</Nav.Link>
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
              </NavDropdown>
            </Nav> */}
            
        </Navbar.Collapse>
      </Navbar>
        )
}

export default Header
