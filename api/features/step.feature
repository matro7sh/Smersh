Feature: Step API testing
  Scenario: List steps as admin
    Given I am authenticated as admin
    When I get the list for the resource "steps"
    Then the response should be in JSON
    And the request should be successful

  Scenario: List steps as manager, I should be denied
    Given I am authenticated as manager
    When I get the list for the resource "steps"
    Then the response should be in JSON
    And I should be forbidden

  Scenario: List steps as guest, I should be denied
    Given I am authenticated as guest
    When I get the list for the resource "steps"
    Then the response should be in JSON
    And I should be forbidden

  Scenario: Get single step
    Given I am authenticated as admin
    When I get the item "1" from "steps"
    Then the response should be in JSON
    And the request should be successful

  Scenario: Get single step as manager
    Given I am authenticated as manager
    When I get the item "1" from "steps"
    Then the response should be in JSON
    And I should be forbidden

  Scenario: Get single step as guest
    Given I am authenticated as guest
    When I get the item "1" from "steps"
    Then the response should be in JSON
    And I should be forbidden


  Scenario: Create new step as admin
    Given I am authenticated as admin
    When I try to create an step with:
      """
     {
	"findAt":"2021-04-13T15:35:26.000Z",
	"description":"Step  as Admin",
	"mission":"/api/missions/1",
	"createdAt":"2021-04-17T15:35:36.256Z"
}
      """
    Then the request should be successful
    And it should be created


  Scenario: Create new step as manager
    Given I am authenticated as manager
    When I try to create an step with:
      """
     {
	"findAt":"2021-04-13T15:35:26.000Z",
	"description":"Step as manager",
	"mission":"/api/missions/1",
	"createdAt":"2021-04-17T15:35:36.256Z"
}
      """
    Then I should be forbidden


  Scenario: Create new step as guest
    Given I am authenticated as guest
    When I try to create an step with:
      """
     {
	"findAt":"2021-04-13T15:35:26.000Z",
	"description":"Step as guest",
	"mission":"/api/missions/1",
	"createdAt":"2021-04-17T15:35:36.256Z"
}
      """
    Then I should be forbidden

  Scenario: Delete step as admin
    Given I am authenticated as admin
    When I try to delete an step with id: "1"
    Then it should be deleted

  Scenario: Delete step as manager
    Given I am authenticated as manager
    When I try to delete an step with id: "2"
    Then I should be forbidden

  Scenario: Delete step as guest
    Given I am authenticated as guest
    When I try to delete an step with id: "2"
    Then I should be forbidden


  Scenario: update step as admin
    Given I am authenticated as admin
    When I try to update an step on id:"2" with:
      """
      {
	"findAt":"2021-04-13T15:35:26.000Z",
	"description":"Update step as admin ",
	"mission":"/api/missions/1",
	"createdAt":"2021-04-17T15:35:36.256Z"
}
      """
    Then the request should be successful


  Scenario: update step as manager
    Given I am authenticated as manager
    When I try to update an step on id:"2" with:
      """
      {
	"findAt":"2021-04-13T15:35:26.000Z",
	"description":"update step as manager",
	"mission":"/api/missions/1",
	"createdAt":"2021-04-17T15:35:36.256Z"
}
      """
    Then I should be forbidden


  Scenario: update step as guest
    Given I am authenticated as guest
    When I try to update an step on id:"2" with:
      """
      {
	"findAt":"2021-04-13T15:35:26.000Z",
	"description":"update step as guest",
	"mission":"/api/missions/1",
	"createdAt":"2021-04-17T15:35:36.256Z"
}
      """
    Then I should be forbidden
