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
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ApiResource(
 *      attributes={
 *          "normalization_context"={
 *              "groups"={"Vulns"}
 *          },
 *          "denormalization_context"={
 *              "groups"={"Vulns", "translations"}
 *          }
 *      },
 *      collectionOperations={
 *          "get"={"security"="is_granted('ROLE_VULN_GET_LIST')"},
 *          "post"={"security"="is_granted('ROLE_VULN_POST')"}
 *      },
 *      itemOperations={
 *          "delete"={"security"="is_granted('ROLE_VULN_DELETE')"},
 *          "get"={"security"="is_granted('ROLE_VULN_GET_ITEM')"},
 *          "patch"={"security"="is_granted('ROLE_VULN_PATCH')"},
 *          "put"={"security"="is_granted('ROLE_VULN_PUT')"}
 *      },
 *
 * )
 * @ORM\Entity(repositoryClass=VulnRepository::class)
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
     * @Groups({"Vulns", "HostVuln:output"})
     */
    private $id;

    /**
     * @ORM\ManyToOne(targetEntity=VulnType::class, inversedBy="vulns")
     * @Groups({"Vulns"})
     */
    private $vulnType;

    /**
     * @ORM\ManyToOne(targetEntity=Impact::class, inversedBy="vulns")
     * @Groups({"Vulns"})
     */
    private $impact;

    /**
     * @Groups({"Vulns", "translations", "HostVuln:output"})
     * @ORM\OneToMany(targetEntity=VulnTranslation::class, mappedBy="translatable", cascade={"persist", "remove"}, orphanRemoval=true)
     */
    protected $translations;

    /**
     * @ORM\OneToMany(targetEntity=HostVuln::class, mappedBy="vuln", orphanRemoval=true)
     * @Groups({"Vulns"})
     */
    private $hostVulns;

    public function __construct()
    {
        $this->currentLocale = 'en';
        $this->translations = new ArrayCollection();
        parent::__construct();
        $this->hostVulns = new ArrayCollection();
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

    /**
     * @return Collection|HostVuln[]
     */
    public function getHostVulns(): Collection
    {
        return $this->hostVulns;
    }

    public function addHostVuln(HostVuln $hostVuln): self
    {
        if (!$this->hostVulns->contains($hostVuln)) {
            $this->hostVulns[] = $hostVuln;
            $hostVuln->setVuln($this);
        }

        return $this;
    }

    public function removeHostVuln(HostVuln $hostVuln): self
    {
        if ($this->hostVulns->removeElement($hostVuln)) {
            // set the owning side to null (unless already changed)
            if ($hostVuln->getVuln() === $this) {
                $hostVuln->setVuln(null);
            }
        }

        return $this;
    }
}
