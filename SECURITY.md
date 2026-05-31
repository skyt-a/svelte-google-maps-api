# Security Policy

## Supported Versions

Security fixes target the latest published version of `svelte-google-maps-api`.

## Reporting a Vulnerability

Please report suspected vulnerabilities privately by opening a GitHub security advisory for this repository when available, or by contacting the repository owner directly.

Do not open a public issue for a vulnerability until a fix or mitigation is available.

## API Key Guidance

Google Maps browser API keys are public credentials. Restrict them in Google Cloud Console by HTTP referrer and enable only the APIs required by your application.

Never commit unrestricted API keys, npm tokens, service account keys, or other secrets to this repository.
