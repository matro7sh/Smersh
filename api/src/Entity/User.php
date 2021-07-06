<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\NumericFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;
use App\Repository\UserRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Serializer\Annotation\Groups;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\BooleanFilter;

/**
 * @ApiResource(
 *      attributes={
 *          "normalization_context"={"groups"={"User"}},
 *          "denormalization_context"={"groups"={"User:input"}}
 *      },
 *      collectionOperations={
 *          "get"={"security"="is_granted('ROLE_USER_GET_LIST')"},
 *          "post"={
 *              "normalization_context"={"groups"={"User:input", "User:create"}},
 *              "security"="is_granted('ROLE_USER_POST')"
 *          }
 *      },
 *      itemOperations={
 *          "delete"={"security"="is_granted('ROLE_ADMIN')"},
 *          "get"={
 *              "normalization_context"={"groups"={"HostDashboard"}},
 *              "security"="is_granted('ROLE_USER_GET_ITEM', object)"
 *          },
 *          "patch"={"security"="is_granted('ROLE_USER_PATCH', object)"},
 *          "put"={"security"="is_granted('ROLE_USER_PUT', object)"}
 *      },
 * )
 * @ORM\Entity(repositoryClass=UserRepository::class)
 * @ORM\Table(name="`user`")
 * @ApiFilter(NumericFilter::class, properties={"id"})
 * @ApiFilter(SearchFilter::class, properties={"username": "ipartial"})
 *
 */
class User implements UserInterface
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups({"User"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=180, unique=true)
     * @Groups({"User", "User:input", "MissionSingleOutput", "HostDashboard"})
     */
    private $username;

    /**
     * @ORM\Column(type="json")
     * @Groups({"User", "User:input"})
     */
    private $roles = [];

    /**
     * @ORM\Column(name="enabled", type="boolean", options={"default":1})
     * @Groups({"User", "HostDashboard", "HostDashboard"})
     */
    protected $enabled = true;

    /**
     * @var string The hashed password
     * @ORM\Column(type="string")
     * @Groups({"User:input"})
     */
    private $password;

    /**
     * @ORM\ManyToMany(targetEntity=Mission::class, inversedBy="users")
     * @Groups({"User", "HostDashboard"})
     */
    private $missions;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"User", "User:input", "MissionSingleOutput", "HostDashboard"})
     */
    private $phone;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"User", "User:input", "MissionSingleOutput", "HostDashboard"})
     */
    private $trigram;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"User", "User:input", "MissionSingleOutput", "HostDashboard"})
     */
    private $mail;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"User", "User:input", "MissionSingleOutput", "HostDashboard"})
     */
    private $city;

    public function __construct()
    {
        $this->missions = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    /**
     * A visual identifier that represents this user.
     *
     * @see UserInterface
     */
    public function getUsername(): string
    {
        return (string) $this->username;
    }

    public function setUsername(string $username): self
    {
        $this->username = $username;

        return $this;
    }

    /**
     * @see UserInterface
     */
    public function getRoles(): array
    {
        $roles = $this->roles;
        // guarantee every user at least has ROLE_USER
        $roles[] = 'ROLE_USER';

        return array_unique($roles);
    }

    public function setRoles(array $roles): self
    {
        $this->roles = $roles;

        return $this;
    }

    /**
     * @see UserInterface
     */
    public function getPassword(): string
    {
        return (string) $this->password;
    }

    public function setPassword(string $password): self
    {
        $this->password = $password;

        return $this;
    }

    /**
     * @see UserInterface
     */
    public function getSalt()
    {
        // not needed when using the "bcrypt" algorithm in security.yaml
    }

    /**
     * @see UserInterface
     */
    public function eraseCredentials()
    {
        // If you store any temporary, sensitive data on the user, clear it here
        // $this->plainPassword = null;
    }

    /**
     * @return Collection|Mission[]
     */
    public function getMissions(): Collection
    {
        return $this->missions;
    }

    public function addMission(Mission $mission): self
    {
        if (!$this->missions->contains($mission)) {
            $this->missions[] = $mission;
        }

        return $this;
    }

    public function removeMission(Mission $mission): self
    {
        $this->missions->removeElement($mission);

        return $this;
    }

    public function getEnabled(): ?bool
    {
        return $this->enabled;
    }

    public function setEnabled(?bool $enabled): void
    {
        $this->enabled = $enabled;
    }

    public function getPhone(): ?string
    {
        return $this->phone;
    }

    public function setPhone(?string $phone): self
    {
        $this->phone = $phone;

        return $this;
    }

    public function getTrigram(): ?string
    {
        return $this->trigram;
    }

    public function setTrigram(?string $trigram): self
    {
        $this->trigram = $trigram;

        return $this;
    }

    public function getMail(): ?string
    {
        return $this->mail;
    }

    public function setMail(?string $mail): self
    {
        $this->mail = $mail;

        return $this;
    }

    public function getCity(): ?string
    {
        return $this->city;
    }

    public function setCity(?string $city): self
    {
        $this->city = $city;

        return $this;
    }
}
