# ttc-client server setup (one-time)

Assumes shared Docker, `web` network and Caddy are up (`DEPLOY.md` section 4).
Deploy `ttc-api` first: the client proxies `/api/*` to it.

1. `mkdir -p /var/www/ttc/ttc-client`
2. DNS: A record for `v2.tesolteflcouncil.com` to the box **before** reloading Caddy.
3. Append `deploy/Caddyfile.snippet` to `~/infra/Caddyfile`, then:
   ```bash
   cd ~/infra && docker compose exec caddy caddy reload --config /etc/caddy/Caddyfile
   ```
4. GitHub repo `ttc-client` -> Settings -> Secrets and variables -> Actions:
   - Secrets: `CONTABO_HOST`, `CONTABO_USER`, `CONTABO_SSH_KEY`, optional `CONTABO_PORT`
   - Variables:
     - `API_URL` = `https://api-v2.tesolteflcouncil.com` (Nest API; baked into Next rewrites at build)
     - `NEXT_PUBLIC_SITE_URL` = `https://v2.tesolteflcouncil.com`
5. Push to `main`.

No server `.env`: all config is build-time.
