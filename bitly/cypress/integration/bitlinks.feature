  Feature: Get information of Bitlinks of test Group
 
     To retrieve list of my groups and
     get Bitlinks of the first one 
    
    Scenario: Get groupId
    When I have logged in
    Then I successfully get groupId

    Scenario: Get Bitlinks of the group, positive
    When I know groupID
    Then I successfully get sorted list of bitlinks

    Scenario: Get Bitlinks of incorrect groupId, negative
    When I do not know groupID
    Then Error 403 - access FORBIDDEN occurs

    Scenario: Get Bitlinks of a group, negative - no auth token
    When I know groupID
     And I do not logged in
    Then Auth Token error 403 - FORBIDDEN occurs
    
    Scenario: Get Bitlinks of a group, negative - incorrect auth token
    When I know groupID
     And I have wrong auth token
    Then Auth Token error 403 - FORBIDDEN occurs

    Scenario: Go to incorrect URL, negative - Not Found
    When I know groupID
     And I have wrong URL
    Then URL error 404 - Not Found occurs
    

    

