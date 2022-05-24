interface SimpleBaseModel {
  id: number;
}

export interface BaseModel {
  id: number;
  created: Date;
  updated: Date;
}

export interface Region extends SimpleBaseModel {
  name: string;
}

export interface Flag extends SimpleBaseModel {
  path: string;
}

export interface PlayerPosition extends SimpleBaseModel {
  name: string;
}

export interface Player extends BaseModel {
  firstName?: string;
  lastName: string;
  birthDate: Date;
  shirtNumber: number;
  position: PlayerPosition;
  displayId: number;
}

export interface Team extends BaseModel {
  name: string;
  countryCode: string;
  flag: Flag;
  region: Region;
  players: Player[];
}

export interface TournamentGroup extends SimpleBaseModel {
  name: string;
}

export interface GroupTeam extends SimpleBaseModel {
  team: Team;
  groupId: number;
}

export interface Game extends SimpleBaseModel {
  homeTeamPoints: number;
  awayTeamPoints: number;
  homeTeam: GroupTeam;
  awayTeam: GroupTeam;
}

export interface TournamentStage extends SimpleBaseModel {
  name: string;
  games: Game[];
}

export interface Tournament extends BaseModel {
  name: string;
  startDate: Date;
  endDate: Date;
  teams: Team[];
  tournamentGroups: TournamentGroup[];
  tournamentStages: TournamentStage[];
  ready: boolean;
}
