<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\NmapRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ApiResource(
 *      collectionOperations={
 *          "get"={"security"="is_granted('ROLE_NMAP_GET_LIST')"},
 *          "post"={"security"="is_granted('ROLE_NMAP_POST')"}
 *      },
 *      itemOperations={
 *          "delete"={"security"="is_granted('ROLE_NMAP_DELETE')"},
 *          "get"={"security"="is_granted('ROLE_NMAP_GET_ITEM')"},
 *          "patch"={"security"="is_granted('ROLE_NMAP_PATCH')"},
 *          "put"={"security"="is_granted('ROLE_NMAP_PUT')"}
 *      },
 * )
 * @ORM\Entity(repositoryClass=NmapRepository::class)
 */
class Nmap
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="datetime")
     */
    private $date;

    /**
     * @ORM\Column(type="boolean")
     */
    private $status;

    /**
     * @ORM\Column(type="text", nullable=true)
     */
    private $port;

    /**
     * @ORM\ManyToMany(targetEntity=Host::class, inversedBy="nmaps")
     */
    private $host;

    public function __construct()
    {
        $this->host = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getDate(): ?\DateTimeInterface
    {
        return $this->date;
    }

    public function setDate(\DateTimeInterface $date): self
    {
        $this->date = $date;

        return $this;
    }


    public function getStatus(): ?bool
    {
        return $this->status;
    }

    public function setStatus(bool $status): self
    {
        $this->status = $status;

        return $this;
    }

    public function getPort(): ?string
    {
        return $this->port;
    }

    public function setPort(?string $port): self
    {
        $this->port = $port;

        return $this;
    }

    /**
     * @return Collection|Host[]
     */
    public function getHost(): Collection
    {
        return $this->host;
    }

    public function addHost(Host $host): self
    {
        if (!$this->host->contains($host)) {
            $this->host[] = $host;
        }

        return $this;
    }

    public function removeHost(Host $host): self
    {
        $this->host->removeElement($host);

        return $this;
    }
}
