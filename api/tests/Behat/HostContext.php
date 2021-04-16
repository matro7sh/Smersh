<?php

declare(strict_types=1);

namespace App\Tests\Behat;

use Behat\Gherkin\Node\PyStringNode;
use Behat\Mink\Exception\ExpectationException;

class HostContext extends APIContext
{
    protected $resource = 'hosts';

     /**
     * @When I try to create an host with:
     */
    public function iTryToCreateAnImpactWith(PyStringNode $data)
    {
        $this->iCreateAResource($data->getRaw());
    }

    /**
     * @When I try to update an host on id::arg1 with:
     */
    public function iTryToUpdateAnImpactWith(PyStringNode $data, $id)
    {
        $this->iUpdateAResource($data->getRaw(), $id);
    }

    /**
     *  @When I try to delete an host with id: :arg1
     */
    public function iTryToDeleteAnImpactWithId($id)
    {
        $this->iDeleteAResource($id);
    }

    /**
     * @Then the response should contain :arg1
     */
    public function theResponseShouldContain($arg1)
    {
        $this->assertSession()->responseContains($arg1);
    }
}
