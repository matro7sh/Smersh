<?php

declare(strict_types=1);

namespace App\Subscriber;

use App\Entity\User;
use Lexik\Bundle\JWTAuthenticationBundle\Event\JWTCreatedEvent;
use Symfony\Component\Security\Core\Role\RoleHierarchyInterface;

class JWTGenerationSubscriber
{
    private $roleHierarchy;

    public function __construct(RoleHierarchyInterface $roleHierarchy)
    {
        $this->roleHierarchy = $roleHierarchy;
    }

    public function onJWTCreated(JWTCreatedEvent $event): void
    {
        /** @var User $user */
        $user = $event->getUser();

        // Override data into JWT
        $payload = $event->getData();
        $payload['exp'] = time() + (60 * 60 * 24 * 30 * 6); // six months token lifetime
        $payload['user'] = sprintf('/users/%s', $user->getId());
        $payload['roles'] = $this->roleHierarchy->getReachableRoleNames($user->getRoles());

        $event->setData($payload);
    }
}
