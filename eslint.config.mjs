import { defineConfig, globalIgnores } from "eslint/config";
import next from "eslint-config-next";

export default defineConfig([
  ...next,
  {
    rules: {
      // Apostrophes in JSX copy are safe and read better than &apos;.
      "react/no-unescaped-entities": "off",
      // Reading localStorage / the clock after hydration (cart, offer dates) is intentional here and avoids a server/browser mismatch.
      "react-hooks/set-state-in-effect": "off",
      // QuoteForm and ShopClient define small field components inside render. It works; refactoring is tracked separately.
      "react-hooks/static-components": "off",
    },
  },
  globalIgnores([".next/**", "node_modules/**", "next-env.d.ts", "design-reference/**"]),
]);
