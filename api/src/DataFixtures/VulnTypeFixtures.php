<?php

namespace App\DataFixtures;

use App\Entity\VulnType;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class VulnTypeFixtures extends Fixture
{
    public function load(ObjectManager $manager)
    {
        $type = new VulnType();
        $type->setName("externe");
        $manager->persist($type);
        $this->setReference('VULN_EXTERNE', $type);

        $type = new VulnType();
        $type->setName("interne");
        $manager->persist($type);
        $this->setReference('VULN_INTERNE', $type);

        $manager->flush();
    }
}
