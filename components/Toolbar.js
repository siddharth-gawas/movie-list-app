import React from 'react';

import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap'


const Toolbar = () => {
  return (
    <Navbar bg="primary" variant="dark" expand="lg">
      <Navbar.Brand href="/">Movie Details App </Navbar.Brand>
    </Navbar>
  )
}

export default Toolbar;