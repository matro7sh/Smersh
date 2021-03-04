<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\MissionRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Serializer\Annotation\Groups;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ApiResource(
 *      attributes={"normalization_context"={"groups"={"Mission"}}},
 *      collectionOperations={
 *         "get"={"security"="is_granted('ROLE_ADMIN')"},
 *         "post"={"security"="is_granted('IS_AUTHENTICATED_FULLY')"}
 *      },
 *      itemOperations={
 *         "get"={"normalization_context"={"groups"={"MissionSingleOutput"}}},
 *         "patch"={"security"="is_granted('ROLE_ADMIN') or user == object.author"},
 *         "put"={"security"="is_granted('ROLE_USER')"},
 *         "delete"={"security"="is_granted('ROLE_ADMIN')"}
 *      }
 *     )
 * @ORM\Entity(repositoryClass=MissionRepository::class)
 * @ApiFilter(SearchFilter::class, properties={"name": "ipartial"})
 */
class Mission
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"Mission", "MissionSingleOutput", "User"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"Mission", "MissionSingleOutput", "User"})
     */
    private $name;

    /**
     * @ORM\Column(type="datetime")
     * @Groups({"Mission", "MissionSingleOutput"})
     */
    private $startDate;


    /**
     * @Assert\Url(
     *    message = "The url '{{ value }}' is not a valid url",
     *    protocols = {"http", "https"}
     * )
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"Mission", "MissionSingleOutput"})
     */
    private $pathToCodi;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"Mission", "MissionSingleOutput"})
     */
    private $contact;

    /**
     * @ORM\Column(type="datetime")
     * @Groups({"Mission", "MissionSingleOutput"})
     */
    private $endDate;

    /**
     * @ORM\ManyToMany(targetEntity=User::class, mappedBy="missions")
     * @Groups({"Mission", "MissionSingleOutput"})
     */
    private $users;

    /**
     * @ORM\OneToMany(targetEntity=Host::class, mappedBy="mission", cascade={"remove"})
     * @Groups({"Mission", "MissionSingleOutput"})
     */
    private $hosts;

    /**
     * @ORM\Column(type="boolean", options={"default":0})
     * @Groups({"Mission", "MissionSingleOutput"})
     */
    private $nmap;

    /**
     * @ORM\Column(type="boolean", options={"default":0})
     * @Groups({"Mission", "MissionSingleOutput"})
     */
    private $nessus;

    /**
     * @ORM\Column(type="boolean", options={"default":0})
     * @Groups({"Mission", "MissionSingleOutput"})
     */
    private $nmapFiler;

    /**
     * @ORM\Column(type="boolean", options={"default":0})
     * @Groups({"Mission", "MissionSingleOutput"})
     */
    private $nessusFiler;

    /**
     * @ORM\ManyToOne(targetEntity=MissionType::class, inversedBy="missions")
     * @Groups({"Mission", "MissionSingleOutput"})
     */
    private $missionType;

    /**
     * @Assert\Url(
     *    message = "The url '{{ value }}' is not a valid url",
     *    protocols = {"http", "https"}
     * )
     * @ORM\Column(type="text", nullable=true)
     * @Groups({"Mission", "MissionSingleOutput"})
     */
    private $credentials;

    /**
     * @ORM\ManyToMany(targetEntity=Client::class, mappedBy="missions", cascade={"persist"})
     * @Groups({"Mission", "MissionSingleOutput"})
     */
    private $clients;

    /**
     * @ORM\OneToMany(targetEntity=Step::class, mappedBy="mission", orphanRemoval=true)
     * @Groups({"Mission", "MissionSingleOutput"})
     */
    private $steps;


    public function __construct()
    {
        $this->users = new ArrayCollection();
        $this->hosts = new ArrayCollection();
        $this->clients = new ArrayCollection();
        $this->steps = new ArrayCollection();
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
     * @return mixed
     */
    public function getContact()
    {
        return $this->contact;
    }

    /**
     * @param mixed $contact
     */
    public function setContact($contact): void
    {
        $this->contact = $contact;
    }

    public function getstartDate(): ?\DateTimeInterface
    {
        return $this->startDate;
    }

    public function setstartDate(\DateTimeInterface $date): self
    {
        $this->startDate = $date;

        return $this;
    }

    public function getEndDate(): ?\DateTimeInterface
    {
        return $this->endDate;
    }

    public function setEndDate(\DateTimeInterface $endDate): self
    {
        $this->endDate = $endDate;

        return $this;
    }

    /**
     * @return Collection|User[]
     */
    public function getUsers(): Collection
    {
        return $this->users;
    }

    public function addUser(User $user): self
    {
        if (!$this->users->contains($user)) {
            $this->users[] = $user;
            $user->addMission($this);
        }

        return $this;
    }

    public function removeUser(User $user): self
    {
        if ($this->users->removeElement($user)) {
            $user->removeMission($this);
        }

        return $this;
    }

    /**
     * @return Collection|Host[]
     */
    public function getHosts(): Collection
    {
        return $this->hosts;
    }

    public function addHost(Host $host): self
    {
        if (!$this->hosts->contains($host)) {
            $this->hosts[] = $host;
            $host->setMission($this);
        }

        return $this;
    }

    public function removeHost(Host $host): self
    {
        if ($this->hosts->removeElement($host)) {
            if ($host->getMission() === $this) {
                $host->setMission(null);
            }
        }

        return $this;
    }

    public function getNmap(): ?bool
    {
        return $this->nmap;
    }

    public function setNmap(bool $nmap): self
    {
        $this->nmap = $nmap;

        return $this;
    }

    public function getNessus(): ?bool
    {
        return $this->nessus;
    }

    public function setNessus(bool $nessus): self
    {
        $this->nessus = $nessus;

        return $this;
    }

    public function getNmapFiler(): ?bool
    {
        return $this->nmapFiler;
    }

    public function setNmapFiler(bool $nmapFiler): self
    {
        $this->nmapFiler = $nmapFiler;

        return $this;
    }

    public function getNessusFiler(): ?bool
    {
        return $this->nessusFiler;
    }

    public function setNessusFiler(bool $nessusFiler): self
    {
        $this->nessusFiler = $nessusFiler;

        return $this;
    }

    public function getMissionType(): ?MissionType
    {
        return $this->missionType;
    }

    public function setMissionType(?MissionType $missionType): self
    {
        $this->missionType = $missionType;

        return $this;
    }

    /**
     * @return mixed
     */
    public function getPathToCodi()
    {
        return $this->pathToCodi;
    }

    /**
     * @param mixed $pathToCodi
     */
    public function setPathToCodi($pathToCodi): void
    {
        $this->pathToCodi = $pathToCodi;
    }

    /**
     * @return mixed
     */
    public function getCredentials()
    {
        return $this->credentials;
    }

    /**
     * @param mixed $credentials
     */
    public function setCredentials($credentials): void
    {
        $this->credentials = $credentials;
    }

    /**
     * @return Collection|Client[]
     */
    public function getClients(): Collection
    {
        return $this->clients;
    }

    public function addClient(Client $client): self
    {
        if (!$this->clients->contains($client)) {
            $this->clients[] = $client;
            $client->addMission($this);
        }

        return $this;
    }

    public function removeClient(Client $client): self
    {
        if ($this->clients->removeElement($client)) {
            $client->removeMission($this);
        }

        return $this;
    }

    /**
     * @return Collection|Step[]
     */
    public function getSteps(): Collection
    {
        return $this->steps;
    }

    public function addStep(Step $step): self
    {
        if (!$this->steps->contains($step)) {
            $this->steps[] = $step;
            $step->setMission($this);
        }

        return $this;
    }

    public function removeStep(Step $step): self
    {
        if ($this->steps->removeElement($step)) {
            // set the owning side to null (unless already changed)
            if ($step->getMission() === $this) {
                $step->setMission(null);
            }
        }

        return $this;
    }
}
