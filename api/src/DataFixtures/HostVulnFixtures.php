<?php

namespace App\DataFixtures;

use App\Entity\HostVuln;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Persistence\ObjectManager;

class HostVulnFixtures extends Fixture implements DependentFixtureInterface
{
    public function load(ObjectManager $manager)
    {
        $hosts = $this->getHosts();
        $impacts = $this->getImpacts();
        $vulns = $this->getVulns();

        $sqliOnJenaye = new HostVuln();
        $sqliOnJenaye->setCurrentState("we just found Sqli on jenaye.fr");
        $sqliOnJenaye->setHost($hosts->get('host1'));
        $sqliOnJenaye->setImpact($impacts->get('low'));
        $sqliOnJenaye->setVuln($vulns->get('sqli'));
        $manager->persist($sqliOnJenaye);

        $xssOnSouin = new HostVuln();
        $xssOnSouin->setCurrentState("we just found XSS on souin");
        $xssOnSouin->setHost($hosts->get('host3'));
        $xssOnSouin->setImpact($impacts->get('medium'));
        $xssOnSouin->setVuln($vulns->get('xss'));
        $manager->persist($xssOnSouin);

        $manager->flush();
    }

    public function getDependencies()
    {
        return [
            HostFixtures::class,
            ImpactFixtures::class,
            VulnFixtures::class
        ];
    }

    private function getHosts(): Collection
    {
        return new ArrayCollection([
            'host1' => $this->getReference('HOST_1'),
            'host2' => $this->getReference('HOST_2'),
            'host3' => $this->getReference('HOST_3'),
        ]);
    }

    private function getImpacts(): Collection
    {
        return new ArrayCollection([
            'low' => $this->getReference('IMPACT_LOW'),
            'medium' => $this->getReference('IMPACT_MEDIUM'),
            'high' => $this->getReference('IMPACT_HIGH'),
            'critical' => $this->getReference('IMPACT_CRITICAL')
        ]);
    }

    private function getVulns()
    {
        return new ArrayCollection([
            'sqli' => $this->getReference('VULN_SQLI'),
            'xss' => $this->getReference('VULN_XSS')
        ]);
    }
}
