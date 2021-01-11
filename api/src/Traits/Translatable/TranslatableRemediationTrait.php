<?php

namespace App\Traits\Translatable;

use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

trait TranslatableRemediationTrait
{
    /**
     * @Groups("Vulns")
     */
    private $remediation;

    public function getRemediation(): ?string
    {
        return $this->getTranslation()->getRemediation();
    }

    public function setRemediation(string $remediation): self
    {
        $this->getTranslation()->setRemediation($remediation);
        return $this;
    }
}
