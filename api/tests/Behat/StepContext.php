<?php

declare(strict_types=1);

namespace App\Tests\Behat;

use Behat\Gherkin\Node\PyStringNode;
use Behat\Mink\Exception\ExpectationException;

class StepContext extends APIContext
{
    protected $resource = 'steps';

     /**
     * @When I try to create a step with:
     */
    public function iTryToCreateAnStepWith(PyStringNode $data)
    {
        $this->iCreateAResource($data->getRaw());
    }

    /**
     * @When I try to update a step on id::arg1 with:
     */
    public function iTryToUpdateAnStepWith(PyStringNode $data, $id)
    {
        $this->iUpdateAResource($data->getRaw(), $id);
    }

    /**
     *  @When I try to delete a step with id: :arg1
     */
    public function iTryToDeleteAnStepWithId($id)
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
