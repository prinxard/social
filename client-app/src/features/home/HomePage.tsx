import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Header, Segment,Image, Button } from 'semantic-ui-react';

export default function HomePage(){
    return(
      <Segment inverted textAlign='center' className='masthead'> 
        <Container text>
            <Header as='h1' inverted>
                <Image size='massive' src='/assets/logo.png' alt='logo' style={{marginBottom: 12}} />
                Reactivities
            </Header>
            <Header as='h2' inverted content='Welcome to reactivities' />
            <Button as={Link} to='/activities' size='huge' inverted>
                Go to Activites!
            </Button>
        </Container>
      </Segment>
    )
}