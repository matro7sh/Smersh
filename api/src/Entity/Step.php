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
 *      }
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
     * @ORM\Column(type="integer")
     * @Groups({"Step", "MissionSingleOutput"})
     */
    private $hour;

    /**
     * @ORM\Column(type="integer")
     * @Groups({"Step", "MissionSingleOutput"})
     */
    private $minute;

    /**
     * @ORM\Column(type="datetime")
     * @Groups({"Step", "MissionSingleOutput"})
     */
    private $stepdate;

    /**
     * @ORM\ManyToOne(targetEntity=Mission::class, inversedBy="steps")
     * @ORM\JoinColumn(nullable=false)
     * @Groups({"Step"})
     */
    private $missionId;

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

    public function getHour(): ?int
    {
        return $this->hour;
    }

    public function setHour(int $hour): self
    {
        $this->hour = $hour;

        return $this;
    }

    public function getMinute(): ?int
    {
        return $this->minute;
    }

    public function setMinute(int $minute): self
    {
        $this->minute = $minute;

        return $this;
    }

    public function getStepdate(): ?\DateTimeInterface
    {
        return $this->stepdate;
    }

    public function setStepdate(\DateTimeInterface $stepdate): self
    {
        $this->stepdate = $stepdate;

        return $this;
    }

    public function getMissionId(): ?Mission
    {
        return $this->missionId;
    }

    public function setMissionId(?Mission $missionId): self
    {
        $this->missionId = $missionId;

        return $this;
    }
}
