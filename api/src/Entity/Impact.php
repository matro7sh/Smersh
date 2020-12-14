<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\ImpactRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ApiResource(attributes={"normalization_context"={"groups"={"Impact"}}})
 * @ORM\Entity(repositoryClass=ImpactRepository::class)
 * @UniqueEntity(
 *     fields={"name"},
 *     message="This name is already in use"
 * )
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
     * @Groups({"Vuln", "MissionSingleOutput", "Impact"})
     */
    private $name;


    /**
     * @ORM\OneToMany(targetEntity=Vuln::class, mappedBy="impact")
     */
    private $vunls;

    public function __construct()
    {
        $this->vunls = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    /**
     * @return Collection|Vuln[]
     */
    public function getVunls(): Collection
    {
        return $this->vunls;
    }

    public function addVunl(Vuln $vunl): self
    {
        if (!$this->vunls->contains($vunl)) {
            $this->vunls[] = $vunl;
            $vunl->setImpact($this);
        }

        return $this;
    }

    public function removeVunl(Vuln $vunl): self
    {
        if ($this->vunls->removeElement($vunl)) {
            // set the owning side to null (unless already changed)
            if ($vunl->getImpact() === $this) {
                $vunl->setImpact(null);
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
