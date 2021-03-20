<?php
declare(strict_types=1);
use Behat\Behat\Context\Context;

use Behat\Behat\Tester\Exception\PendingException;
use Behat\Gherkin\Node\PyStringNode;
use Symfony\Contracts\HttpClient\HttpClientInterface;

/**
 * Defines application features from the specific context.
 */
class FeatureContext implements Context
{

    private $_response;
    private $client;

    public function __construct(HttpClientInterface $client)
    {
        $this->client = $client;
    }


    /**
     * @When I send a :method request to :url with body:
     * @param $method
     * @param $url
     * @param PyStringNode $data
     * @throws \Symfony\Contracts\HttpClient\Exception\TransportExceptionInterface
     */
    public function iSendARequestToWithBody($method, $url, PyStringNode $data)
    {
        $response = $this->client->request(
            $method,
            $url
        );
        $content = $response->getContent();
        $statusCode = $response->getStatusCode();
        var_dump($content);
        return $content;
        exit;

    }



    /**
     * @Then the response status code should be :arg1
     */
    public function theResponseStatusCodeShouldBe($arg1)
    {
       // var_export('DEBUG!!!');


       /* $response = new Response();
        if ((string)$response->getStatusCode() !== $httpStatus) {
            throw new \Exception('HTTP code does not match '.$httpStatus.
                ' (actual: '.$response->getStatusCode().')');
        }
       */
    }

    /**
     * @Then the response should be in JSON
     */
    public function theResponseShouldBeInJson()
    {
        $data = json_decode($this->_response->getBody(true));
        if (empty($data)) { throw new Exception("Response was not JSON\n" . $this->_response);
        }
    }

    /**
     * @Then the header :arg1 should be equal to :arg2
     */
    public function theHeaderShouldBeEqualTo($arg1, $arg2)
    {
        throw new PendingException();
    }

    private function createClientWithCredentials()
    {
    }

}
