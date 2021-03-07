<?php

declare(strict_types=1);

namespace App\Voter;

use App\Entity\Mission;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Authorization\Voter\Voter;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\Security\Core\User\UserInterface;

class MissionVoter extends Voter
{
    const ASSOCIATED_USER_ENABLED = 'ASSOCIATED_USER_ENABLED';

    private $security;

    public function __construct(Security $security)
    {
        $this->security = $security;
    }

    protected function supports($attribute, $subject)
    {
        if (!\in_array($attribute, [self::ASSOCIATED_USER_ENABLED], true)) {
            return false;
        }

        if (!$subject instanceof Mission) {
            return false;
        }

        return true;
    }

    protected function voteOnAttribute($attribute, $subject, TokenInterface $token)
    {
        if ($this->security->isGranted('ROLE_ADMIN') || $this->security->isGranted('ROLE_MANAGER')) {
            return true;
        }

        if (!$this->security->isGranted('ROLE_MISSION_GET_ITEM')) {
            return false;
        }

        $user = $token->getUser();
        if (!$user instanceof UserInterface) {
            return false;
        }

        /** @var Mission $mission */
        $mission = $subject;

        return $mission->getUsers()->contains($user);
    }
}
