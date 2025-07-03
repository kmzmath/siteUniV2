import { DUELISTS, CONTROLLERS, INITIATORS, SENTINELS } from "./constants";

export const orderAgentsByRole = (agents: string[]) => {
  const duelists = agents.filter((agent) => DUELISTS.includes(agent));
  const initiators = agents.filter((agent) => INITIATORS.includes(agent));
  const controllers = agents.filter((agent) => CONTROLLERS.includes(agent));
  const sentinels = agents.filter((agent) => SENTINELS.includes(agent));

  return [...duelists, ...initiators, ...controllers, ...sentinels];
};
