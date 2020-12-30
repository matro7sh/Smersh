<?php

namespace App\Traits\Translatable;

use Symfony\Component\Validator\Constraints as Assert;

trait TranslatableNameTrait
{
    /**
     * @Assert\NotBlank
     */
    private $name;

    public function getName(): string
    {
        return $this->getTranslation()->getName();
    }

    public function setName(string $name): self
    {
        $this->getTranslation()->setName($name);
        return $this;
    }
}
