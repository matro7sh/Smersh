<?php

namespace App\Repository;

use App\Entity\Vuln;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method Vuln|null find($id, $lockMode = null, $lockVersion = null)
 * @method Vuln|null findOneBy(array $criteria, array $orderBy = null)
 * @method Vuln[]    findAll()
 * @method Vuln[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class VulnRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Vuln::class);
    }

    // /**
    //  * @return Vuln[] Returns an array of Vuln objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('v')
            ->andWhere('v.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('v.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?Vuln
    {
        return $this->createQueryBuilder('v')
            ->andWhere('v.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
