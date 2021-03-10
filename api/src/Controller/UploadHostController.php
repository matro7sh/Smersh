<?php

namespace App\Controller;

use App\Entity\Host;
use App\Repository\HostRepository;
use App\Repository\MissionRepository;
use Doctrine\ORM\EntityManagerInterface;
use Psr\Log\LoggerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class UploadHostController extends AbstractController
{
    const REGEX_URL = "/^((https?|ftp):\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/";

    private $entityManager;
    private $hostRepository;
    private $logger;
    private $missionRepository;

    public function __construct(
        EntityManagerInterface $entityManager,
        HostRepository $hostRepository,
        LoggerInterface $logger,
        MissionRepository $missionRepository
    )
    {
        $this->entityManager = $entityManager;
        $this->hostRepository = $hostRepository;
        $this->logger = $logger;
        $this->missionRepository = $missionRepository;
    }

    /**
     * @Route("/api/upload/host", name="upload_host", methods={"POST"})
     */
    public function index(Request $request): Response
    {
        $acceptedDomains = [];
        $rejectedDomains = [];
        /** @var UploadedFile $content */
        $content = $request->files->get("filename");
        $filename =  $content->getPathname();
        $missionName = $request->request->get("missionName");
      //  $checked = $request->request->get("checked");
        $mission = $this->missionRepository->findOneByName($missionName);

        $handle = fopen($filename, "r");
        if ($handle) {
            while (($line = fgets($handle)) !== false) {
                $name = str_replace("\n","",$line);
                $name = strtolower($name);
                    $currentHost = $this->hostRepository->findOneByName($name);
                    if (!$currentHost instanceof Host) {
                        try {
                            $host = new Host();
                            $host->setName($name);
                            $host->setTechnology(null);
                            $this->logger->info($line);
                            $host->setMission($mission);
                            $host->setChecked(false);
                            $this->entityManager->persist($host);
                            \array_push($acceptedDomains, $name);
                        } catch (\Exception $e) {
                            \array_push($rejectedDomains, $name);
                            $this->logger->warning('There is an error ' . $e->getMessage());
                        }
                    } else {
                        \array_push($rejectedDomains, $name);
                    }
            }
            $this->entityManager->flush();
            fclose($handle);
        } else {}


        return new JsonResponse([
            'accepted_domains' => $acceptedDomains,
            'rejected_domains' => $rejectedDomains,
        ], Response::HTTP_CREATED);
    }
}
