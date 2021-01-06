<?php

namespace App\Traits\Translatable;

use Symfony\Component\Validator\Constraints as Assert;

trait TranslatableRemediationTrait
{
    /**
     * @Assert\NotBlank
     */
    private $remediation;

    public function getRemediation(): string
    {
        return $this->getTranslation()->getRemediation();
    }

    public function setRemediation(string $remediation): self
    {
        $this->getTranslation()->setRemediation($remediation);
        return $this;
    }
}
