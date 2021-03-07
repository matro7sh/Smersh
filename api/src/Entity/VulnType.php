<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Traits\TypeTrait;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ApiResource(
 *      attributes={"normalization_context"={"groups"={"Type"}}}),
 *      collectionOperations={
 *          "get"={"security"="is_granted('ROLE_VULN_TYPE_GET_LIST')"},
 *          "post"={"security"="is_granted('ROLE_VULN_TYPE_POST')"}
 *      },
 *      itemOperations={
 *          "delete"={"security"="is_granted('ROLE_VULN_TYPE_DELETE')"},
 *          "get"={"security"="is_granted('ROLE_VULN_TYPE_GET_ITEM')"},
 *          "patch"={"security"="is_granted('ROLE_VULN_TYPE_PATCH')"},
 *          "put"={"security"="is_granted('ROLE_VULN_TYPE_PUT')"}
 *      },
 * )
 * @ORM\Entity
 */
class VulnType
{
    use TypeTrait;

    /**
     * @ORM\OneToMany(targetEntity=Vuln::class, mappedBy="vulnType")
     * @Groups({"Type", "MissionSingleOutput"})
     */
    private $vulns;

    public function __construct()
    {
        $this->vulns = new ArrayCollection();
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
            $vuln->setVulnType($this);
        }

        return $this;
    }

    public function removeVuln(Vuln $vuln): self
    {
        if ($this->vulns->removeElement($vuln)) {
            // set the owning side to null (unless already changed)
            if ($vuln->getVulnType() === $this) {
                $vuln->setVulnType(null);
            }
        }

        return $this;
    }
}
