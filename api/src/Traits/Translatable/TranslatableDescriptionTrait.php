<?php

namespace App\Traits\Translatable;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

trait TranslatableDescriptionTrait
{
    /**
     * @Groups("Vulns")
     */
    private $description;

    public function getDescription(): ?string
    {
        return $this->getTranslation()->getDescription();
    }

    public function setDescription(string $description): self
    {
        $this->getTranslation()->setDescription($description);
        return $this;
    }
}
