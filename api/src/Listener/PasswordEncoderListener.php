<?php


namespace App\Listener;


use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\Event\PreUpdateEventArgs;
use Doctrine\ORM\Events;
use Symfony\Component\HttpKernel\KernelInterface;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class PasswordEncoderListener
{
    const PASS_FIELD = 'password';

    /** @var EntityManagerInterface $entityManager */
    private $entityManager;

    /** @var KernelInterface $kernel */
    private $kernel;

    /** @var UserPasswordEncoderInterface $userPasswordEncoder */
    private $userPasswordEncoder;

    public function __construct(KernelInterface $kernel, EntityManagerInterface $manager, UserPasswordEncoderInterface $userPasswordEncoder)
    {
        $this->kernel = $kernel;
        $this->entityManager = $manager;
        $this->userPasswordEncoder = $userPasswordEncoder;
    }

    /**
     * @return array<string>
     */
    public static function getSubscribedEvents(): array
    {
        return [
            Events::prePersist,
            Events::preUpdate,
        ];
    }

    public function passwordEncode(PreUpdateEventArgs $args): void
    {
        $user = $args->getObject();

        if (!($user instanceof User && $args->hasChangedField(self::PASS_FIELD))) {
            return;
        }

        $args->setNewValue(self::PASS_FIELD, $this->userPasswordEncoder->encodePassword($user, $args->getNewValue(self::PASS_FIELD)));
    }

    public function prePersist(PreUpdateEventArgs $args): void
    {
        $this->passwordEncode($args);
    }

    public function preUpdate(PreUpdateEventArgs $args): void
    {
        $this->passwordEncode($args);
    }
}
