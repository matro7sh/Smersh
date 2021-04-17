<?php

declare(strict_types=1);

namespace App\Tests\Behat;

use Behat\Behat\Context\Context;
use GuzzleHttp\Psr7\Response;
use Symfony\Component\HttpKernel\KernelInterface;

class ClientContext implements Context
{
    private $client;

    public function __construct(KernelInterface $kernel)
    {
        $testContainer = $kernel->getContainer()->get('test.service_container');
        $this->client = $testContainer->get('test.client');
    }

    /**
     * @Given next client call will return a response with code :code
     */
    public function clientWillReturnAResponseWithCode(int $code): void
    {
        $this->client->mockHandler->append(new Response($code, []));
    }
}
