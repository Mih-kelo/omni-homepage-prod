import { Link } from "@tanstack/react-router";
import { APP_URL, SHOPIFY_APP_URL } from "../../config/copy";
import { BrandMark } from "./BrandMark";

export function Colophon() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="lx-colophon">
      <div className="lx-colophon-grid">
        {/* Column 1: Brand & Pre-Spend Mission */}
        <div className="lx-colophon-col lx-colophon-col-brand">
          <div className="lx-colophon-brand">
            <BrandMark size={22} />
            <span className="lx-colophon-word">OMNI TARGET</span>
          </div>
          <p className="lx-colophon-desc">
            Pre-spend intelligence for Shopify merchants. Discover your exact gateway product
            cold strangers buy on Meta before risking your ad budget.
          </p>

          <div className="lx-colophon-badges">
            <span className="lx-colophon-badge">
              <span className="lx-colophon-badge-dot" />
              Official Shopify Partner App
            </span>
            <span className="lx-colophon-badge">
              Built for Meta Ads
            </span>
          </div>
        </div>

        {/* Column 2: Product & Quick Navigation */}
        <div className="lx-colophon-col">
          <h4 className="lx-colophon-heading">Product</h4>
          <ul className="lx-colophon-links">
            <li>
              <a href={APP_URL} className="lx-colophon-link">
                Scan Store Free
              </a>
            </li>
            <li>
              <a
                href={SHOPIFY_APP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="lx-colophon-link"
              >
                Shopify App Store <span aria-hidden="true">↗</span>
              </a>
            </li>
            <li>
              <a href="#chamber-listening" className="lx-colophon-link">
                How It Works
              </a>
            </li>
            <li>
              <a href="#chamber-paradox" className="lx-colophon-link">
                Cold Traffic Paradox
              </a>
            </li>
            <li>
              <a href="#chamber-invitation" className="lx-colophon-link">
                Credit Packs & Pricing
              </a>
            </li>

          </ul>
        </div>

        {/* Column 3: Trust & Support */}
        <div className="lx-colophon-col">
          <h4 className="lx-colophon-heading">Trust & Legal</h4>
          <ul className="lx-colophon-links">
            <li>
              <Link to="/privacy" className="lx-colophon-link">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/terms" className="lx-colophon-link">
                Terms of Service
              </Link>
            </li>
            <li>
              <a href="mailto:hello@omnitarget.co" className="lx-colophon-link">
                hello@omnitarget.co
              </a>
            </li>
            <li>
              <a
                href={SHOPIFY_APP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="lx-colophon-link"
              >
                Official Shopify Partner ↗
              </a>
            </li>
            <li>
              <span className="lx-colophon-link-muted">
                100% Read-Only Safety
              </span>
            </li>
          </ul>
        </div>

        {/* Column 4: Store Safety Guarantee Card */}
        <div className="lx-colophon-col lx-colophon-col-guarantee">
          <h4 className="lx-colophon-heading">Store Safety Guarantee</h4>
          <div className="lx-colophon-guarantee-card">
            <div className="lx-colophon-guarantee-header">
              <span className="lx-colophon-guarantee-icon">🛡️</span>
              <span className="lx-colophon-guarantee-title">Zero Risk to Store</span>
            </div>
            <p className="lx-colophon-guarantee-text">
              Verified Shopify App with read_orders and read_products scopes only. Billed natively through Shopify's Billing API. We never touch payment credentials or edit theme files.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Legal & Disclaimer Bar */}
      <div className="lx-colophon-bottom">
        <span className="lx-mono lx-colophon-bottom-copy">
          © {currentYear} Omni Target Inc. All rights reserved.
        </span>
        <span className="lx-mono lx-colophon-bottom-disclaimer">
          Omni Target is an independent application and is not affiliated with Meta Platforms, Inc. Shopify is a registered trademark of Shopify Inc.
        </span>
      </div>

      <div className="lx-lastmote" aria-hidden="true">
        <i />
      </div>
    </footer>
  );
}
