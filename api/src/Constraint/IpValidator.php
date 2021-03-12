<?php

namespace App\Constraint;

use Symfony\Component\Validator\Constraint;
use Symfony\Component\Validator\Constraints\IpValidator as SFIpValidator;
use Symfony\Component\Validator\Exception\UnexpectedTypeException;

class IpValidator extends SFIpValidator {
    /**
     * Validates the format of a CIDR notation string
     */
    function validateCidr(string $cidr): bool
    {
        $parts = explode('/', $cidr);
        if(count($parts) != 2) {
            return false;
        }

        $ip = $parts[0];
        $netmask = $parts[1];

        if (!preg_match("/^\d+$/", $netmask)){
            return false;
        }

        $netmask = intval($parts[1]);

        if($netmask < 0) {
            return false;
        }

        if(filter_var($ip, FILTER_VALIDATE_IP, FILTER_FLAG_IPV4)) {
            return $netmask <= 32;
        }

        if(filter_var($ip, FILTER_VALIDATE_IP, FILTER_FLAG_IPV6)) {
            return $netmask <= 128;
        }

        return false;
    }

    /**
     * {@inheritdoc}
     */
    public function validate($value, Constraint $constraint)
    {
        if (!$constraint instanceof Ip) {
            throw new UnexpectedTypeException($constraint, Ip::class);
        }

        if ($this->validateCidr($value)) {
            return;
        }

        parent::validate($value, $constraint);
    }
}
