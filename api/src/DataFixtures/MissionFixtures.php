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
use Doctrine\Persistence\ObjectManager;
use App\Entity\Mission;

class MissionFixtures extends Fixture
{
    public function load(ObjectManager $manager)
    {

        $user = new User();
        $user->setUsername("jenaye");
        $user->setPassword('jenaye');
        $user->setPhone("06 XX YY ZZ AA");
        $user->setMail("jenaye@protonmail.com");
        $user->setCity("Lille aux pirates");
        $user->setTrigram("mho");
        $user->setRoles(["ROLE_USER", "ROLE_ADMIN", "ROLE_MANAGER"]);
        $user->setEnabled(true);
        $manager->persist($user);

        $typeExterne = new MissionType();
        $typeExterne->setName("Web Penetration Test");
        $manager->persist($typeExterne);

        $typeInterne = new MissionType();
        $typeInterne->setName("Infrastructure Penetration Test");
        $manager->persist($typeInterne);

        $client = new Client();
        $client->setName("boulanjay");
        $client->setFirstName("Jean charles");
        $client->setLastName("faitduski");
        $client->setMail("yolo@localhost.com");
        $client->setPhone("06 XX XX XX XX");
        $manager->persist($client);

        $client2 = new Client();
        $client2->setName("intermachay");
        $client2->setFirstName("Eugène");
        $client2->setLastName("alamontagne");
        $client2->setMail("yelaaa@localhost.com");
        $client2->setPhone("06 XX XX XX XX");
        $manager->persist($client2);

        $mission = new Mission();
        $mission->setNessus(0);
        $mission->addClient($client);
        $mission->setName("FAME MISSION WEB");
        $mission->setstartDate(\DateTime::createFromFormat('Y-m-d', "2020-11-08"));
        $mission->setEndDate(\DateTime::createFromFormat('Y-m-d', "2020-11-13"));
        $mission->setNmap(1);
        $mission->setCredentials("http://localhost:8888/");
        $mission->addUser($user);
        $mission->setPathToCodi("http://localhost:3000/PathToCodi");
        $mission->setNessusFiler(0);
        $mission->setNmapFiler(0);

        $mission2 = new Mission();
        $mission2->setNessus(0);
        $mission->addClient($client2);
        $mission2->setName("FAKE MISSION 2");
        $mission2->setstartDate(\DateTime::createFromFormat('Y-m-d', "2020-11-08"));
        $mission2->setEndDate(\DateTime::createFromFormat('Y-m-d', "2020-11-13"));
        $mission2->setNmap(0);
        $mission2->addUser($user);
        $mission2->setPathToCodi(null);
        $mission2->setCredentials(null);
        $mission2->setNessusFiler(0);
        $mission2->setNmapFiler(0);

        $manager->persist($mission);
        $manager->persist($mission2);


        $step = new Step();
        $step->setDescription("get meterpreter session");
        $step->setMission($mission);
        $step->setCreatedAt(new \DateTime());
        $step->setFindAt(new \DateTime());
        $manager->persist($step);

        /* Create VulnType and persist */
        $type = new VulnType();
        $type->setName("Web Penetration Test");
        $type2 = new VulnType();
        $type2->setName("Infrastructure Penetration Test");
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

        $impact4 = new Impact();
        $impact4->setName("Critical");
        $manager->persist($impact4);

        /* Create Vulns and persist */
        $sqli = new Vuln();

        $sqliFR = new VulnTranslation();
        $sqliEN = new VulnTranslation();
        $sqliFR
            ->setDescription('Injection SQL')
            ->setName('SQLi');
        $sqliFR->setLocale('fr');
        $sqliFR->setRemediation("Utilisation des instructions préparées (avec les requêtes paramétrées, vous pouvez également utiliser les procédures stockées et l'échappement de toutes les entrées fournies par l'utilisateur).");

        $sqliEN
            ->setDescription('SQL injection')
            ->setName('SQLi');
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

        $lfi = new Vuln();

        $lfiFR = new VulnTranslation();
        $lfiEN = new VulnTranslation();
        $lfiFR
            ->setDescription('Local file inclusion')
            ->setName('LFI');
        $lfiFR->setLocale('fr');
        $lfiFR->setRemediation("Utilisation des instructions préparées (avec les requêtes paramétrées, vous pouvez également utiliser les procédures stockées et l'échappement de toutes les entrées fournies par l'utilisateur).");

        $lfiEN
            ->setDescription('LFI attack may lead to information disclosure, remote code execution, or even Cross-site Scripting (XSS).')
            ->setName('LFI');
        $lfiEN->setLocale('en');
        $lfiEN->setRemediation("Make the server send download headers automatically instead of executing files in a specified directory and save your file paths in a secure database and give an ID for every single one, this way users only get to see their ID without viewing or altering the path");
        $manager->persist($lfiFR);
        $manager->persist($lfiEN);

        $lfi->setCurrentLocale('en');
        $lfi->addTranslation($lfiFR);
        $lfi->addTranslation($lfiEN);
        $lfi->setVulnType($type);
        $lfi->setImpact($impact3);
        $manager->persist($lfi);

        $xss = new Vuln();

        $xssFR = new VulnTranslation();
        $xssEN = new VulnTranslation();
        $xssFR
            ->setDescription("La XSS une faille qui permet d'injecter du code HTML et/ou Javascript dans des variables mal protégées.")
            ->setName('XSS')
            ->setRemediation("Pour se protéger contre les failles XSS, il y a deux solutions possibilités, supprimer tout contenu HTML de la saisie utilisateur ou échapper  les caractères formant les balises HTML")
            ->setLocale('fr');
        $xssEN
            ->setDescription('The XSS flaw, from its full name Cross-Site Scripting, is a flaw that allows HTML and/or Javascript code to be injected into poorly protected variables or databases.')
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
        $host->setMission($mission);
        $host->setChecked(1);
        $manager->persist($host);

        $host3 = new Host();
        $host3->setName("https://github.com/Darkweak/Souin");
        $host3->setMission($mission);
        $host3->setChecked(0);
        $manager->persist($host3);

        $sqliOnJenaye = new HostVuln();
        $sqliOnJenaye->setCurrentState("we just found Sqli on jenaye.fr");
        $sqliOnJenaye->setHost($host);
        $sqliOnJenaye->setImpact($impact);
        $sqliOnJenaye->setVuln($sqli);
        $manager->persist($sqliOnJenaye);

        $xssOnSouin = new HostVuln();
        $xssOnSouin->setCurrentState("we just found XSS on souin");
        $xssOnSouin->setHost($host3);
        $xssOnSouin->setImpact($impact2);
        $xssOnSouin->setVuln($xss);
        $manager->persist($xssOnSouin);

        $manager->flush();


    }
}
