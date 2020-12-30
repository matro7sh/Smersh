<?php

namespace App\DataFixtures;


use App\Entity\Host;
use App\Entity\Impact;
use App\Entity\MissionType;
use App\Entity\Translation\VulnTranslation;
use App\Entity\User;
use App\Entity\Vuln;
use App\Entity\VulnType;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use App\Entity\Mission;

class MissionFixtures extends Fixture
{
    public function load(ObjectManager $manager)
    {

        $user = new User();
        $user->setUsername("jenaye");
        $user->setPassword('jenaye');
        $user->setRoles(["ROLE_USER", "ROLE_ADMIN"]);
        $user->setEnabled(true);
        $manager->persist($user);


        $typeExterne = new MissionType();
        $typeExterne->setName("interne");
        $manager->persist($typeExterne);

        $typeInterne = new MissionType();
        $typeInterne->setName("externe");
        $manager->persist($typeInterne);


        $mission = new Mission();
        $mission->setNessus(0);
        $mission->setName("FAKE-MISSION-EXTERNE");
        $mission->setstartDate(\DateTime::createFromFormat('Y-m-d', "2020-11-08"));
        $mission->setEndDate(\DateTime::createFromFormat('Y-m-d', "2020-11-13"));
        $mission->setNmap(1);
        $mission->setCredentials("admin:MySuperPassword");
        $mission->addUser($user);
        $mission->setPathToCodi("http://localhost:3000/YOLO");
        $mission->setNessusFiler(0);
        $mission->setNmapFiler(0);
        $mission->setMissionType($typeExterne);


        $mission2 = new Mission();
        $mission2->setNessus(0);
        $mission2->setName("FAKE-MISSION-INTERNE");
        $mission2->setstartDate(\DateTime::createFromFormat('Y-m-d', "2020-11-08"));
        $mission2->setEndDate(\DateTime::createFromFormat('Y-m-d', "2020-11-13"));
        $mission2->setNmap(0);
        $mission2->addUser($user);
        $mission2->setPathToCodi(null);
        $mission2->setCredentials(null);
        $mission2->setNessusFiler(0);
        $mission2->setNmapFiler(0);
        $mission2->setMissionType($typeInterne);

        $manager->persist($mission);
        $manager->persist($mission2);

        /* Create VulnType and persist */
        $type = new VulnType();
        $type->setName("externe");
        $type2 = new VulnType();
        $type2->setName("interne");
        $manager->persist($type2);
        $manager->persist($type);


        /* Create Impact and persist */

        $impact = new Impact();
        $impact->setName("Low");
        $manager->persist($impact);


        $impact2 = new Impact();
        $impact2->setName("Medium");
        $manager->persist($impact2);

        $impact3 = new Impact();
        $impact3->setName("High");
        $manager->persist($impact3);

        /* Create Vulns and persist */

        $sqli = new Vuln();

        $sqliFR = new VulnTranslation();
        $sqliEN = new VulnTranslation();
        $sqliFR
            ->setDescription('Injection sql')
            ->setName('sqli');
        $sqliFR->setLocale('fr');
        $sqliFR->setRemediation("YOLO, you can also use of Stored Procedures and escaping All User Supplied Input");
        $sqliEN
            ->setDescription('Sql injection')
            ->setName('sqli');
        $sqliEN->setLocale('en');
        $sqliEN->setRemediation("Use of Prepared Statements (with Parameterized Queries, you can also use of Stored Procedures and escaping All User Supplied Input");
        $manager->persist($sqliFR);
        $manager->persist($sqliEN);
        $sqli->setCurrentLocale('en');
        $sqli->addTranslation($sqliFR);
        $sqli->addTranslation($sqliEN);
        $sqli->setVulnType($type);
        $sqli->setImpact($impact3);
        $manager->persist($sqli);

        $xss = new Vuln();

        $xssFR = new VulnTranslation();
        $xssEN = new VulnTranslation();
        $xssFR
            ->setDescription('exemple : execute /js')
            ->setName('XSS')
            ->setLocale('fr');
        $xssEN
            ->setDescription('example : execute /js')
            ->setName('XSS')
            ->setRemediation('HTML Encode Before Inserting Untrusted Data into HTML Element Content and add some headers')
            ->setLocale('en');
        $xss->addTranslation($xssFR);
        $xss->addTranslation($xssEN);
        $xss->setVulnType($type);
        $xss->setImpact($impact2);
        $manager->persist($xss);


        $host2 = new Host();
        $host2->setName("https://cadevraitlefaire.fr");
        $host2->setMission($mission2);
        $host2->setChecked(1);
        $manager->persist($host2);

        $host = new Host();
        $host->setName("https://jenaye.fr");
        $host->setTechnology("ReactJS");
        $host->addVuln($sqli);
        $host->setMission($mission);
        $host->setChecked(1);
        $manager->persist($host);

        $host3 = new Host();
        $host3->setName("https://github.com/Darkweak/Souin");
        $host3->addVuln($xss);
        $host3->setMission($mission);
        $host3->setChecked(0);
        $manager->persist($host3);


        $manager->flush();


    }
}
