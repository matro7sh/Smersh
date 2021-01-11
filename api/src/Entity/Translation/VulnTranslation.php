<?php

namespace App\Entity\Translation;

use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Annotation\ApiResource;
use App\Entity\Vuln;
use App\Traits\DescriptionTrait;
use App\Traits\NameTrait;
use App\Traits\RemediationTrait;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ApiResource()
 * @ApiFilter(SearchFilter::class, properties={"locale": "ipartial"})
 * @ORM\Table(name="translations_vuln")
 * @ORM\Entity
 */
class VulnTranslation extends AbstractTranslation
{

    /**
     * @Groups("Vulns")
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
