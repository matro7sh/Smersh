<?php

declare(strict_types=1);

namespace App\Tests\Behat;

use Behat\Mink\Driver\BrowserKitDriver;
use Behat\Mink\Session;
use Symfony\Component\BrowserKit\AbstractBrowser;

trait ClientTrait
{
    private function getClient(Session $session): AbstractBrowser
    {
        $driver = $session->getDriver();

        if (!$driver instanceof BrowserKitDriver) {
            throw new \RuntimeException(\sprintf('Driver should be an instance of BrowserKitDriver, got "%s"', \get_class($driver)));
        }

        return $driver->getClient();
    }
}
