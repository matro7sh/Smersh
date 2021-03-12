<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\HostRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use App\Controller\UploadHostController;
use Doctrine\ORM\Mapping\JoinColumn;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;


/**
 * @ApiResource(
 *      normalizationContext={"groups"={"Host:output"}},
 *      security="is_granted('IS_AUTHENTICATED_FULLY')",
 *      collectionOperations={
 *           "get"={"security"="is_granted('ROLE_HOST_GET_LIST')"},
 *           "post"={"security"="is_granted('ROLE_HOST_POST')"}
 *      },
 *      itemOperations={
 *           "delete"={"security"="is_granted('ROLE_HOST_DELETE')"},
 *           "get"={"security"="is_granted('ROLE_HOST_GET_ITEM', object)"},
 *           "patch"={"security"="is_granted('ROLE_HOST_PATCH', object)"},
 *           "put"={"security"="is_granted('ROLE_HOST_PUT', object)"},
 *           "post_upload"={
 *               "security"="is_granted('ROLE_HOST_UPLOAD', object)",
 *               "method"="POST",
 *               "path"="/upload/host",
 *               "controller"=UploadHostController::class,
 *               "denormalization_context"={"groups"={"Host:upload:input"}}
 *           }
 *      }
 * )
 * @ORM\Entity(repositoryClass=HostRepository::class)
 * @ApiFilter(SearchFilter::class, properties={"name": "ipartial", "technology": "ipartial"})
 */
class Host
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"Host:output"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"MissionSingleOutput", "Host:output"})
     * @Assert\AtLeastOneOf({
     *     @Assert\Ip(message="not valid IP"),
     *     @Assert\Hostname(message="The server name must be a valid hostname.")
     * })
     */
    private $name;

    /**
     * @ORM\ManyToMany(targetEntity=Nmap::class, mappedBy="host")
     */
    private $nmaps;

    /**
     * @ORM\Column(type="boolean", options={"default":0}, nullable=false)
     * @Groups({"MissionSingleOutput"})
     */
    private $checked;


    /**
     * @ORM\Column(type="string", nullable=true)
     * @Groups({"MissionSingleOutput", "Host:output"})
     */
    private $technology;

    /**
     * @ORM\ManyToOne(targetEntity=Mission::class, inversedBy="hosts")
     * @JoinColumn(name="mission_id", referencedColumnName="id")
     * @Groups({"Host:output", "HostVuln:output"})
     */
    private $mission;

    /**
     * @ORM\OneToMany(targetEntity=HostVuln::class, mappedBy="host", orphanRemoval=true)
     * @Groups({"MissionSingleOutput", "Host:output"})
     */
    private $hostVulns;

    public function __construct()
    {
        $this->nmaps = new ArrayCollection();
        $this->checked = false;
        $this->hostVulns = new ArrayCollection();
    }

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

    /**
     * @return Collection|Nmap[]
     */
    public function getNmaps(): Collection
    {
        return $this->nmaps;
    }

    public function addNmap(Nmap $nmap): self
    {
        if (!$this->nmaps->contains($nmap)) {
            $this->nmaps[] = $nmap;
            $nmap->addHost($this);
        }

        return $this;
    }

    public function removeNmap(Nmap $nmap): self
    {
        if ($this->nmaps->removeElement($nmap)) {
            $nmap->removeHost($this);
        }

        return $this;
    }

    public function getMission(): ?Mission
    {
        return $this->mission;
    }

    public function setMission(?Mission $mission): self
    {
        $this->mission = $mission;

        return $this;
    }

    /**
     * @return mixed
     */
    public function getChecked()
    {
        return $this->checked;
    }

    /**
     * @param mixed $checked
     */
    public function setChecked($checked): void
    {
        $this->checked = $checked;
    }

    /**
     * @return mixed
     */
    public function getTechnology()
    {
        return $this->technology;
    }

    /**
     * @param mixed $technology
     */
    public function setTechnology($technology): void
    {
        $this->technology = $technology;
    }

    /**
     * @return Collection|HostVuln[]
     */
    public function getHostVulns(): Collection
    {
        return $this->hostVulns;
    }
}
