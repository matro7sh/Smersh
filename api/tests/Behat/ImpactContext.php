<?php

declare(strict_types=1);

namespace App\Tests\Behat;

use Behat\Gherkin\Node\PyStringNode;

class ImpactContext extends APIContext
{
    protected $resource = 'impacts';

     /**
     * @When I try to create an impact with:
     */
    public function iTryToCreateAnImpactWith(PyStringNode $data)
    {
        $this->iCreateAResource($data->getRaw());
    }
}
