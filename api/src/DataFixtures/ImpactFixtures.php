<?php

namespace App\DataFixtures;

use App\Entity\Impact;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class ImpactFixtures extends Fixture
{
    public function load(ObjectManager $manager)
    {
        $impact = new Impact();
        $impact->setName("Low");
        $manager->persist($impact);
        $this->setReference('IMPACT_LOW', $impact);

        $impact = new Impact();
        $impact->setName("Medium");
        $manager->persist($impact);
        $this->setReference('IMPACT_MEDIUM', $impact);

        $impact = new Impact();
        $impact->setName("High");
        $manager->persist($impact);
        $this->setReference('IMPACT_HIGH', $impact);

        $impact = new Impact();
        $impact->setName("Critical");
        $manager->persist($impact);
        $this->setReference('IMPACT_CRITICAL', $impact);

        $manager->flush();
    }
}
