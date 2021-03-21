Feature: Impact API testing
  Scenario: List impacts
    Given I am authenticated as admin
    When I get the list for the resource "impacts"
    Then I should be unauthorized

  Scenario: Get single impact
    Given I am authenticated as admin
    When I get the item "1" from "impacts"
    Then the response should be in JSON


  Scenario: Create new impact
    Given I am authenticated as admin
    When I try to create an impact with "data"
    """
    {name: "exemple"}
    """
    Then the response status code should be 201
