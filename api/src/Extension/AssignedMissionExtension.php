<?php

namespace App\Extension;

use ApiPlatform\Core\Bridge\Doctrine\Orm\Extension\QueryCollectionExtensionInterface;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Util\QueryNameGeneratorInterface;
use App\Entity\Mission;
use App\Entity\User;
use Doctrine\ORM\QueryBuilder;
use Symfony\Component\Security\Core\Security;

class AssignedMissionExtension implements QueryCollectionExtensionInterface
{
    private $security;

    public function __construct(Security $security)
    {
        $this->security = $security;
    }

    public function applyToCollection(QueryBuilder $queryBuilder, QueryNameGeneratorInterface $queryNameGenerator, string $resourceClass, string $operationName = null)
    {
        $this->addWhere($queryBuilder, $resourceClass);
    }

    private function addWhere(QueryBuilder $queryBuilder, string $resourceClass)
    {
        if (Mission::class !== $resourceClass) {
            return;
        }

        if ($this->security->isGranted('ROLE_MANAGER')) {
            return;
        }

        $rootAlias = $queryBuilder->getRootAliases()[0];
        $queryBuilder->innerJoin(\sprintf('%s.%s', $rootAlias, $this->security->getUser() instanceof User ? 'users' : 'clients'), 'u');
        $queryBuilder->andWhere('u = :user');
        $queryBuilder->setParameter('user', $this->security->getUser());
    }
}
