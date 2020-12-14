<?php

namespace App\Repository;

use App\Entity\Nmap;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method Nmap|null find($id, $lockMode = null, $lockVersion = null)
 * @method Nmap|null findOneBy(array $criteria, array $orderBy = null)
 * @method Nmap[]    findAll()
 * @method Nmap[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class NmapRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Nmap::class);
    }

    // /**
    //  * @return Nmap[] Returns an array of Nmap objects
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
    public function findOneBySomeField($value): ?Nmap
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
