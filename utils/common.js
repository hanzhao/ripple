import crypto from 'crypto'

export function sha256x2(string) {
  let hash = crypto.createHash('sha256').update(string).digest('base64')
  hash = crypto.createHash('sha256').update(hash).digest('base64')
  return hash
}
