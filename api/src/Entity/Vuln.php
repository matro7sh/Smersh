<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Entity\Translation\VulnTranslation;
use App\Repository\VulnRepository;
use App\Traits\Translatable\TranslatableDescriptionTrait;
use App\Traits\Translatable\TranslatableNameTrait;
use App\Traits\Translatable\TranslatableRemediationTrait;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Locastic\ApiPlatformTranslationBundle\Model\AbstractTranslatable;
use Locastic\ApiPlatformTranslationBundle\Model\TranslatableTrait;
use Locastic\ApiPlatformTranslationBundle\Model\TranslationInterface;
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
class Vuln extends AbstractTranslatable
{
    use TranslatableDescriptionTrait;
    use TranslatableNameTrait;
    use TranslatableRemediationTrait;
    use TranslatableTrait;

    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"Vulns"})
     */
    private $id;

    /**
     * @ORM\ManyToOne(targetEntity=VulnType::class, inversedBy="vulns")
     * @Groups({"Vulns"})
     */
    private $vulnType;

    /**
     * @ORM\ManyToMany(targetEntity=Mission::class, mappedBy="vulns")
     */
    private $missions;

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

    /**
     * @Groups({"article_list", "article_item", "translations"})
     * @ORM\OneToMany(targetEntity=VulnTranslation::class, mappedBy="translatable", cascade={"persist", "remove"}, orphanRemoval=true)
     */
    protected $translations;

    public function __construct()
    {
        $this->translations = new ArrayCollection();
        $this->missions = new ArrayCollection();
        $this->hosts = new ArrayCollection();
        parent::__construct();
    }

    public function getId(): ?int
    {
        return $this->id;
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

    protected function createTranslation(): TranslationInterface
    {
        return new VulnTranslation();
    }
}
