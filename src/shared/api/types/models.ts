interface SimpleBaseModel {
  id: number;
}

interface BaseModel {
  id: number;
  created: Date;
  updated: Date;
  deleted: boolean;
}

export interface Region extends SimpleBaseModel {
  name: string;
}

export interface Flag extends SimpleBaseModel {
  path: string;
}

export interface Team extends BaseModel {
  name: string;
  countryCode: string;
  flag: Flag;
  region: Region;
}
