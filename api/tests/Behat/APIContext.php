<?php

declare(strict_types=1);

namespace App\Tests\Behat;

use App\Entity\User;
use Behat\Behat\Context\Context;
use Behat\Gherkin\Node\TableNode;
use Behat\Mink\Session;
use Behat\MinkExtension\Context\RawMinkContext;
use PHPUnit\Framework\Assert;
use Symfony\Component\HttpKernel\KernelInterface;

/**
 * Defines application features from the specific context.
 */
class APIContext extends RawMinkContext implements Context
{
    use ClientTrait;
    private $manager;
    private $jwtManager;
    protected $token;
    protected $resource = '';
    protected $tokens;

    private const ADMIN = 'admin';
    private const MANAGER = 'manager';
    private const GUEST = 'guest';

    /**
     * Initializes context.
     *
     * Every scenario gets its own context instance.
     * You can also pass arbitrary arguments to the
     * context constructor through behat.yml.
     */
    public function __construct(KernelInterface $kernel)
    {
        $this->manager = $kernel->getContainer()->get('doctrine.orm.default_entity_manager');
        $this->jwtManager = $kernel->getContainer()->get('lexik_jwt_authentication.jwt_manager');

        $userRepository = $this->manager->getRepository(User::class);
        $admin = $userRepository->findOneByUsername(self::ADMIN);
        $manager = $userRepository->findOneByUsername(self::MANAGER);
        $guest = $userRepository->findOneByUsername(self::GUEST);

        $this->tokens = [
            self::ADMIN => $this->jwtManager->create($admin),
            self::MANAGER => $this->jwtManager->create($manager),
            self::GUEST => $this->jwtManager->create($guest),
        ];
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
        $this->token = $this->tokens[\strtolower($role)] ?? '';
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

    /**
     * @return array<string, string>
     */
    private function getHeaders(bool $isLd, $content): array
    {
        $headers = [];
        $type = \sprintf('application/%sjson', $isLd ? 'ld+' : '');
        $headers['HTTP_ACCEPT'] = $type;
        if ($content) {
            $headers['CONTENT_TYPE'] = $type;
        }

        if ($this->token != null) {
            $headers['HTTP_AUTHORIZATION'] = \sprintf('Bearer %s', $this->token);
        }

        return $headers;
    }

    public function iSendAJsonLdRequestTo(string $method, string $uri, $content = null, array $h = [], bool $insulate = true): void
    {
        $headers = \array_merge($this->getHeaders(true, $content), $h);

        $client = $this->getClient($this->getSession());
        $client->insulate($insulate);
        $client->request($method, $uri, [], [], $headers, (null !== $content) ? $content : null);
    }

    public function iCreateAResource($data){
        $this->iSendAJsonRequestTo('POST', \sprintf('/api/%s', $this->resource), $data);

    }

    public function iDeleteAResource($id){
        $this->iSendAJsonRequestTo('DELETE', \sprintf('/api/%s/%s', $this->resource, $id));

    }

    public function iSendAJsonRequestTo($method, $uri, $content = null, array $h = [], bool $insulate = true): void
    {
        $headers = \array_merge($this->getHeaders(false, $content), $h);

        $client = $this->getClient($this->getSession());
        $client->insulate($insulate);
        $client->request($method, $uri, [], [], $headers, (null !== $content) ? $content : null);
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
