import { groupId, token, wrongToken, sendRequest, setPathSuffix, setGroupPath } from "./init";
setPathSuffix("")

  Then('I successfully get group info', () => {
    let url = setGroupPath(groupId)
    sendRequest('GET', url, true, token).then(resp => {
      expect(resp.status).to.eq(200)
      
    })
  })

  Then ('Error {int} - access FORBIDDEN occurs', (errCode) => {
    let url = setGroupPath('123')
    sendRequest('GET', url, false, token)
    .then(resp => {
      expect(resp.status).to.eq(errCode)
      expect(resp.body.description).to.eq('You are currently forbidden to access this resource.')
      
    })
  })

  Then ('URL error {int} - Not Found occurs', (errCode) => {

    let url = setGroupPath('somepath/' + groupId)
    // send request with some wrong groupID 
    sendRequest('GET', url, false, token)
    .then(resp => {
        expect(resp.status).to.eq(errCode)
    })

  })

  Then (/Auth Token error (-?\d+) \- (-?\w+) occurs/, (errCode, errMsg) => {
    let url = setGroupPath(groupId)
    sendRequest('GET', url, false, wrongToken)
    .then(resp => {
        expect(resp.status).to.eq(errCode)
        expect(resp.body.message).to.eq(errMsg)        
    })
  })



