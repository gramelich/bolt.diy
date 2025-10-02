// functions/[[path]].ts

import type { ServerBuild } from '@remix-run/cloudflare';
import { createPagesFunctionHandler } from '@remix-run/cloudflare-pages';

export const onRequest: PagesFunction = async (context) => {
  // 🚨 CORREÇÃO: Usamos o nome de build mais comum no Pages/Wrangler, index.js.
  // A importação dinâmica deve ser resolvida pelo Pages Functions runtime.
  const serverBuild = (await import('./index.js')) as unknown as ServerBuild;

  const handler = createPagesFunctionHandler({
    build: serverBuild,
    // Se você usa bindings (KV, D1, etc.), o contexto deve ser passado.
    // getLoadContext: (context) => ({ env: context.env }), 
  });

  return handler(context);
};
