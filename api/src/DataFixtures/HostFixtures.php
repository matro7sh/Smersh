<?php

namespace App\DataFixtures;

use App\Entity\Host;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Persistence\ObjectManager;

class HostFixtures extends Fixture implements DependentFixtureInterface
{
    public function load(ObjectManager $manager)
    {
        $missions = $this->getMissions();

        $host = new Host();
        $host->setName("https://cadevraitlefaire.fr");
        $host->setMission($missions->get('mission2'));
        $host->setChecked(1);
        $manager->persist($host);
        $this->setReference('HOST_1', $host);

        $host = new Host();
        $host->setName("https://jenaye.fr");
        $host->setTechnology("ReactJS");
        $host->setMission($missions->get('mission1'));
        $host->setChecked(1);
        $manager->persist($host);
        $this->setReference('HOST_2', $host);

        $host = new Host();
        $host->setName("https://github.com/Darkweak/Souin");
        $host->setMission($missions->get('mission1'));
        $host->setChecked(0);
        $manager->persist($host);
        $this->setReference('HOST_3', $host);

        $manager->flush();
    }

    public function getDependencies()
    {
        return [
            MissionFixtures::class
        ];
    }

    private function getMissions(): Collection
    {
        return new ArrayCollection([
            'mission1', $this->getReference('MISSION_1'),
            'mission2', $this->getReference('MISSION_2'),
        ]);
    }
}
