import Project from 'src/model/project';
import {ProjectSaveDto} from "../../dto/project/projectSaveDto";

export const listProjects = async () => {
  const projects = await Project.find({});
  console.log("Projects", projects);
};

export const saveProject = async ({
  name,
  description,
}: ProjectSaveDto) => {
  const project = await new Project({
    name,
    description,
  }).save();

  console.log("Created project ", project);
};
