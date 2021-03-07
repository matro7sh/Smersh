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
 *      attributes={"normalization_context"={"groups"={"Type"}}},
 *      collectionOperations={
 *          "get"={"security"="is_granted('ROLE_MISSION_TYPE_GET_LIST')"},
 *          "post"={"security"="is_granted('ROLE_MISSION_TYPE_POST')"}
 *      },
 *      itemOperations={
 *          "delete"={"security"="is_granted('ROLE_MISSION_TYPE_DELETE')"},
 *          "get"={"security"="is_granted('ROLE_MISSION_TYPE_GET_ITEM')"},
 *          "patch"={"security"="is_granted('ROLE_MISSION_TYPE_PATCH')"},
 *          "put"={"security"="is_granted('ROLE_MISSION_TYPE_PUT')"}
 *      },
 * )
 * @ORM\Entity
 */
class MissionType
{

    use TypeTrait;

    /**
     * @ORM\OneToMany(targetEntity=Mission::class, mappedBy="missionType")
     */
    private $missions;

    public function __construct()
    {
        $this->missions = new ArrayCollection();
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
            $mission->setMissionType($this);
        }

        return $this;
    }

    public function removeMission(Mission $mission): self
    {
        if ($this->missions->removeElement($mission)) {
            // set the owning side to null (unless already changed)
            if ($mission->getMissionType() === $this) {
                $mission->setMissionType(null);
            }
        }

        return $this;
    }
}
