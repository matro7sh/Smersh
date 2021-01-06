<?php

namespace App\Traits;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

trait DescriptionTrait
{
    /**
     * @ORM\Column(type="text", nullable=true)
     * @Groups({"Vulns", "MissionSingleOutput"})
     */
    private $description;

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): self
    {
        $this->description = $description;

        return $this;
    }
}
