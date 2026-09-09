import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { APP_URL, COPY } from "../../config/copy";
import { SPRING } from "../../config/motion";

export type CurrencyCode = "USD" | "NGN" | "GBP" | "EUR";

interface CurrencyConfig {
  code: CurrencyCode;
  symbol: string;
  name: string;
  fallbackRate: number;
}

const CURRENCIES: Record<CurrencyCode, CurrencyConfig> = {
  USD: { code: "USD", symbol: "$", name: "USD", fallbackRate: 1 },
  NGN: { code: "NGN", symbol: "₦", name: "NGN", fallbackRate: 1600 },
  GBP: { code: "GBP", symbol: "£", name: "GBP", fallbackRate: 0.78 },
  EUR: { code: "EUR", symbol: "€", name: "EUR", fallbackRate: 0.92 },
};

function detectDefaultCurrency(): CurrencyCode {
  // Default to USD globally to maintain 1:1 consistency with the official Shopify App Store listing.
  // Visitors can freely toggle between USD, NGN, GBP, and EUR using the switcher.
  return "USD";
}

export function PlateDrawer() {
  const [selectedCurrency, setSelectedCurrency] = useState<CurrencyCode>("USD");
  const [rates, setRates] = useState<Record<string, number>>({
    USD: 1,
    NGN: 1600,
    GBP: 0.78,
    EUR: 0.92,
  });

  useEffect(() => {
    // Auto-detect currency on mount
    const detected = detectDefaultCurrency();
    setSelectedCurrency(detected);

    // Silently fetch fresh exchange rates from public API
    fetch("https://open.er-api.com/v6/latest/USD")
      .then((res) => res.json())
      .then((data) => {
        if (data?.rates) {
          setRates((prev) => ({
            ...prev,
            NGN: data.rates.NGN || prev.NGN,
            GBP: data.rates.GBP || prev.GBP,
            EUR: data.rates.EUR || prev.EUR,
          }));
        }
      })
      .catch(() => {
        // Safe fallback already in state
      });
  }, []);

  const cur = CURRENCIES[selectedCurrency];
  const rate = rates[selectedCurrency] || cur.fallbackRate;

  const formatPriceDisplay = (usdPrice: number) => {
    if (usdPrice === 0) return "Free";
    const local = usdPrice * rate;

    if (selectedCurrency === "NGN") {
      const rounded = Math.round(local / 100) * 100;
      return `₦${rounded.toLocaleString("en-US")}`;
    }
    if (selectedCurrency === "USD") {
      return `$${usdPrice}`;
    }
    const rounded = Math.round(local);
    return `${cur.symbol}${rounded}`;
  };

  const formatPeriodDisplay = (usdPrice: number) => {
    if (usdPrice === 0) return "";
    return "one-time charge";
  };

  const renderFeatureText = (text: string) => {
    const match = text.match(/\(\$([0-9.]+) each\)/);
    if (!match) return text;
    if (selectedCurrency === "USD") return text;

    const unitUsd = parseFloat(match[1]);
    const local = unitUsd * rate;
    if (selectedCurrency === "NGN") {
      const rounded = Math.round(local / 100) * 100;
      return text.replace(/\(\$[0-9.]+ each\)/, `(₦${rounded.toLocaleString("en-US")} each)`);
    }
    return text.replace(/\(\$[0-9.]+ each\)/, `(${cur.symbol}${local.toFixed(2)} each)`);
  };

  return (
    <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
      {/* Currency Switcher */}
      <div className="lx-currency-switcher" role="group" aria-label="Select display currency">
        <span className="lx-currency-label">Currency:</span>
        {(["USD", "NGN", "GBP", "EUR"] as const).map((code) => {
          const isActive = selectedCurrency === code;
          return (
            <button
              key={code}
              type="button"
              onClick={() => setSelectedCurrency(code)}
              className={`lx-currency-btn ${isActive ? "lx-currency-btn-active" : ""}`}
              aria-pressed={isActive}
            >
              {CURRENCIES[code].symbol} {code}
            </button>
          );
        })}
      </div>

      {/* Pricing Plates Grid */}
      <div className="lx-plates" role="list">
        {COPY.pricing.plans.map((p, i) => {
          const restY = p.featured ? -8 : 0;
          const displayPrice = formatPriceDisplay(p.usdPrice);
          const displayPeriod = formatPeriodDisplay(p.usdPrice);

          return (
            <motion.article
              key={p.name}
              role="listitem"
              className="lx-plate"
              data-featured={p.featured}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: restY }}
              viewport={{ once: true, amount: 0.2 }}
              whileHover={{ y: restY - 5 }}
              transition={{ ...SPRING.soft, delay: i * 0.07 }}
            >
              {p.featured && <span className="lx-plate-flag">{COPY.pricing.recommended}</span>}
              <span className="lx-plate-name">{p.name}</span>
              <div className="lx-plate-pricerow">
                <span className="lx-plate-price">{displayPrice}</span>
                {displayPeriod ? <span className="lx-plate-period">{displayPeriod}</span> : null}
              </div>
              {p.desc ? <p className="lx-plate-desc">{p.desc}</p> : null}
              <span className="lx-plate-rule" aria-hidden="true" />
              <span className="lx-plate-features-heading">Features</span>
              {p.features.length > 0 && (
                <ul className="lx-plate-features">
                  {p.features.map((f) => (
                    <li key={f}>{renderFeatureText(f)}</li>
                  ))}
                </ul>
              )}
              <div className="lx-plate-cta">
                <a href={APP_URL}>{p.cta}</a>
              </div>
            </motion.article>
          );
        })}
      </div>

      {/* Agency & Multi-Store Volume Callout */}
      <p
        className="lx-mono"
        style={{
          fontSize: 12,
          color: "var(--lx-ink-soft)",
          margin: "18px 0 0",
          textAlign: "center",
          letterSpacing: "0.02em",
        }}
      >
        Managing multiple stores or spending $20k+/mo?{" "}
        <a
          href="mailto:hello@omnitarget.co?subject=Agency%20Volume%20Inquiry"
          style={{
            color: "var(--lx-accent)",
            textDecoration: "underline",
            textUnderlineOffset: "3px",
            fontWeight: 600,
          }}
        >
          Contact us for agency volume packs & team seats
        </a>
      </p>
    </div>
  );
}
