<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\StepRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ApiResource(
 *      attributes={
 *          "normalization_context"={
 *              "groups"={"Step"}
 *          }
 *      },
 *      collectionOperations={
 *          "get"={"security"="is_granted('ROLE_STEP_GET_LIST')"},
 *          "post"={"security"="is_granted('ROLE_STEP_POST')"}
 *      },
 *      itemOperations={
 *          "delete"={"security"="is_granted('ROLE_STEP_DELETE')"},
 *          "get"={"security"="is_granted('ROLE_STEP_GET_ITEM')"},
 *          "patch"={"security"="is_granted('ROLE_STEP_PATCH')"},
 *          "put"={"security"="is_granted('ROLE_STEP_PUT')"}
 *      },
 *
 * )
 * @ORM\Entity(repositoryClass=StepRepository::class)
 */
class Step
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"Step", "MissionSingleOutput"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"Step", "MissionSingleOutput"})
     */
    private $description;


    /**
     * @ORM\ManyToOne(targetEntity=Mission::class, inversedBy="steps")
     * @ORM\JoinColumn(nullable=false)
     * @Groups({"Step"})
     */
    private $mission;

    /**
     * @ORM\Column(type="datetime")
     * @Groups({"Step", "MissionSingleOutput"})
     */
    private $findAt;

    /**
     * @ORM\Column(type="datetime")
     * @Groups({"Step", "MissionSingleOutput"})
     */
    private $createdAt;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(string $description): self
    {
        $this->description = $description;

        return $this;
    }

    public function getMission(): ?Mission
    {
        return $this->mission;
    }

    public function setMission(?Mission $mission): self
    {
        $this->mission = $mission;

        return $this;
    }

    public function getFindAt(): ?\DateTimeInterface
    {
        return $this->findAt;
    }

    public function setFindAt(\DateTimeInterface $findAt): self
    {
        $this->findAt = $findAt;

        return $this;
    }

    public function getCreatedAt(): ?\DateTimeInterface
    {
        return $this->createdAt;
    }

    public function setCreatedAt(\DateTimeInterface $createdAt): self
    {
        $this->createdAt = $createdAt;

        return $this;
    }
}
