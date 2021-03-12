<?php

namespace App\DataFixtures;

use App\Entity\Step;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Persistence\ObjectManager;

class StepFixtures extends Fixture implements DependentFixtureInterface
{
    public function load(ObjectManager $manager)
    {
        $mission = $this->getReference('MISSION_1');

        $step = new Step();
        $step->setDescription("get meterpreter session");
        $step->setMission($mission);
        $step->setCreatedAt(new \DateTime());
        $step->setFindAt(new \DateTime());
        $manager->persist($step);

        $manager->flush();
    }

    public function getDependencies()
    {
        return [
            MissionFixtures::class
        ];
    }
}
