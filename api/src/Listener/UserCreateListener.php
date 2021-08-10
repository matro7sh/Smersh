<?php


namespace App\Listener;


use App\Entity\User;
use Doctrine\ORM\Events;
use Doctrine\Persistence\Event\LifecycleEventArgs;
use Psr\Log\LoggerInterface;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\KernelInterface;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use Symfony\Contracts\HttpClient\HttpClientInterface;

class UserCreateListener implements EventSubscriberInterface
{

    const CODI_URL = 'http://codimd:3000/register';
    const HTTP_CODI_METHOD = 'POST';

    /** @var KernelInterface $kernel */
    private $kernel;
    private $logger;
    private $client;

    /** @var UserPasswordEncoderInterface $userPasswordEncoder */
    private $userPasswordEncoder;

    public function __construct(
        KernelInterface $kernel,
        UserPasswordEncoderInterface $userPasswordEncoder,
        HttpClientInterface $client,
        LoggerInterface $logger
    )
    {
        $this->kernel = $kernel;
        $this->userPasswordEncoder = $userPasswordEncoder;
        $this->client = $client;
        $this->logger = $logger;
    }

    /**
     * @return array<string>
     */
    public static function getSubscribedEvents(): array
    {
        return [
            Events::postPersist
        ];
    }

    public function postPersist(LifecycleEventArgs $args): void
    {
        $user = $args->getObject();

        if (!$user instanceof User) {
            return;
        }

        try {
            $this->client->request(
                self::HTTP_CODI_METHOD,
                self::CODI_URL, [
                    'headers' => [
                        'User-Agent' => 'Mozilla/5.0 (X11; Linux x86_64; rv:90.0) Gecko/20100101 Firefox/90.0',
                        'Content-Type' => 'application/x-www-form-urlencoded',
                    ],
                    'body' => ['email' => $user->getMail() , 'password' => $user->getPassword()]
                ]
            );
        } catch (\Exception $e) {
            $this->logger->error('Error to create codimd account : ' . $e);
        }

        $user->setPassword($this->userPasswordEncoder->encodePassword($user, $user->getPassword()));
    }

}
