[![npm](https://img.shields.io/npm/dt/plc-did-resolver.svg)](https://www.npmjs.com/package/plc-did-resolver)
[![npm](https://img.shields.io/npm/v/plc-did-resolver.svg)](https://www.npmjs.com/package/plc-did-resolver)
[![codecov](https://codecov.io/gh/veramolabs/plc-did-resolver/branch/develop/graph/badge.svg)](https://codecov.io/gh/veramolabs/plc-did-resolver)

# Plc DID Resolver

This library is intended to resolve [PLC DIDs](https://atproto.com/specs/did-plc) 
and retrieve an associated [DID Document](https://w3c.github.io/did-core/#did-document-properties)
from the "PLC Directory"


It requires the `did-resolver` library, which is the primary interface for resolving DIDs.


This DID Method is not considered "decentralized" at all, and will likely be replaced in the future.

## DID Document

The DID resolver takes the DID and retrieves a document from the PLC Directory associated with that DID.

A minimal DID Document might contain the following information:

```json
{
 		"@context": ["https://www.w3.org/ns/did/v1", "https://w3id.org/security/suites/secp256k1-2019/v1"],
 		"id": "did:plc:wuyiqd25zhsut5a2gc46iqoi",
 		"alsoKnownAs": ["at://okaynick.bsky.social"],
 		"verificationMethod": [{
 			"id": "#atproto",
 			"type": "EcdsaSecp256k1VerificationKey2019",
 			"controller": "did:plc:wuyiqd25zhsut5a2gc46iqoi",
 			"publicKeyMultibase": "zQYEBzXeuTM9UR3rfvNag6L3RNAs5pQZyYPsomTsgQhsxLdEgCrPTLgFna8yqCnxPpNT7DBk6Ym3dgPKNu86vt9GR"
 		}],
 		"service": [{
 			"id": "#atproto_pds",
 			"type": "AtprotoPersonalDataServer",
 			"serviceEndpoint": "https://bsky.social"
 		}]
 	}
```

## Resolving a DID document

The resolver presents a simple `resolver()` function that returns a ES6 Promise returning the DID document.

```js
import { Resolver } from 'did-resolver'
import { getResolver } from 'plc-did-resolver'

const plcResolver = getResolver()

const didResolver = new Resolver({
    ...plcResolver
    //...you can flatten multiple resolver methods into the Resolver
})

didResolver.resolve('did:plc:wuyiqd25zhsut5a2gc46iqoi').then(doc => console.log(doc))

// You can also use ES7 async/await syntax
;(async () => {
    const doc = await didResolver.resolve('did:plc:wuyiqd25zhsut5a2gc46iqoi')
    console.log(doc)
})();
```
