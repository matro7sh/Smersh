<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class UploadNmapController extends AbstractController
{
    /**
     * @Route("/upload/nmap", name="upload_nmap")
     */
    public function index(Request $request): Response
    {
        dump("on va le faire un jour wola");
        exit;
    }
}
