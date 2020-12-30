<?php

namespace App\DataFixtures;


use App\Entity\Host;
use App\Entity\Impact;
use App\Entity\MissionType;
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
        $sqli->setCurrentLocale("en");
        $sqli->setFallbackLocale("fr");
        $sqli->setName("sqli");
        $sqli->setDescription("Sql injection");
        $sqli->setVulnType($type);
        $sqli->setImpact($impact3);
        $sqli->setRemediation("Use of Prepared Statements (with Parameterized Queries, you can also use of Stored Procedures and escaping All User Supplied Input");
        $manager->persist($sqli);

        $xss = new Vuln();
        $xss->setCurrentLocale("en");
        $xss->setFallbackLocale("fr");
        $xss->setName("XSS");
        $xss->setDescription("exemple : execute /js");
        $xss->setVulnType($type);
        $xss->setImpact($impact2);
        $xss->setRemediation("HTML Encode Before Inserting Untrusted Data into HTML Element Content and add some headers");
        $manager->persist($xss);

        $ssl = new Vuln();
        $ssl->setCurrentLocale("en");
        $ssl->setFallbackLocale("fr");
        $ssl->setVulnType($type);
        $ssl->setDescription("Weak ciphers");
        $ssl->setName("ssl");
        $ssl->setImpact($impact);
        $ssl->setRemediation("use Elliptic Curve Diffie–Hellman (ECDH) with (ECDSA) or RSA like AES256-GCM");
        $manager->persist($ssl);

        $lfi = new Vuln();
        $lfi->setFallbackLocale("fr");
        $lfi->setCurrentLocale("en");
        $lfi->setName("lfi");
        $lfi->setImpact($impact3);
        $lfi->setDescription("This issue generally occurs when an application is trying to get some information from a particular server where the inputs for getting a particular file location are not treated as a trusted source");
        $lfi->setVulnType($type);
        $lfi->setRemediation("If you definitely need dynamic path concatenation, ensure you only accept required characters such as 'a-Z0-9' and do not allow '..' or '/' or '%00' (null byte) or any other similar unexpected characters.");
        $manager->persist($lfi);

        $lsa = new Vuln();
        $lsa->setFallbackLocale("fr");
        $lsa->setCurrentLocale("en");
        $lsa->setVulnType($type2);
        $lsa->setName("lsa");
        $lsa->setImpact($impact3);
        $lsa->setDescription("The reason an attacker is able to dump so many hashes from a compromised system is due to credential caching");
        $lsa->setRemediation("HKEY_LOCAL_MACHINE\Software\Microsoft\WindowsNT\Current Version\Winlogon\ as CachedLogonsCount. The value is typically set to 25 by default, but should be changed to either 0 or 1 (since caching zero logins can cause cluster nodes to fail)");
        $manager->persist($lsa);


        $lsa2 = new Vuln();
        $lsa2->setFallbackLocale("en");
        $lsa2->setCurrentLocale("fr");
        $lsa2->setVulnType($type2);
        $lsa2->setName("LSA - FRENCH");
        $lsa2->setImpact($impact3);
        $lsa2->setDescription("on peut dump des hashs et password en clair pelo");
        $lsa2->setRemediation("change ça HKEY_LOCAL_MACHINE\Software\Microsoft\WindowsNT\Current Version\Winlogon\ a 0 ou 1");
        $manager->persist($lsa2);



        $host2 = new Host();
        $host2->setName("https://cadevraitlefaire.fr");
        $host2->setMission($mission2);
        $host2->setChecked(1);
        $manager->persist($host2);

        $host = new Host();
        $host->setName("https://jenaye.fr");
        $host->setTechnology("ReactJS");
        $host->addVuln($sqli);
        $host->addVuln($ssl);
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
