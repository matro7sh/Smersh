<?php

namespace App\Repository;

use App\Entity\NegativePoint;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method NegativePoint|null find($id, $lockMode = null, $lockVersion = null)
 * @method NegativePoint|null findOneBy(array $criteria, array $orderBy = null)
 * @method NegativePoint[]    findAll()
 * @method NegativePoint[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class NegativePointRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, NegativePoint::class);
    }

    // /**
    //  * @return NegativePoint[] Returns an array of NegativePoint objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('n')
            ->andWhere('n.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('n.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?NegativePoint
    {
        return $this->createQueryBuilder('n')
            ->andWhere('n.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
