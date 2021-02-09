<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\HostVulnRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ApiResource(
 *      attributes={
 *          "normalization_context"={
 *              "groups"={"HostVuln:output"}
 *          },
 *          "denormalization_context"={
 *              "groups"={"HostVuln:input"}
 *          }
 *      }
 * )
 * @ORM\Entity(repositoryClass=HostVulnRepository::class)
 */
class HostVuln
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"HostVuln:output", "MissionSingleOutput"})
     */
    private $id;

    /**
     * @ORM\ManyToOne(targetEntity=Host::class, inversedBy="hostVulns")
     * @Groups({"HostVuln:output", "HostVuln:input"})
     */
    private $host;

    /**
     * @ORM\ManyToOne(targetEntity=Vuln::class, inversedBy="hostVulns")
     * @Groups({"HostVuln:output", "MissionSingleOutput", "HostVuln:input"})
     */
    private $vuln;

    /**
     * @ORM\ManyToOne(targetEntity=Impact::class, inversedBy="vulns")
     * @Groups({"HostVuln:output", "MissionSingleOutput", "HostVuln:input" })
     */
    private $impact;

    /**
     * @ORM\Column(type="text")
     * @Groups({"HostVuln:output", "MissionSingleOutput", "HostVuln:input"})
     */
    private $currentState;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getHost(): ?Host
    {
        return $this->host;
    }

    public function setHost(?Host $host): self
    {
        $this->host = $host;

        return $this;
    }

    public function getVuln(): ?Vuln
    {
        return $this->vuln;
    }

    public function setVuln(?Vuln $vuln): self
    {
        $this->vuln = $vuln;

        return $this;
    }

    public function getCurrentState(): ?string
    {
        return $this->currentState;
    }

    public function setCurrentState(string $currentState): self
    {
        $this->currentState = $currentState;

        return $this;
    }

    public function getImpact(): ?Impact
    {
        return $this->impact;
    }

    public function setImpact(?Impact $impact): self
    {
        $this->impact = $impact;

        return $this;
    }
}
