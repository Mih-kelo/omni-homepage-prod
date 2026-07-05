import { motion } from "framer-motion";
import { APP_URL, COPY } from "../../config/copy";
import { SPRING } from "../../config/motion";

/**
 * The offer as a quiet gallery of four plates (Direction Chamber 7).
 * Consistent anatomy: name / price / desc / hairline / features / action.
 * The recommended plate rests slightly lifted and carries the accent;
 * hover is a restrained rise — border and shadow transitions live in CSS.
 * All plan copy verbatim from COPY.pricing.
 */
export function PlateDrawer() {
  return (
    <div className="lx-plates" role="list">
      {COPY.pricing.plans.map((p, i) => {
        const restY = p.featured ? -8 : 0;
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
              <span className="lx-plate-price">{p.price}</span>
              {p.period && <span className="lx-plate-period">{p.period}</span>}
            </div>
            <p className="lx-plate-desc">{p.desc}</p>
            <span className="lx-plate-rule" aria-hidden="true" />
            {p.features.length > 0 && (
              <ul className="lx-plate-features">
                {p.features.map((f) => (
                  <li key={f}>{f}</li>
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
  );
}
