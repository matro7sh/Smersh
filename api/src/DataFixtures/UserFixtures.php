<?php

namespace App\DataFixtures;

use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class UserFixtures extends Fixture
{
    private $passwordEncoder;

    public function __construct(UserPasswordEncoderInterface $passwordEncoder)
    {
        $this->passwordEncoder = $passwordEncoder;
    }

    public function load(ObjectManager $manager)
    {
        $user = new User();
        $user->setUsername("admin");
        $user->setPassword('admin');
        $user->setRoles(["ROLE_USER", "ROLE_ADMIN"]);
        $user->setEnabled(true);
        $manager->persist($user);
        $this->setReference('USER_ADMIN', $user);

        $user = new User();
        $user->setUsername("guest");
        $user->setPassword('guest');
        $user->setRoles(["ROLE_USER"]);
        $user->setEnabled(false);
        $manager->persist($user);
        $this->setReference('USER_GUEST', $user);

        $manager->flush();
    }


}
