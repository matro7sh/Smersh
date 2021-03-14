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
        $user->setPhone("06 XX YY ZZ AA");
        $user->setMail("admin@smersh.app");
        $user->setCity("russia");
        $user->setTrigram("adm");
        $user->setRoles(["ROLE_USER", "ROLE_ADMIN"]);
        $user->setEnabled(true);
        $manager->persist($user);

        $user2 = new User();
        $user2->setUsername("guest");
        $user2->setPassword('guest');
        $user2->setPhone("07 OO JJ LL QQ");
        $user2->setMail("guest@smersh.app");
        $user2->setCity("Neuville");
        $user2->setTrigram("gst");
        $user2->setRoles(["ROLE_USER"]);
        $user2->setEnabled(false);
        $manager->persist($user2);
        $manager->flush();

        $user3 = new User();
        $user3->setUsername("manager");
        $user3->setPassword('manager');
        $user3->setPhone("06 AA BB CC II");
        $user3->setMail("manager@smersh.app");
        $user3->setCity("Lesquin");
        $user3->setTrigram("mna");
        $user3->setRoles(["ROLE_USER", "ROLE_MANAGER"]);
        $user3->setEnabled(false);
        $manager->persist($user3);
        $manager->flush();

    }

    private $passwordEncoder;


     public function __construct(UserPasswordEncoderInterface $passwordEncoder)
    {
        $this->passwordEncoder = $passwordEncoder;
    }
}
