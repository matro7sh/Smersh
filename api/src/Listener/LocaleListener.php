<?php

declare(strict_types=1);

namespace App\Listener;

use Symfony\Component\HttpKernel\Event\KernelEvent;

class LocaleListener
{
    public function onKernelRequest(KernelEvent $event): void
    {
        $request = $event->getRequest();

        $language = $request->getPreferredLanguage();

        $request->setLocale($language ?? 'en');
    }
}
