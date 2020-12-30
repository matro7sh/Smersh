<?php

declare(strict_types=1);

namespace App\Serializer;

use Locastic\ApiPlatformTranslationBundle\Model\AbstractTranslatable;
use Symfony\Component\Serializer\Normalizer\ContextAwareDenormalizerInterface;
use Symfony\Component\Serializer\Normalizer\ContextAwareNormalizerInterface;
use Symfony\Component\Serializer\Normalizer\DenormalizerAwareInterface;
use Symfony\Component\Serializer\Normalizer\DenormalizerInterface;
use Symfony\Component\Serializer\Normalizer\NormalizerAwareInterface;
use Symfony\Component\Serializer\Normalizer\NormalizerInterface;

class TranslationNormalizer implements ContextAwareNormalizerInterface, ContextAwareDenormalizerInterface, NormalizerAwareInterface, DenormalizerAwareInterface
{
    private const TRANSLATION_NORMALIZER_ALREADY_CALLED = 'TRANSLATION_NORMALIZER_ALREADY_CALLED';
    private const TRANSLATION_DENORMALIZER_ALREADY_CALLED = 'TRANSLATION_DENORMALIZER_ALREADY_CALLED';

    private $denormalizer;
    private $normalizer;

    public function normalize($object, $format = null, array $context = [])
    {
        $context[self::TRANSLATION_NORMALIZER_ALREADY_CALLED][spl_object_hash($object)] = true;

        $data = $this->normalizer->normalize($object, $format, $context);

        return $this->addLocaleKey($data);
    }

    public function supportsNormalization($data, $format = null, array $context = [])
    {
        if (!$data instanceof AbstractTranslatable) {
            return false;
        }

        if (isset($context[self::TRANSLATION_NORMALIZER_ALREADY_CALLED][spl_object_hash($data)])) {
            return false;
        }

        return true;
    }

    public function denormalize($data, $class, $format = null, array $context = [])
    {
        $context[self::TRANSLATION_DENORMALIZER_ALREADY_CALLED][$this->getHash($data)] = true;

        $newData = $this->removeLocaleKey($data);

        return $this->denormalizer->denormalize($newData, $class, $format, $context);
    }

    public function supportsDenormalization($data, $type, $format = null, array $context = [])
    {
        if (!is_subclass_of($type, AbstractTranslatable::class)) {
            return false;
        }

        if (isset($context[self::TRANSLATION_DENORMALIZER_ALREADY_CALLED][$this->getHash($data)])) {
            return false;
        }

        return true;
    }

    public function setDenormalizer(DenormalizerInterface $denormalizer): void
    {
        $this->denormalizer = $denormalizer;
    }

    public function setNormalizer(NormalizerInterface $normalizer): void
    {
        $this->normalizer = $normalizer;
    }

    private function addLocaleKey(array $data): array
    {
        if (isset($data['translations'])) {
            $newTranslationArray = [];

            foreach ($data['translations'] as $translation) {
                $newTranslationArray[$translation['locale']] = $translation;
            }

            $data['translations'] = $newTranslationArray;
        }

        return $data;
    }

    private function removeLocaleKey(array $data): array
    {
        $data['translations'] = array_values($data['translations']);

        return $data;
    }

    private function getHash($data): string
    {
        $string = \json_encode($data);

        return md5(false === $string ? 'false' : $string);
    }
}
