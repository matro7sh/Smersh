<?php

namespace App\Traits\Translatable;

use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

trait TranslatableNameTrait
{
    /**
     * @Groups("Vulns")
     */
    private $name;

    public function getName(): ?string
    {
        return $this->getTranslation()->getName();
    }

    public function setName(string $name): self
    {
        $this->getTranslation()->setName($name);
        return $this;
    }
}
