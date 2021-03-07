<?php

declare(strict_types=1);

namespace App\Filter;

use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\AbstractContextAwareFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Util\QueryNameGeneratorInterface;
use Doctrine\ORM\QueryBuilder;

final class MissionTypeFilter extends AbstractContextAwareFilter
{
    const FILTER_NAME = 'name';

    /**
     * {@inheritdoc}
     */
    protected function filterProperty(string $property, $value, QueryBuilder $queryBuilder, QueryNameGeneratorInterface $queryNameGenerator, string $resourceClass, string $operationName = null, array $context = [])
    {
        if (!$this->isPropertyEnabled($property, $resourceClass)) {
            return;
        }

        $parameterName = $queryNameGenerator->generateParameterName(self::FILTER_NAME);
        $queryBuilder->andWhere('SUBSTRING(o.missionType.name, 1, 2)  in (:'.$parameterName.')');
        $queryBuilder->setParameter($parameterName, $value);
    }


    /**
     * {@inheritdoc}
     */
    public function getDescription(string $resourceClass): array
    {
        if (!$this->properties) {
            return [];
        }

        return [
            'missionType' => [
                'property' => self::FILTER_NAME,
                'type' => 'string',
                'required' => false,
                'strategy' => 'exact',
                'swagger' => [
                    'description' => '',
                    'name' => self::FILTER_NAME,
                    'type' => 'string',
                ],
            ],
        ];
    }
}
