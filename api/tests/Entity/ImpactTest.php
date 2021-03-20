<?php

namespace App\Tests\Entity;

use App\Entity\Impact;
use ApiPlatform\Core\Bridge\Symfony\Bundle\Test\ApiTestCase;

class ImpactTest extends ApiTestCase

{
    public function testGetCollection(): void
    {
        // The client implements Symfony HttpClient's `HttpClientInterface`, and the response `ResponseInterface`
        $response = static::createClient()->request('GET', '/api/impacts');

        $this->assertResponseIsSuccessful();
        // Asserts that the returned content type is JSON-LD (the default)
        $this->assertResponseHeaderSame('content-type', 'application/ld+json; charset=utf-8');

        // Asserts that the returned JSON is a superset of this one
        $this->assertJsonContains([
            '@context' => '/api/contexts/Impact',
            '@id' => '/api/impacts',
            '@type' => 'hydra:Collection',
            'hydra:totalItems' => 5,
            'hydra:view' => [
                '@id' => '//api/impacts?itemsPerPage=10',
                '@type' => 'hydra:PartialCollectionView'
            ],
        ]);

        // Asserts that the returned JSON is validated by the JSON Schema generated for this resource by API Platform
        // This generated JSON Schema is also used in the OpenAPI spec!
        $this->assertMatchesResourceCollectionJsonSchema(Impact::class);
    }


}
