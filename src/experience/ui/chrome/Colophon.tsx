import { Link } from "@tanstack/react-router";
import { COPY } from "../../config/copy";
import { BrandMark } from "./BrandMark";

/**
 * The colophon (Direction §3, Chamber 7): one hairline row and a single
 * live mote drifting forever — the machine never stops. The brand coin
 * anchors the wordmark; text carried verbatim from the production footer.
 */
export function Colophon() {
  return (
    <footer className="lx-colophon">
      <div className="lx-colophon-row">
        <span className="lx-colophon-brand">
          <BrandMark size={18} />
          <span className="lx-colophon-word">OMNI TARGET</span>
        </span>
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
