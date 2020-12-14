<?php

namespace App\Repository;

use App\Entity\Impact;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method Impact|null find($id, $lockMode = null, $lockVersion = null)
 * @method Impact|null findOneBy(array $criteria, array $orderBy = null)
 * @method Impact[]    findAll()
 * @method Impact[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ImpactRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Impact::class);
    }

    // /**
    //  * @return Impact[] Returns an array of Impact objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('i')
            ->andWhere('i.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('i.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?Impact
    {
        return $this->createQueryBuilder('i')
            ->andWhere('i.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
