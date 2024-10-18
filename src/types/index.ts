export interface VercelWebhookBody {
  id: string;
  type: string;
  createdAt: number;
  payload: Payload;
  region: string;
}

interface Payload {
  team: {
    id: string[] | null;
  };
  user: {
    id: string[];
  };
  deployment: {
    id: string;
    meta: Map<string, unknown>;
    url: string;
    name: string;
  };
  links: {
    deployment: string;
    project: string;
  };
  target: "production" | "staging" | null;
  project: {
    id: string;
  };
  plan: string;
  regions: string[];
}
