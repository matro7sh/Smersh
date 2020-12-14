<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiProperty;
use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\VulnRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ApiResource(attributes={"normalization_context"={"groups"={"Vulns"}}})
 * @ORM\Entity(repositoryClass=VulnRepository::class)
 * @UniqueEntity(
 *     fields={"name"},
 *     message="This name is already in use"
 * )
 */
class Vuln
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"Vulns"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255, unique=true)
     * @Groups({"Vulns", "Host:output", "MissionSingleOutput"})
     */
    private $name;

    /**
     * @ORM\ManyToOne(targetEntity=VulnType::class, inversedBy="vulns")
     * @Groups({"Vulns"})
     */
    private $vulnType;

    /**
     * @ORM\Column(type="text", nullable=true)
     * @Groups({"Vulns"})
     */
    private $description;

    /**
     * @ORM\ManyToMany(targetEntity=Mission::class, mappedBy="vulns")
     */
    private $missions;

    /**
     * @ORM\Column(type="text", nullable=true)
     * @Groups({"Vulns"})
     */
    private $remediation;

    /**
     * @ORM\ManyToMany(targetEntity=Host::class, mappedBy="vulns")
     * @Groups({"Vulns"})
     */
    private $hosts;

    /**
     * @ORM\ManyToOne(targetEntity=Impact::class, inversedBy="vunls")
     * @Groups({"MissionSingleOutput"})
     */
    private $impact;


    public function __construct()
    {
        $this->missions = new ArrayCollection();
        $this->hosts = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getVulnType(): ?VulnType
    {
        return $this->vulnType;
    }

    public function setVulnType(?VulnType $vulnType): self
    {
        $this->vulnType = $vulnType;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): self
    {
        $this->description = $description;

        return $this;
    }

    /**
     * @return Collection|Mission[]
     */
    public function getMissions(): Collection
    {
        return $this->missions;
    }

    public function addMission(Mission $mission): self
    {
        if (!$this->missions->contains($mission)) {
            $this->missions[] = $mission;
            $mission->addVuln($this);
        }

        return $this;
    }

    public function removeMission(Mission $mission): self
    {
        if ($this->missions->removeElement($mission)) {
            $mission->removeVuln($this);
        }

        return $this;
    }

    public function getRemediation(): ?string
    {
        return $this->remediation;
    }

    public function setRemediation(?string $remediation): self
    {
        $this->remediation = $remediation;

        return $this;
    }

    /**
     * @return Collection|Host[]
     */
    public function getHosts(): Collection
    {
        return $this->hosts;
    }

    public function addHost(Host $host): self
    {
        if (!$this->hosts->contains($host)) {
            $this->hosts[] = $host;
            $host->addVuln($this);
        }

        return $this;
    }

    public function removeHost(Host $host): self
    {
        if ($this->hosts->removeElement($host)) {
            $host->removeVuln($this);
        }

        return $this;
    }

    public function getImpact(): ?Impact
    {
        return $this->impact;
    }

    public function setImpact(?Impact $impact): self
    {
        $this->impact = $impact;

        return $this;
    }
}
