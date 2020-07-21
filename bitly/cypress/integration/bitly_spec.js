/// <reference types="cypress" />

// get configuration from JSON file
import {  header, clientId, secret } from '../fixtures/bitly';
import {sendRequest, setGroupPath, setPathSuffix} from './bitly/init'


context('My First Test', () => {

 var token
 var groupId
  before( function() {

    setPathSuffix("")
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
    sendRequest('GET', setGroupPath(""), true, token)
    .then(resp => {
      expect(resp.status).to.eq(200)
      // get GUID of the first group for test purposes
      groupId = resp.body.groups[0].guid
    })

  })
  
  it('Get information about group, positive', () => {
    let url = setGroupPath(groupId)
    sendRequest('GET', url, true, token)
    .then(resp => {
      expect(resp.status).to.eq(200)
      
    })
  })  

  it('Get information about group, negative - not found', () => {
    let url = setGroupPath("somepath/" + groupId)
    sendRequest('GET', url, false, token)
    .then(resp => {
      expect(resp.status).to.eq(404)
    })
})


it('Get information about group, negative - no auth token', () => {
  let url = setGroupPath(groupId)
  sendRequest('GET', url, false, "")
  .then(resp => {
    expect(resp.status).to.eq(403)
    expect(resp.body.message).to.eq('FORBIDDEN')        
  })
})

it('Get information about group, negative - incorrect auth token', () => {
    let url = setGroupPath(groupId)
    sendRequest('GET', url, false, "123")
    .then(resp => {
      expect(resp.status).to.eq(403)
      expect(resp.body.message).to.eq('FORBIDDEN')
    })
  })

  it('Get information about group, negative - incorrect groupId', () => {
    let url = setGroupPath("123")
    sendRequest('GET', url, false, token)  
    .then(resp => {
      expect(resp.status).to.eq(403)
      expect(resp.body.description).to.eq('You are currently forbidden to access this resource.')
      
    })
  })

  it ('Set path suffix for Bitlinks Sort requests', () => {
        // Call it before Bitlinks Sort tests
        setPathSuffix("/bitlinks/clicks") // sort by clicks is only currently available
  })

  it('Get Bitlinks of the group ' + groupId + ' positive', () => {
    let url = setGroupPath(groupId)
    sendRequest('GET', url, true, token)
    .then(resp => {
      expect(resp.status).to.eq(200)
      
    })
  })
    
  it('Get Bitlinks of the group ' + groupId + ', negative - not found', () => {
      let url = setGroupPath("somepath/" + groupId)
      sendRequest('GET', url, false, token)
      .then(resp => {
        expect(resp.status).to.eq(404)
      })
  })
      
  it('Get Bitlinks of the group with wrong groupId, negative - incorrect groupId', () => {
      let url = setGroupPath("123")
      sendRequest('GET', url, false, token)
      .then(resp => {
        expect(resp.status).to.eq(403)
        expect(resp.body.description).to.eq('You are currently forbidden to access this resource.')
        
      })
  })
  it('Get Bitlinks of the group ' + groupId + ', negative - no auth token', () => {
      let url = setGroupPath(groupId)
      sendRequest('GET', url, false, "")  
      .then(resp => {
        expect(resp.status).to.eq(403)
        expect(resp.body.message).to.eq('FORBIDDEN')        
      })
  })
  
  it('Get Bitlinks of the group ' + groupId + ', negative - incorrect auth token', () => {
      let url = setGroupPath(groupId)
      sendRequest('GET', url, false, "123")
      .then(resp => {
        expect(resp.status).to.eq(403)
        expect(resp.body.message).to.eq('FORBIDDEN')
      })
  })
  
})
