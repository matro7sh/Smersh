<?php

namespace App\DataFixtures;

use App\Entity\Translation\VulnTranslation;
use App\Entity\Vuln;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Persistence\ObjectManager;

class VulnFixtures extends Fixture implements DependentFixtureInterface
{
    public function load(ObjectManager $manager)
    {
        $impacts = $this->getImpacts();
        $types = $this->getTypes();

        $sqli = new Vuln();

        $sqliFR = new VulnTranslation();
        $sqliEN = new VulnTranslation();
        $sqliFR
            ->setDescription('Injection sql')
            ->setName('sqli');
        $sqliFR->setLocale('fr');
        $sqliFR->setRemediation("fait des requetes parametrer pelo");
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
        $sqli->setVulnType($types->get('interne'));
        $sqli->setImpact($impacts->get('high'));
        $manager->persist($sqli);
        $this->setReference('VULN_SQLI', $sqli);

        $xss = new Vuln();
        $xssFR = new VulnTranslation();
        $xssEN = new VulnTranslation();
        $xssFR
            ->setDescription('exemple : execute /js')
            ->setName('XSS')
            ->setRemediation(" tu devrais mettre des headers et verifier les champs")
            ->setLocale('fr');
        $xssEN
            ->setDescription('example : execute /js')
            ->setName('XSS')
            ->setRemediation('HTML Encode Before Inserting Untrusted Data into HTML Element Content and add some headers')
            ->setLocale('en');
        $xss->addTranslation($xssFR);
        $xss->addTranslation($xssEN);
        $xss->setVulnType($types->get('externe'));
        $xss->setImpact($impacts->get('medium'));
        $manager->persist($xss);
        $this->setReference('VULN_XSS', $xss);

        $manager->flush();
    }

    public function getDependencies()
    {
        return [
            VulnTypeFixtures::class,
            ImpactFixtures::class,
        ];
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

    private function getTypes(): Collection
    {
        return new ArrayCollection([
           'interne' => $this->getReference('VULN_INTERNE'),
           'externe' => $this->getReference('VULN_EXTERNE'),
        ]);
    }
}
