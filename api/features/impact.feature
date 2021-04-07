Feature: Impact API testing
  Scenario: List impacts
    Given I am authenticated as admin
    When I get the list for the resource "impacts"
    Then the response should be in JSON
    And the request should be successful

  Scenario: List impacts as guest, I should be denied
    Given I am authenticated as guest
    When I get the list for the resource "impacts"
    Then the response should be in JSON
    And I should be forbidden

  Scenario: Get single impact
    Given I am authenticated as admin
    When I get the item "1" from "impacts"
    Then the response should be in JSON


  Scenario: Create new impact
    Given I am authenticated as admin
    When I try to create an impact with:
      """
      {"name": "exemple"}
      """
    Then it should be created
