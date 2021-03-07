<?php

declare(strict_types=1);

namespace App\Voter;

use App\Entity\Mission;
use App\Entity\User;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Authorization\Voter\Voter;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\Security\Core\User\UserInterface;

class UserVoter extends Voter
{
    const ROLE_USER_MANAGE = 'ROLE_USER_MANAGE';
    const ROLE_USER_PATCH = 'ROLE_USER_PATCH';
    const ROLE_USER_PUT = 'ROLE_USER_PUT';

    private $security;

    public function __construct(Security $security)
    {
        $this->security = $security;
    }

    protected function supports($attribute, $subject)
    {
        if (!\in_array($attribute, [self::ROLE_USER_PATCH, self::ROLE_USER_PUT], true)) {
            return false;
        }

        if (!$subject instanceof User) {
            return false;
        }

        return true;
    }

    protected function voteOnAttribute($attribute, $subject, TokenInterface $token)
    {
        if ($this->security->isGranted('ROLE_ADMIN')) {
            return true;
        }

        if ($this->security->isGranted(self::ROLE_USER_MANAGE)) {
            return true;
        }

        if (!$this->security->isGranted(self::ROLE_USER_PATCH) && !$this->security->isGranted(self::ROLE_USER_PUT)) {
            return false;
        }

        $user = $token->getUser();
        if (!$user instanceof UserInterface) {
            return false;
        }

        /** @var User $targetUser */
        $targetUser = $subject;

        return $user->getUsername() === $targetUser->getUsername();
    }
}
