<?php

use Behat\Behat\Context\Context;
use Behat\Behat\Tester\Exception\PendingException;
use Behat\Gherkin\Node\PyStringNode;
use Behat\Gherkin\Node\TableNode;

/**
 * Defines application features from the specific context.
 */
class FeatureContext implements Context
{
    /**
     * Initializes context.
     *
     * Every scenario gets its own context instance.
     * You can also pass arbitrary arguments to the
     * context constructor through behat.yml.
     */
    public function __construct()
    {
    }

    /**
     * @When I send a :arg1 request to :arg2 with body:
     */
    public function iSendARequestToWithBody($arg1, $arg2, PyStringNode $string)
    {
        
        throw new PendingException();
    }

    /**
     * @Then the response status code should be :arg1
     */
    public function theResponseStatusCodeShouldBe($arg1)
    {
        throw new PendingException();
    }

    /**
     * @Then the response should be in JSON
     */
    public function theResponseShouldBeInJson()
    {
        throw new PendingException();
    }

    /**
     * @Then the header :arg1 should be equal to :arg2
     */
    public function theHeaderShouldBeEqualTo($arg1, $arg2)
    {
        throw new PendingException();
    }

}
