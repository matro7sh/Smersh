<?php

namespace App\Repository;

use App\Entity\PositivePoint;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method PositivePoint|null find($id, $lockMode = null, $lockVersion = null)
 * @method PositivePoint|null findOneBy(array $criteria, array $orderBy = null)
 * @method PositivePoint[]    findAll()
 * @method PositivePoint[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class PositivePointRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, PositivePoint::class);
    }

    // /**
    //  * @return PositivePoint[] Returns an array of PositivePoint objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('p')
            ->andWhere('p.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('p.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?PositivePoint
    {
        return $this->createQueryBuilder('p')
            ->andWhere('p.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
