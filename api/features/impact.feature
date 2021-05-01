Feature: Impact API testing
  Scenario: List impacts as admin
    Given I am authenticated as admin
    When I get the list for the resource "impacts"
    Then the response should be in JSON
    And the request should be successful

  Scenario: List impacts as manager, I should be denied
    Given I am authenticated as manager
    When I get the list for the resource "impacts"
    Then the response should be in JSON
    And I should be forbidden

  Scenario: List impacts as guest, I should be denied
    Given I am authenticated as guest
    When I get the list for the resource "impacts"
    Then the response should be in JSON
    And I should be forbidden

  Scenario: Get single impact
    Given I am authenticated as admin
    When I get the item "1" from "impacts"
    Then the response should be in JSON

  Scenario: Get single impact as manager
    Given I am authenticated as manager
    When I get the item "1" from "impacts"
    Then the response should be in JSON

  Scenario: Get single impact as guest
    Given I am authenticated as guest
    When I get the item "1" from "impacts"
    Then the response should be in JSON
    And I should be forbidden

  Scenario: Create new impact as admin
    Given I am authenticated as admin
    When I try to create an impact with:
      """
      {"name": "exempleAsAdmin"}
      """
    Then it should be created

  Scenario: Create new impact as manager
    Given I am authenticated as manager
    When I try to create an impact with:
      """
      {"name": "exempleAsManager"}
      """
    Then I should be forbidden

  Scenario: Create new impact as guest
    Given I am authenticated as guest
    When I try to create an impact with:
      """
      {"name": "exempleAsGuest"}
      """
    Then I should be forbidden

  Scenario: update impact as admin
    Given I am authenticated as admin
    When I try to update an impact on id:"1" with:
      """
      {"name": "exempleToYelaa"}
      """
    Then the request should be successful
    And I get the item "1" from "impacts"
    And the response should contain "exempleToYelaa"

  Scenario: update impact as manager
    Given I am authenticated as manager
    When I try to update an impact on id:"2" with:
      """
      {"name": "exempleToYolo"}
      """
    Then I should be forbidden

  Scenario: update impact as guest
    Given I am authenticated as guest
    When I try to update an impact on id:"3" with:
      """
      {"name": "exempleToYoloGuest"}
      """
    Then I should be forbidden

  Scenario: Delete impact as admin
    Given I am authenticated as admin
    When I try to delete an impact with id: "1"
    Then it should be deleted

  Scenario: Delete impact as manager
    Given I am authenticated as manager
    When I try to delete an impact with id: "2"
    Then I should be forbidden

  Scenario: Delete impact as guest
    Given I am authenticated as guest
    When I try to delete an impact with id: "3"
    Then I should be forbidden
