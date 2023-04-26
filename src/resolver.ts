import axios from 'axios'
import { DIDDocument, DIDResolutionResult, DIDResolver, ParsedDID } from 'did-resolver'

export function getResolver(): Record<string, DIDResolver> {
  async function resolve(did: string, parsed: ParsedDID): Promise<DIDResolutionResult> {
    let err = null
    let url = `https://plc.directory/${encodeURIComponent(did)}`

    const didDocumentMetadata = {}
    let didDocument: DIDDocument | null = null

    do {
      try {
        didDocument = (await axios.get(url)).data
      } catch (error) {
        err = `resolver_error: '"https://plc.directory/" + DID' must resolve to a valid https URL containing a JSON document: ${error}`
        break
      }

      // TODO: this excludes the use of query params
      const docIdMatchesDid = didDocument?.id === did
      if (!docIdMatchesDid) {
        err = 'resolver_error: DID document id does not match requested did'
        // break // uncomment this when adding more checks
      }
      // eslint-disable-next-line no-constant-condition
    } while (false)

    const contentType =
      typeof didDocument?.['@context'] !== 'undefined' ? 'application/did+ld+json' : 'application/did+json'

    if (err) {
      return {
        didDocument,
        didDocumentMetadata,
        didResolutionMetadata: {
          error: 'notFound',
          message: err,
        },
      }
    } else {
      return {
        didDocument,
        didDocumentMetadata,
        didResolutionMetadata: { contentType },
      }
    }
  }

  return { plc: resolve }
}
