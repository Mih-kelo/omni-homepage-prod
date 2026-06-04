import { createServerAdapter } from "@whatwg-node/server";
import server from "../dist/server/server.js";

export default createServerAdapter(async (request) => {
  return server.fetch(request, {}, {});
});
