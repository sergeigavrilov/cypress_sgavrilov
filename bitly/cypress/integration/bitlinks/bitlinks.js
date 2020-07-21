import { groupId, token, setPathSuffix, setGroupPath, sendRequest } from "../bitly/init";
import "../bitly/bitly1"

setPathSuffix("/bitlinks/clicks") // sort by clicks is only currently available

Then('I successfully get sorted list of bitlinks', () => {
    let url = setGroupPath(groupId)
    sendRequest('GET', url, true, token)
    .then(resp => {
        expect(resp.status).to.eq(200)
        
      })

})
