import { hydrate } from 'emotion'

const ids = window.$emotionSSRIds

if (ids) {
  hydrate(ids)
}
