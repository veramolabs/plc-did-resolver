import { Resolver, Resolvable } from 'did-resolver'
import { getResolver } from '../resolver'

describe('plc did resolver', () => {
  const did: string = 'did:plc:wuyiqd25zhsut5a2gc46iqoi'
  const badDid: string = 'did:plc:fakefakefake'

  let didResolver: Resolvable

  beforeAll(async () => {
    didResolver = new Resolver(getResolver())
  })

  it('resolves document', async () => {
    expect.assertions(2)
    const result = await didResolver.resolve(did)
    expect(result.didDocument?.service![0].type).toEqual('AtprotoPersonalDataServer')
    expect(result.didResolutionMetadata.contentType).toEqual('application/did+ld+json')
  })

  it('fails to resolve document', async () => {
    expect.assertions(2)
    const result = await didResolver.resolve(badDid)
    expect(result.didDocument).toBeNull()
    expect(result.didResolutionMetadata.error).toEqual('notFound')
  })
})
