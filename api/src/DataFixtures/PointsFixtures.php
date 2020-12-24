<?php

namespace App\DataFixtures;


use App\Entity\Host;
use App\Entity\Impact;
use App\Entity\MissionType;
use App\Entity\NegativePoint;
use App\Entity\PositivePoint;
use App\Entity\User;
use App\Entity\Vuln;
use App\Entity\VulnType;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use App\Entity\Mission;

class PointsFixtures extends Fixture
{
    public function load(ObjectManager $manager)
    {


        /* Create Impact and persist */

        $cloisonnement = new PositivePoint();
        $cloisonnement->setName("Cloisonnement");
        $cloisonnement->setDescription("the partitioning between accounts is managed on the server side. It is not possible to elevate privileges or access other users' data.");
        $manager->persist($cloisonnement);

        $sqli = new PositivePoint();
        $sqli->setName("SQLi");
        $sqli->setDescription("It was not possible to use SQL injection on the audited site, preventing recovery from the database.");
        $manager->persist($sqli);


        $xss = new PositivePoint();
        $xss->setName("XSS");
        $xss->setDescription("It was not possible to use SQL injection on the audited site, preventing recovery from the database.");
        $manager->persist($xss);

        $LowExposure = new PositivePoint();
        $LowExposure->setName("Low Exposure");
        $LowExposure->setDescription("The server exposes only the services necessary for its proper operation, thus reducing the perimeter of attack. This is good practice in line with the state of the art.");
        $manager->persist($LowExposure);


        $ssl = new NegativePoint();
        $ssl->setName("ssl");
        $ssl->setDescription("Some algorithms authorized by the SSL/TLS layer no longer provide encryption robust enough to withstand the computing power of today's machines. An attacker can exploit this flaw to carry out a Man-In-The-Middle attack or decrypt communications captured between the vulnerable service and its customers and thus affect the confidentiality and integrity of exchanges. However, the overall risk involved by this vulnerability remains low, because for such an attack to succeed, the attacker must be in a position to intercept the traffic of his victim. Moreover, breaking a TLS communication may require, in some cases, the use of considerable resources and very high computing power.");
        $manager->persist($ssl);

        $http = new NegativePoint();
        $http->setName("http");
        $http->setDescription("Finally, the communication between the client and the server is not encrypted. An attacker could exploit this flaw to carry out a Man-In-The-Middle attack and decrypt captured communications between the vulnerable service and its clients and thus affect the confidentiality and integrity of exchanges. However, the overall risk involved by this vulnerability remains low, because for such an attack to succeed, the attacker must be in a position to intercept the traffic of his victim. Moreover, breaking a TLS communication may require, in some cases, the use of considerable resources and very high computing power.");
        $manager->persist($http);


        $xss2 = new NegativePoint();
        $xss2->setName("XSS");
        $xss2->setDescription("The server does not filter user input properly. It is therefore possible to inject code into a field allowing an attacker to redirect the user to a site of his choice. For example, the attacker can send a hyperlink in a message that the user will have to click on.");
        $manager->persist($xss2);


        $manager->flush();


    }
}
