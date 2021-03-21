Feature: Impact API testing
  Scenario: List impacts
    Given I am authenticated as admin
    When I get the list for the resource "impacts"
    Then I should be unauthorized
