<?php

namespace App\DataFixtures;


use App\Entity\Client;
use App\Entity\Host;
use App\Entity\HostVuln;
use App\Entity\Impact;
use App\Entity\MissionType;
use App\Entity\Step;
use App\Entity\Translation\VulnTranslation;
use App\Entity\User;
use App\Entity\Vuln;
use App\Entity\VulnType;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Persistence\ObjectManager;
use App\Entity\Mission;

class MissionFixtures extends Fixture implements DependentFixtureInterface
{
    public function load(ObjectManager $manager)
    {
        $user = $this->getReference('USER_GUEST');
        $missionTypes = $this->getMissionTypes();
        $clients = $this->getClients();

        $mission = new Mission();
        $mission->setNessus(0);
        $mission->addClient($clients->get('client1'));
        $mission->setName("FAKE-MISSION-EXTERNE");
        $mission->setstartDate(\DateTime::createFromFormat('Y-m-d', "2020-11-08"));
        $mission->setEndDate(\DateTime::createFromFormat('Y-m-d', "2020-11-13"));
        $mission->setNmap(1);
        $mission->setCredentials("admin:MySuperPassword");
        $mission->addUser($user);
        $mission->setPathToCodi("http://localhost:3000/YOLO");
        $mission->setNessusFiler(0);
        $mission->setNmapFiler(0);
        $mission->setMissionType($missionTypes->get('externe'));
        $manager->persist($mission);
        $this->setReference('MISSION_1', $mission);

        $mission = new Mission();
        $mission->setNessus(0);
        $mission->addClient($clients->get('client2'));
        $mission->setName("FAKE-MISSION-INTERNE");
        $mission->setstartDate(\DateTime::createFromFormat('Y-m-d', "2020-11-08"));
        $mission->setEndDate(\DateTime::createFromFormat('Y-m-d', "2020-11-13"));
        $mission->setNmap(0);
        $mission->addUser($user);
        $mission->setPathToCodi(null);
        $mission->setCredentials(null);
        $mission->setNessusFiler(0);
        $mission->setNmapFiler(0);
        $mission->setMissionType($missionTypes->get('interne'));
        $manager->persist($mission);
        $this->setReference('MISSION_2', $mission);
    }

    public function getDependencies()
    {
        return [
            UserFixtures::class,
            ClientFixtures::class,
            MissonTypeFixtures::class
        ];
    }

    private function getMissionTypes(): Collection
    {
        $missionTypes = new ArrayCollection([
            'interne' =>    $this->getReference('MISSION_TYPE_INTERNE'),
            'externe' => $this->getReference('MISSION_TYPE_EXTERNE'),
        ]);

        return $missionTypes;
    }

    private function getClients(): Collection
    {
        return new ArrayCollection([
            'client1' => $this->getReference('CLIENT_1'),
            'client2' => $this->getReference('CLIENT_2'),
        ]);
    }
}
