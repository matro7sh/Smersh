<?php

namespace App\DataFixtures;

use App\Entity\Client;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class ClientFixtures extends Fixture
{
    public function load(ObjectManager $manager)
    {
        $client = new Client();
        $client->setName("boulanjay");
        $client->setFirstName("Jean charles");
        $client->setLastName("faitduski");
        $client->setMail("yolo@localhost.com");
        $client->setPhone("06 XX XX XX XX");
        $manager->persist($client);
        $this->setReference('CLIENT_1', $client);

        $client = new Client();
        $client->setName("intermachay");
        $client->setFirstName("Eugène");
        $client->setLastName("alamontagne");
        $client->setMail("yelaaa@localhost.com");
        $client->setPhone("06 XX XX XX XX");
        $manager->persist($client);
        $this->setReference('CLIENT_2', $client);

        $manager->flush();
    }
}
