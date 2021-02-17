<?php

namespace App\DataFixtures;

use App\Entity\MissionType;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class MissonTypeFixtures extends Fixture
{
    public function load(ObjectManager $manager)
    {
        $typeInterne = new MissionType();
        $typeInterne->setName("interne");
        $manager->persist($typeInterne);
        $this->setReference('MISSION_TYPE_INTERNE', $typeInterne);

        $typeExterne = new MissionType();
        $typeExterne->setName("externe");
        $manager->persist($typeExterne);
        $this->setReference('MISSION_TYPE_EXTERNE', $typeExterne);

        $manager->flush();
    }
}
