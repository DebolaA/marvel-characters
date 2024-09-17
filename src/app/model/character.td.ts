export interface ICharacter {
  id: number;
  name: string;
  description: string;
  thumbnail: { path: string; extension: string };
  urls: any[];
  resourceURI: string;
}

export interface IApiResponse {
  attributionHTML: string;
  attributionText: string;
  code: number;
  copyright: string;
  data: ICharacterListResponse;
  etag: string;
  status: string;
}

export interface ICharacterListResponse {
  count: number;
  limit: number;
  offset: number;
  results: ICharacter[];
  total: number;
}

export interface IQueryPayload {
  limit: number;
  name: string;
  offset: number;
  orderBy: string;
  page: number;
}
