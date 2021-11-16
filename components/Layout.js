import React from 'react';
import Head from 'next/head'
import { Container } from 'react-bootstrap';


import Toolbar from './Toolbar'

/**
 * Root layout
 */
const Layout = (props) => {
    const { title } = props;
    return (
        <>
            <Head>
                {title && <title>{title}</title>}
                <link rel="preconnect" href="https://fonts.gstatic.com" />
                <link rel="icon" href='/static/video-solid.svg'/>
                <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300&display=swap" rel="stylesheet" />

            </Head>
            <Toolbar />
            <Container>{props.children}</Container>

            
        </>
    )
}

export default Layout;