import type { ServerBuild } from '@remix-run/cloudflare';
import { createPagesFunctionHandler } from '@remix-run/cloudflare-pages';

// ⚠️ CORREÇÃO AQUI: Importe o ServerBuild diretamente usando o nome do módulo "virtual"
// O Vite/Remix garante que este módulo seja a sua build do servidor.
// Se você está no Pages, este é o caminho mais robusto.
import * as build from 'virtual:remix/server-build';

export const onRequest: PagesFunction = async (context) => {
  // Use 'build' (importado acima) diretamente, ele já é do tipo ServerBuild.
  // Não precisa do 'await import' dinâmico, pois o Pages Functions/Vite já trata disso.
  const serverBuild = build as unknown as ServerBuild;

  const handler = createPagesFunctionHandler({
    build: serverBuild,
  });

  return handler(context);
};
