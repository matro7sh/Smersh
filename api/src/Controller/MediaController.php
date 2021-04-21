<?php

namespace App\Controller;

use App\Entity\MediaObject;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Exception\AccessDeniedException;
use Symfony\Component\Security\Core\Security;
use Vich\UploaderBundle\Form\Type\VichImageType;
use Vich\UploaderBundle\Handler\DownloadHandler;

/**
 * @Route(path="/api/media/{name}", name="media_server")
 */
final class MediaController extends AbstractController
{
    private $downloadHandler;
    private $manager;

    public function __construct(DownloadHandler $downloadHandler, EntityManagerInterface $manager)
    {
        $this->downloadHandler = $downloadHandler;
        $this->manager = $manager;
    }

    public function __invoke(string $name)
    {
        $media = $this->manager->getRepository(MediaObject::class)->findOneByFilePath($name);

        return $this->downloadHandler->downloadObject($media, 'file', MediaObject::class, null, false);
    }
}
