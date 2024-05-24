import {Expose, plainToClass} from "class-transformer";

export class MembersIdsDto {
  @Expose({name: 'members_ids'})
    membersIds!: [];

  constructor(data: Partial<MembersIdsDto>) {
    Object.assign(this, plainToClass(MembersIdsDto, data));
  }
}