<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\PositivePointRepository;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ApiResource(
 *      collectionOperations={
 *          "get"={"security"="is_granted('ROLE_POSITIVE_POINT_GET_LIST')"},
 *          "post"={"security"="is_granted('ROLE_POSITIVE_POINT_POST')"}
 *      },
 *      itemOperations={
 *          "delete"={"security"="is_granted('ROLE_POSITIVE_POINT_DELETE')"},
 *          "get"={"security"="is_granted('ROLE_POSITIVE_POINT_GET_ITEM')"},
 *          "patch"={"security"="is_granted('ROLE_POSITIVE_POINT_PATCH')"},
 *          "put"={"security"="is_granted('ROLE_POSITIVE_POINT_PUT')"}
 *      },
 * )
 * @ORM\Entity(repositoryClass=PositivePointRepository::class)
 */
class PositivePoint
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $name;

    /**
     * @ORM\Column(type="text")
     */
    private $description;

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

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(string $description): self
    {
        $this->description = $description;

        return $this;
    }
}
