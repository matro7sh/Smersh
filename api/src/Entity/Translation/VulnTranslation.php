<?php

namespace App\Entity\Translation;

use App\Entity\Vuln;
use App\Traits\DescriptionTrait;
use App\Traits\NameTrait;
use App\Traits\RemediationTrait;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Table(name="translations_vuln")
 * @ORM\Entity
 */
class VulnTranslation extends AbstractTranslation
{

    /**
     * @Groups("")
     */
    use NameTrait;
    use RemediationTrait;
    use DescriptionTrait;

    /**
     * @ORM\ManyToOne(targetEntity=Vuln::class, inversedBy="translations")
     * @ORM\JoinColumn(name="vuln_id", referencedColumnName="id", onDelete="CASCADE")
     */
    protected $translatable;
}
