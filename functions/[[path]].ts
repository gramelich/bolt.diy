// app/functions/[[path]].ts (ou onde estiver este arquivo)

import type { ServerBuild } from '@remix-run/cloudflare';
import { createPagesFunctionHandler } from '@remix-run/cloudflare-pages';

export const onRequest: PagesFunction = async (context) => {
  // 🚨 CORREÇÃO: Tentando importar 'index.js', que é o nome de build mais comum no Cloudflare Pages.
  const serverBuild = (await import('./index.js')) as unknown as ServerBuild;

  const handler = createPagesFunctionHandler({
    build: serverBuild,
    // Se você tiver contexto customizado, descomente e ajuste:
    // getLoadContext: (context) => ({ env: context.env }), 
  });

  return handler(context);
};
