import {Expose} from "class-transformer";

export class MembersIdsDto {
  @Expose({name: 'members_ids'})
    members: [];

  constructor(
    members: [],
  ) {
    this.members = members;
  }
}