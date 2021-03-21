<?php

declare(strict_types=1);

namespace App\Tests\Behat;

use Behat\Behat\Context\Context;
use Behat\Gherkin\Node\PyStringNode;
use Behat\MinkExtension\Context\RawMinkContext;
use GuzzleHttp\Psr7\Response;
use Symfony\Component\HttpKernel\KernelInterface;

class ImpactContext extends APIContext
{
     /**
     * @When I try to create an impact with :data
     */
    public function iTrytoCreateAnImpactWith(PyStringNode $data)
    {
        $this->iCreateAResource('/api/impacts', $data);
    }
}
