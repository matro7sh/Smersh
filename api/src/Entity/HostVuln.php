<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiProperty;
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
 *      },
 *      collectionOperations={
 *           "get"={"security"="is_granted('ROLE_HOST_VULN_GET_LIST')"},
 *           "post"={"security"="is_granted('ROLE_HOST_VULN_POST')"}
 *      },
 *      itemOperations={
 *           "delete"={"security"="is_granted('ROLE_HOST_VULN_DELETE')"},
 *           "get"={"security"="is_granted('ROLE_HOST_VULN_GET_ITEM')"},
 *           "patch"={"security"="is_granted('ROLE_HOST_VULN_PATCH')"},
 *           "put"={"security"="is_granted('ROLE_HOST_VULN_PUT')"}
 *      },
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
     * @Groups({"HostVuln:output", "HostVuln:input", "Vulns"})
     */
    private $host;

    /**
     * @ORM\ManyToOne(targetEntity=Vuln::class, inversedBy="hostVulns")
     * @Groups({"HostVuln:output", "MissionSingleOutput", "HostVuln:input"})
     */
    private $vuln;

    /**
     * @ORM\ManyToOne(targetEntity=Impact::class, inversedBy="vulns")
     * @Groups({"HostVuln:output", "MissionSingleOutput", "HostVuln:input" , "Impact:input"})
     */
    private $impact;


    /**
     * @var MediaObject|null
     *
     * @ORM\ManyToOne(targetEntity=MediaObject::class,  cascade={"remove"})
     * @ORM\JoinColumn(nullable=true)
     * @ApiProperty(iri="http://schema.org/image")
     * @Groups({"HostVuln:output", "MissionSingleOutput", "HostVuln:input", "media_object_read"})
     */
    public $image;


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
