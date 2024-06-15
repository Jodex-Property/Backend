import { getPropertiesByAgent } from "../Agent/agentServices.js";

export const getPropertiesByAgentController = async (req, res) => {
  const agentId = parseInt(req.params.agentId);

  if (isNaN(agentId)) {
    return res.status(400).json({ message: "Invalid agent ID" });
  }

  try {
    const properties = await getPropertiesByAgent(agentId);
    res.status(200).json(properties);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
