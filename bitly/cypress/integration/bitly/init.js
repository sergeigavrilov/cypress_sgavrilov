import { Given, When, Then, And } from "../../plugins/node_modules/cypress-cucumber-preprocessor/steps";
import {  header, clientId, secret } from '../../fixtures/bitly';

export let token = ""
export let wrongToken = ""
export let groupId = ""
let basepath = "/v4/groups/"
let PathSuffix = ""

export function setPathSuffix(suffix) {
  PathSuffix = suffix
}

function logIn() {
  if (token.length == 0) {
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
  }
}
function getGropId() {
  logIn()
  cy.request({
    method: 'GET',
    url: basepath, 
    headers: {
      'Authorization': 'Bearer ' + token
    }
  }).then(resp => {
    expect(resp.status).to.eq(200)
    // get GUID of the first group for test purposes
    groupId = resp.body.groups[0].guid
  }) 
  
}

export function sendRequest(method, url, success, atoken) {
    return cy.request({
      method: method,
      url: url, //path + path + groupId,
      failOnStatusCode: success,
      headers: {
        'Authorization': 'Bearer ' + atoken
      }
    })
}

export function setGroupPath(id) {
  return basepath + id + PathSuffix;
}


When('I have logged in', () => {
  logIn()
});

Then('I successfully get groupId', () => {
  getGropId()
});

When('I know groupID', () => {
  if (groupId.length == 0) {
    getGropId()
  }
});
 
And ('I do not logged in', () => {
  wrongToken = ""
})

And ('I have wrong auth token', () => {
  wrongToken = "123123"
})

When ('I do not know groupID', () => {
  // do nothing
})

And ('I have wrong URL', () => {
  // do nothing
})
