import './App.css'
import { useState } from 'react'
import { Resolver } from 'did-resolver'
import { getResolver } from 'plc-did-resolver'

const webDidResolver = getResolver()
const didResolver = new Resolver(webDidResolver)
function App() {
  const [did, setDid] = useState('did:plc:wuyiqd25zhsut5a2gc46iqoi')
  const [resolved, setResolved] = useState()
  const [resolvedData, setResolvedData] = useState()
  return (
    <div className="App">
      <label>DID:</label>
      <input
        type="text"
        value={did}
        onChange={(event) => {
          setDid(event.target.value)
        }}
      />
      <button
        className="App-button"
        type="submit"
        onClick={() => {
          didResolver
            .resolve(did)
            .then((res) => {
              console.log('resolved data', res)
              setResolved(true)
              setResolvedData(res)
            })
            .catch((err) => {
              console.error('failed to resolve', err)
              setResolved(false)
              setResolvedData(undefined)
            })
        }}
      >
        resolve
      </button>
      <p>
        {resolved === true && <span>resolved {did}</span>}
        {resolvedData && <p>{JSON.stringify(resolvedData)}</p>}
        {resolved === false && `failed to resolve ${did}`}
      </p>
    </div>
  )
}

export default App
