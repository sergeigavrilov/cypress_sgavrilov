/// <reference types="cypress" />

// get configuration from JSON file
import {  header, clientId, secret } from '../fixtures/bitly';


context('My First Test', () => {

  var token
  var groupId
  before( function() {

    cy.request({
      method: 'POST',
      url: '/oauth/access_token?client_id='+ 
            clientId + '&client_secret=' + secret, 
      headers: {
        'Authorization': header.basic
      }
    }).then(resp => {
      expect(resp.status).to.eq(200)
      token = resp.body
 
    })

  })

  it('Get groupID, positive', () => {
    // Get Group ID for future tests
    cy.request({
      method: 'GET',
      url: '/v4/groups', 
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }).then(resp => {
      expect(resp.status).to.eq(200)
      // get GUID of the first group for test purposes
      groupId = resp.body.groups[0].guid
    })

  })
  
  it('Get information about group, positive', () => {

    cy.request({
      method: 'GET',
      url: '/v4/groups/' + groupId, 
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }).then(resp => {
      expect(resp.status).to.eq(200)
      
    })
  })  

  it('Get information about group, negative - not found', () => {

    cy.request({
      method: 'GET',
      url: '/groups/' + groupId,
   failOnStatusCode: false
    }).then(resp => {
      expect(resp.status).to.eq(404)
    })
})

it('Get information about group, negative - no auth token', () => {

  cy.request({
    method: 'GET',
    url: '/v4/groups/' + groupId,
    failOnStatusCode: false
  }).then(resp => {
    expect(resp.status).to.eq(403)
    expect(resp.body.message).to.eq('FORBIDDEN')        
  })
})

it('Get information about group, negative - incorrect auth token', () => {

    cy.request({
      method: 'GET',
      url: '/v4/groups/' + groupId, 
      failOnStatusCode: false,
      headers: {
        'Authorization': 'Bearer 123'
      }
    }).then(resp => {
      expect(resp.status).to.eq(403)
      expect(resp.body.message).to.eq('FORBIDDEN')
    })
  })

  it('Get information about group, negative - incorrect groupId', () => {

    cy.request({
      method: 'GET',
      url: '/v4/groups/123', 
      failOnStatusCode: false,
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }).then(resp => {
      expect(resp.status).to.eq(403)
      expect(resp.body.description).to.eq('You are currently forbidden to access this resource.')
      
    })
  })

  it('Get Bitlinks of the group ' + groupId + ' positive', () => {
    cy.request({
      method: 'GET',
      url: '/v4/groups/' + groupId + '/bitlinks/clicks', // sort by clicks is only currently available
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }).then(resp => {
      expect(resp.status).to.eq(200)
      
    })
  })
    
  it(`Get Bitlinks of the group ' + groupId + ', negative - not found`, () => {
      cy.request({
        method: 'GET',
        url: '/groups/' + groupId + '/bitlinks/clicks', // sort by clicks is only currently available
        failOnStatusCode: false,
        headers: {
          'Authorization': 'Bearer ' + token
        }
      }).then(resp => {
        expect(resp.status).to.eq(404)
      })
  })
      
  it('Get Bitlinks of the group ' + groupId + ' negative - incorrect groupId', () => {
      cy.request({
        method: 'GET',
        url: '/v4/groups/123/bitlinks/clicks', 
        failOnStatusCode: false,
        headers: {
          'Authorization': 'Bearer ' + token
        }
      }).then(resp => {
        expect(resp.status).to.eq(403)
        expect(resp.body.description).to.eq('You are currently forbidden to access this resource.')
        
      })
  })
  it('Get Bitlinks of the group ' + groupId + ', negative - no auth token', () => {

      cy.request({
        method: 'GET',
        url: '/v4/groups/' + groupId + '/bitlinks/clicks',
        failOnStatusCode: false
      }).then(resp => {
        expect(resp.status).to.eq(403)
        expect(resp.body.message).to.eq('FORBIDDEN')        
      })
  })
  
  it('Get Bitlinks of the group ' + groupId + ', negative - incorrect auth token', () => {
  
      cy.request({
        method: 'GET',
        url: '/v4/groups/' + groupId + '/bitlinks/clicks',
        failOnStatusCode: false,
        headers: {
          'Authorization': 'Bearer 123'
        }
      }).then(resp => {
        expect(resp.status).to.eq(403)
        expect(resp.body.message).to.eq('FORBIDDEN')
      })
  })
  
})
