<?php

declare(strict_types=1);

namespace App\Tests\Behat;

use Behat\Behat\Context\Context;
use Behat\Gherkin\Node\TableNode;
use Behat\Mink\Session;
use Behat\MinkExtension\Context\RawMinkContext;
use PHPUnit\Framework\Assert;
use Symfony\Component\HttpFoundation\Request;

/**
 * Defines application features from the specific context.
 */
class APIContext extends RawMinkContext implements Context
{
    use ClientTrait;

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

    private function getStatusCode(): int
    {
        /** @var Session $session */
        $session = $this->getSession();

        return $session->getStatusCode();
    }

    /**
     * @Given I am authenticated as :role
     */
    public function iAmAuthenticatedAs(string $role)
    {
        switch ($role) {
            case "admin": {

            }
            default: {

            }
        }
    }

    /**
     * @When I get the list for the resource :resource
     */
    public function iGetTheListForResource(string $resource)
    {
        $this->iSendAJsonLdRequestTo('GET', \sprintf('/api/%s', $resource));
    }

    /**
     * @When I get the item :iri from :resource
     */
    public function iGetSingleItemForResource(string $id, string $resource)
    {
        $this->iSendAJsonLdRequestTo('GET', \sprintf('/api/%s/%s', $resource, $id));
    }

    public function iSendAJsonLdRequestTo(string $method, string $uri, $content = null, array $headers = [], bool $insulate = true): void
    {
        $headers = [];
        $headers['HTTP_ACCEPT'] = 'application/ld+json';
        if ($content) {
            $headers['CONTENT_TYPE'] = 'application/ld+json';
        }

        $client = $this->getClient($this->getSession());
        $client->insulate($insulate);
        $client->request($method, $uri, [], [], $headers, (null !== $content) ? \json_encode($content) : null);
    }

    public function iCreateAResource(string $resource, $data){
        $this->iSendAJsonRequestTo('POST', $resource, $data);
    }

    public function iSendAJsonRequestTo($method, $uri, $content = null, array $headers = [], bool $insulate = true): void
    {
        $headers = $this->getHeaders($headers);
        $headers['HTTP_ACCEPT'] = 'application/json';
        if ($content) {
            $headers['CONTENT_TYPE'] = 'application/json';
        }

        $client = $this->getClient($this->getSession());
        $client->insulate($insulate);
        $client->request($method, $uri, [], [], $headers, (null !== $content) ? \json_encode($content) : null);
    }

    /**
     * @Then it should be created
     */
    public function itShouldBeCreated(): void
    {
        $this->iShouldGetTheStatusCode(201);
    }

    /**
     * @Then it should be updated
     */
    public function itShouldBeUpdated(): void
    {
        $this->iShouldGetTheStatusCode(200);
    }

    /**
     * @Then it should be deleted
     */
    public function itShouldBeDeleted(): void
    {
        $this->iShouldGetTheStatusCode(204);
    }

    /**
     * @Then I should get the error :error with the status code :code
     */
    public function iShouldGetTheErrorWithTheStatusCode(string $error, int $code): void
    {
        $this->iShouldGetTheStatusCode($code);
        $this->jsonContext->theJsonNodeShouldBeEqualToTheString('hydra:description', $error);
    }

    /**
     * @Then I should get the JSON error :error with the status code :code
     */
    public function iShouldGetTheJsonError(string $error, $code): void
    {
        $this->iShouldGetTheStatusCode($code);
        $this->jsonContext->theJsonNodeShouldBeEqualToTheString('detail', $error);
    }

    /**
     * @Then I should see error messages:
     */
    public function iShouldSeeErrorMessages(TableNode $expectedErrors): void
    {
        $this->theJsonLdResponseHasExpectedFormErrors($expectedErrors);
    }

    /**
     * @Then I should be unauthorized
     */
    public function iShouldBeUnauthorized(): void
    {
        $this->iShouldGetTheStatusCode(401);
    }

    /**
     * @Then I should be forbidden
     */
    public function iShouldBeForbidden(): void
    {
        $this->iShouldGetTheStatusCode(403);
    }

    /**
     * @Then I should have bad request
     */
    public function iShouldHaveBadRequest(): void
    {
        $this->iShouldGetTheStatusCode(400);
    }

    /**
     * @Then the request should be successful
     */
    public function theRequestShouldBeSuccessful(): void
    {
        $statusCode = $this->getStatusCode();

        Assert::assertGreaterThanOrEqual(200, $statusCode);
        Assert::assertLessThan(300, $statusCode);
    }

    /**
     * @Then the request should fail
     */
    public function theRequestShouldFail(): void
    {
        $statusCode = $this->getStatusCode();

        Assert::assertGreaterThanOrEqual(400, $statusCode);
        Assert::assertLessThan(500, $statusCode);
    }

    /**
     * @Then I should get the status code :code
     */
    public function iShouldGetTheStatusCode(int $code): void
    {
        Assert::assertEquals($code, $this->getStatusCode());
    }
}
