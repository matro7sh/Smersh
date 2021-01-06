<?php

namespace App\Traits;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

trait NameTrait
{
    /**
     * @ORM\Column
     * @Groups({"Vulns", "MissionSingleOutput"})
     */
    private $name;

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }
}
