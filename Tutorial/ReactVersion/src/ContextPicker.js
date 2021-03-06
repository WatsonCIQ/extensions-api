import React, { useEffect, useState } from 'react'
/* global fdc3 */
function ContextPicker() {
  const [context, setContext] = useState("")

  useEffect(() => {
    console.log(fdc3);
    const listener = fdc3.addContextListener(context => {
      setContext(context.id.ticker)
    })
    return () => {
      listener.unsubscribe()
    }
  })

  return (
    <div>
      <h4>Context</h4>
      {context}
      {/* <h4>Intent</h4>
      <button onClick={ }>raiseIntent</button>
      <select>
        <option value="ViewChart"></option>
        <option value="ViewAnalysis"></option>
      </select> */}
    </div>
  )
}

export default ContextPicker
