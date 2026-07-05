import { motion } from "framer-motion";
import { APP_URL, COPY } from "../../config/copy";
import { SPRING } from "../../config/motion";

/**
 * The offer without a pricing section (Direction Chamber 7): four slim
 * glass plates in an archive drawer. Hover lifts a plate with light
 * passing through. All plan copy verbatim.
 */
export function PlateDrawer() {
  return (
    <div className="lx-plates" role="list">
      {COPY.pricing.plans.map((p, i) => (
        <motion.div
          key={p.name}
          role="listitem"
          className="lx-plate"
          data-featured={p.featured}
          initial={{ opacity: 0, y: 34, rotateX: 6 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          whileHover={{
            y: -10,
            rotateX: 2,
            boxShadow: "0 30px 50px -30px rgba(49, 46, 129, 0.35)",
          }}
          transition={{ ...SPRING.soft, delay: i * 0.06 }}
          style={{ transformPerspective: 900, textAlign: "left" }}
        >
          {p.featured && <span className="lx-plate-flag">{COPY.pricing.recommended}</span>}
          <span className="lx-plate-name">{p.name}</span>
          <div>
            <span className="lx-plate-price">{p.price}</span>{" "}
            {p.period && <span className="lx-plate-period">{p.period}</span>}
          </div>
          <p className="lx-plate-desc">{p.desc}</p>
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
        </motion.div>
      ))}
    </div>
  );
}
