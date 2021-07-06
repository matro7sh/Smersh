import { Input } from './Input';
import { UsersService } from 'src/app/services/users.service';
import { VulnsService } from 'src/app/services/vulns.service';
import { Injectable } from '@angular/core';
import { ClientsService } from 'src/app/services/clients.service';
import { ImpactsService } from 'src/app/services/impacts.service';
import { VulnTypesService } from 'src/app/services/vulnTypes.service';
import { TypesService } from 'src/app/services/types.service';

abstract class QueryableInput extends Input {
  public inputType = 'queryable';
  public multiple = false;

  constructor(props) {
    super();
    Object.entries(props ?? {}).map(([k, v]) => {
      this[k.toString()] = v;
    });
  }
}

abstract class QueryableAutocompleteInput extends QueryableInput {}

@Injectable()
export class UserAutocompleteInput extends QueryableAutocompleteInput {
  name = 'user';
  source = 'username';

  constructor(public service: UsersService) {
    super({ service });
  }
}

@Injectable()
export class MultipleUsersAutocompleteInput extends UserAutocompleteInput {
  name = 'users';
  multiple = true;
}

@Injectable()
export class ClientAutocompleteInput extends QueryableAutocompleteInput {
  name = 'client';
  source = 'name';

  constructor(public service: ClientsService) {
    super(service);
  }
}

@Injectable()
export class MultipleClientsAutocompleteInput extends ClientAutocompleteInput {
  name = 'clients';
  multiple = true;
}

@Injectable()
export class ImpactAutocompleteInput extends QueryableAutocompleteInput {
  name = 'impact';

  constructor(public service: ImpactsService) {
    super(service);
  }
}

@Injectable()
export class VulnTypeAutocompleteInput extends QueryableAutocompleteInput {
  name = 'type';

  constructor(public service: VulnTypesService) {
    super(service);
  }
}

@Injectable()
export class VulnAutocompleteInput extends QueryableAutocompleteInput {
  name = 'vuln';

  constructor(public service: VulnsService) {
    super(service);
  }
}

@Injectable()
export class MissionTypeAutocompleteInput extends QueryableAutocompleteInput {
  name = 'type';

  constructor(public service: TypesService) {
    super(service);
  }
}

export class RoleAutocompleteInput extends QueryableAutocompleteInput {
  name = 'roles';
  label = 'Select a role';
  choices = [
    {
      label: 'Admin',
      value: 'ROLE_ADMIN',
    },
    {
      label: 'Manager',
      value: 'ROLE_MANAGER',
    },
    {
      label: 'Pentester',
      value: 'ROLE_PENTESTER',
    },
    {
      label: 'Guest',
      value: 'ROLE_CLIENT',
    },
  ];

  constructor() {
    super(undefined);
  }
}
