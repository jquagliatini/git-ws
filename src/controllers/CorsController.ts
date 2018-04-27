import { Request, Response, Next } from 'restify';

function addCors(req: Request, res: Response, next: Next): void {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Credentials', 'true');
  // According to https://fetch.spec.whatwg.org/#forbidden-header-name
  const forbiddenAjaxHeaders = [
    'accept-charset',
    'accept-encoding',
    'access-control-request-headers',
    'access-control-request-method',
    'connection',
    'content-length',
    'cookie',
    'cookie2',
    'date',
    'dnt',
    'expect',
    'host',
    'keep-alive',
    'origin',
    'referer',
    'te',
    'trailer',
    'transfer-encoding',
    'upgrade',
    'via',
    // these are not in the spec
    'user-agent',
    'accept',
  ];
  const forbiddenStartsWithHeader = ['proxy-', 'sec-'];
  const headers = req.rawHeaders
    .filter((_, i) => i % 2 === 0)
    .map((h) => h.toLowerCase())
    .concat((req.header('access-control-request-headers') || '').split(','))
    .filter(Boolean)
    .filter((header) => !forbiddenAjaxHeaders.some((h) => h === header))
    .filter(
      (header) => !forbiddenStartsWithHeader.some((h) => header.startsWith(h)),
    );
  if (headers.length > 0) {
    res.header('Access-Control-Allow-Headers', headers.join(','));
  }

  return next();
}

export { addCors };
