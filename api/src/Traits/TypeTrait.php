<?php
namespace App\Traits;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

trait TypeTrait
{

    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"Type"})
     */
    protected $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"Type", "MissionSingleOutput"})
     */
    protected $name;

    public function __construct(){}

    public function getId(): ?int
    {
        return $this->id;
    }

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
