<?php

declare(strict_types=1);

namespace App\Tests\Behat;

use Behat\Gherkin\Node\PyStringNode;
use Behat\Mink\Exception\ExpectationException;

class HostContext extends APIContext
{
    protected $resource = 'hosts';

     /**
     * @When I try to create a host with:
     */
    public function iTryToCreateAnHostWith(PyStringNode $data)
    {
        $this->iCreateAResource($data->getRaw());
    }

    /**
     * @When I try to update a host on id::arg1 with:
     */
    public function iTryToUpdateAnHostWith(PyStringNode $data, $id)
    {
        $this->iUpdateAResource($data->getRaw(), $id);
    }

    /**
     *  @When I try to delete a host with id: :arg1
     */
    public function iTryToDeleteAnHostWithId($id)
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
