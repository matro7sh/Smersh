<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\ImpactRepository;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ApiResource(
 *      attributes={
 *          "normalization_context"={
 *              "groups"={"Impact"}
 *          },
 *          "denormalization_context"={
 *              "groups"={"Impact:input"}
 *          }
 *      },
 *      collectionOperations={
 *          "get"={"security"="is_granted('ROLE_IMPACT_GET_LIST')"},
 *          "post"={"security"="is_granted('ROLE_IMPACT_POST')"}
 *      },
 *      itemOperations={
 *          "delete"={"security"="is_granted('ROLE_IMPACT_DELETE')"},
 *          "get"={"security"="is_granted('ROLE_IMPACT_GET_ITEM')"},
 *          "patch"={"security"="is_granted('ROLE_IMPACT_PATCH')"},
 *          "put"={"security"="is_granted('ROLE_IMPACT_PUT')"}
 *      },
 * )
 * @ORM\Entity(repositoryClass=ImpactRepository::class)
 * @UniqueEntity(
 *     fields={"name"},
 *     message="This name is already in use"
 * )
 * @ApiFilter(SearchFilter::class, properties={"name": "ipartial"})
 */
class Impact
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"Impact"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255, unique=true)
     * @Groups({"Vuln", "MissionSingleOutput", "Impact", "Impact:input"})
     */
    private $name;


    /**
     * @ORM\OneToMany(targetEntity=Vuln::class, mappedBy="impact")
     */
    private $vulns;

    public function __construct()
    {
        $this->vulns = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    /**
     * @return Collection|Vuln[]
     */
    public function getVulns(): Collection
    {
        return $this->vulns;
    }

    public function addVuln(Vuln $vuln): self
    {
        if (!$this->vulns->contains($vuln)) {
            $this->vulns[] = $vuln;
            $vuln->setImpact($this);
        }

        return $this;
    }

    public function removeVuln(Vuln $vuln): self
    {
        if ($this->vulns->removeElement($vuln)) {
            // set the owning side to null (unless already changed)
            if ($vuln->getImpact() === $this) {
                $vuln->setImpact(null);
            }
        }

        return $this;
    }

    /**
     * @return mixed
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * @param mixed $name
     */
    public function setName($name): void
    {
        $this->name = $name;
    }
}
