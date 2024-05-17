import {QueryDto} from "../queryDto";

export interface TaskQueryDto extends QueryDto {
  projectId: number;
}