<?php

namespace App\Repository;

use App\Entity\HostVuln;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method HostVuln|null find($id, $lockMode = null, $lockVersion = null)
 * @method HostVuln|null findOneBy(array $criteria, array $orderBy = null)
 * @method HostVuln[]    findAll()
 * @method HostVuln[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class HostVulnRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, HostVuln::class);
    }

    // /**
    //  * @return HostVuln[] Returns an array of HostVuln objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('h')
            ->andWhere('h.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('h.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?HostVuln
    {
        return $this->createQueryBuilder('h')
            ->andWhere('h.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
