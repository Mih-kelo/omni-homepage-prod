import { Link } from "@tanstack/react-router";
import { COPY } from "../../config/copy";

/**
 * The colophon (Direction §3, Chamber 7): one hairline row and a single
 * live mote drifting forever — the machine never stops. Text carried
 * verbatim from the production footer.
 */
export function Colophon() {
  return (
    <footer className="lx-colophon">
      <div className="lx-colophon-row">
        <span className="lx-panel-word">OMNI TARGET</span>
        <span className="lx-mono">{COPY.beta}</span>
        <nav style={{ display: "flex", gap: 18 }} aria-label="Legal">
          <Link to="/privacy" className="lx-mono">
            {COPY.footer.privacy}
          </Link>
          <Link to="/terms" className="lx-mono">
            {COPY.footer.terms}
          </Link>
        </nav>
        <span className="lx-mono" style={{ marginLeft: "auto" }}>
          {COPY.footer.tagline}
        </span>
      </div>
      <div className="lx-lastmote" aria-hidden="true">
        <i />
      </div>
    </footer>
  );
}
