<?php

namespace App\Traits;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

trait RemediationTrait
{
    /**
     * @ORM\Column(type="text", nullable=true)
     * @Groups({"Vulns", "MissionSingleOutput"})
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
