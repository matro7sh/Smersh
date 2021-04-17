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
    And I should be forbidden

  Scenario: Get single host
    Given I am authenticated as admin
    When I get the item "1" from "hosts"
    Then the response should be in JSON
    And the request should be successful


  Scenario: Get single host
    Given I am authenticated as manager
    When I get the item "1" from "hosts"
    Then the response should be in JSON
    And I should be forbidden


  Scenario: Get single host
    Given I am authenticated as guest
    When I get the item "1" from "guest"
    Then the response should be in JSON
    And  I should get the status code "404"


  Scenario: Create new host as admin
    Given I am authenticated as admin
    When I try to create a host with:
      """
     {
      "name": "192.168.1.6",
      "technology":"Php",
      "checked": false
      }
      """
    Then the request should be successful
    And it should be created


  Scenario: Create new host as manager
    Given I am authenticated as manager
    When I try to create a host with:
      """
     {
      "name": "10.10.10.2/24",
      "technology":"Range server",
      "checked": false
      }
      """
    Then I should be forbidden


  Scenario: Create new host as guest
    Given I am authenticated as guest
    When I try to create a host with:
      """
     {
      "name": "https://promox.lan:8000",
      "technology":"Promox",
      "checked": true
      }
      """
    Then I should be forbidden

  Scenario: Delete host as admin
    Given I am authenticated as admin
    When I try to delete a host with id: "1"
    Then it should be deleted

  Scenario: Delete host as manager
    Given I am authenticated as manager
    When I try to delete a host with id: "2"
    Then I should be forbidden

  Scenario: Delete host as guest
    Given I am authenticated as guest
    When I try to delete a host with id: "3"
    Then I should be forbidden


  Scenario: update host as admin
    Given I am authenticated as admin
    When I try to update a host on id:"2" with:
      """
      {
      "name": "https://yolo.com",
      "technology":"ThisIsAtest",
      "checked": false
      }
      """
    Then the request should be successful


  Scenario: update host as manager
    Given I am authenticated as manager
    When I try to update a host on id:"2" with:
      """
      {
      "name": "https://yolo.com",
      "technology":"ThisIsAtest",
      "checked": false
      }
      """
    Then I should be forbidden


  Scenario: update host as guest
    Given I am authenticated as guest
    When I try to update a host on id:"2" with:
      """
      {
      "name": "https://yolo.com",
      "technology":"ThisIsAtest",
      "checked": false
      }
      """
    Then I should be forbidden

