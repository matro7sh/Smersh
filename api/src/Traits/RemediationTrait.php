<?php

namespace App\Traits;

trait RemediationTrait
{
    /**
     * @ORM\Column(type="text", nullable=true)
     */
    private $remediation;

    public function getRemediation(): ?string
    {
        return $this->remediation;
    }

    public function setRemediation(?string $remediation): self
    {
        $this->remediation = $remediation;

        return $this;
    }
}
