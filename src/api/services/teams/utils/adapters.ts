import { RemoteTeam, Team } from "@/types";

export const teamAdapter = (team: RemoteTeam): Team => {
  const { id, name, tag, slug, university, university_tag } = team;

  return {
    id,
    name,
    imageUrl: `/images/team_logos/${slug}.png`,
    slug,
    university,
    tag,
    universityTag: university_tag,
  };
};
