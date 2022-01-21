<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\StateRepository;
use Doctrine\ORM\Mapping as ORM;
use App\Entity\Host;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass=StateRepository::class)
 */
#[ApiResource]
class State
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=50)
     */
    private $code;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"MissionSingleOutput", "HostDashboard"})
     */
    private $label;

    /**
     * @ORM\OneToMany(targetEntity=Host::class, mappedBy="state", orphanRemoval=true)
     */
    private $hosts;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getCode(): ?string
    {
        return $this->code;
    }

    public function setCode(string $code): self
    {
        $this->code = $code;

        return $this;
    }

    public function getLabel(): ?string
    {
        return $this->label;
    }

    public function setLabel(?string $label): self
    {
        $this->label = $label;

        return $this;
    }

    /**
     * @return mixed
     */
    public function getHosts()
    {
        return $this->hosts;
    }

    /**
     * @param mixed $hosts
     */
    public function setHosts($hosts): self
    {
        $this->hosts = $hosts;

        return $this;
    }
}
