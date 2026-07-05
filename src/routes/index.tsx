import { createFileRoute } from "@tanstack/react-router";
import { LumenExperience } from "@/experience/LumenExperience";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return <LumenExperience />;
}
