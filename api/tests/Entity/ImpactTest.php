<?php

namespace App\Tests\Entity;

use App\Entity\Impact;
use ApiPlatform\Core\Bridge\Symfony\Bundle\Test\ApiTestCase;
use GuzzleHttp\Client;
use Laminas\Code\Reflection\Exception\RuntimeException;
use Symfony\Component\HttpFoundation\Response;

class ImpactTest extends ApiTestCase

{
    public function getJwtToken(): string
    {
        $client = self::createClient();
        $client->request('POST', 'http://localhost:8000/authentication_token', [
            'headers' => ['Content-Type' => 'application/json'],
            'json' => [
                'username' => 'jenaye',
                'password' => 'jenaye'
            ],
        ]);

        $response = $client->getResponse()->getContent();
        $content = json_decode($response, TRUE);

        if (!isset($content['token'])) {
            throw new RuntimeException('Token missing in response');
        }
        $this->assertResponseStatusCodeSame(200);
        return $content['token'];

    }

}
