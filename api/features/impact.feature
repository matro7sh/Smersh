Feature: Testing Impact entity

  Scenario: Create a impact without JWT
    When I send a "POST" request to "/api/impact/" with body:
    """
    {name: "exemple"}
    """
    Then the response status code should be 500
    And the response should be in JSON
    And the header "Content-Type" should be equal to "application/ld+json"
