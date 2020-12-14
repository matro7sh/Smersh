<?php

namespace App\DataFixtures;

use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class UserFixtures extends Fixture
{
    public function load(ObjectManager $manager)
    {
        $user = new User();
        $user->setUsername("admin");
        $user->setPassword('admin');
        $user->setRoles(["ROLE_USER", "ROLE_ADMIN"]);
        $user->setEnabled(true);
        $manager->persist($user);

        $user2 = new User();
        $user2->setUsername("guest");
        $user2->setPassword('guest');
        $user2->setRoles(["ROLE_USER"]);
        $user2->setEnabled(false);
        $manager->persist($user2);
        $manager->flush();

    }

    private $passwordEncoder;


     public function __construct(UserPasswordEncoderInterface $passwordEncoder)
    {
        $this->passwordEncoder = $passwordEncoder;
    }
}
