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

        $impact2 = new Impact();
        $impact->setName("Medium");
        $manager->persist($impact2);
        $this->setReference('IMPACT_MEDIUM', $impact2);

        $impact3 = new Impact();
        $impact3->setName("High");
        $manager->persist($impact3);
        $this->setReference('IMPACT_HIGH', $impact3);

        $impact4 = new Impact();
        $impact4->setName("Critical");
        $manager->persist($impact4);
        $this->setReference('IMPACT_CRITICAL', $impact4);

        $manager->flush();
    }
}
