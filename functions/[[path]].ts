import type { ServerBuild } from '@remix-run/cloudflare';
import { createPagesFunctionHandler } from '@remix-run/cloudflare-pages';

export const onRequest: PagesFunction = async (context) => {
  // ⚠️ CORREÇÃO: Usamos a importação dinâmica com o nome do arquivo final da build do servidor.
  // O Pages Functions espera que o arquivo de build do servidor esteja acessível como './server.js'
  // quando executado a partir da pasta 'functions/'.
  const serverBuild = (await import('./server.js')) as unknown as ServerBuild;

  const handler = createPagesFunctionHandler({
    build: serverBuild,
    // Se você tiver o Cloudflare KV, D1, etc. configurados, passe o contexto aqui:
    // getLoadContext: (context) => ({ env: context.env }), 
  });

  return handler(context);
};
