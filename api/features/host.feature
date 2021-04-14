Feature: Host API testing
  Scenario: List hosts as admin
    Given I am authenticated as admin
    When I get the list for the resource "hosts"
    Then the response should be in JSON
    And the request should be successful

  Scenario: List hosts as manager, I should be denied
    Given I am authenticated as manager
    When I get the list for the resource "hosts"
    Then the response should be in JSON
    And I should be forbidden

  Scenario: List hosts as guest, I should be denied
    Given I am authenticated as guest
    When I get the list for the resource "hosts"
    Then the response should be in JSON
    And I should be forbidden

  Scenario: Get single hosts as manager
    Given I am authenticated as manager
    When I get the item "1" from "hosts"
    Then the response should be in JSON 
    And the request should be successful

  Scenario: Create new host
    Given I am authenticated as admin
    When I try to create an impact with:
      """
      {"name": "exemple",
       "technology": "markdown"
      }
      """
    Then it should be created
