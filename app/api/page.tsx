'use client'

import { useEffect, useState } from 'react'
import SwaggerUI from 'swagger-ui-react'
import 'swagger-ui-react/swagger-ui.css'

export default function SwaggerDocs() {
  const [spec, setSpec] = useState(null)

  useEffect(() => {
    fetch('/api/v1/swagger')
      .then(response => response.json())
      .then(data => setSpec(data))
  }, [])

  if (!spec) {
    return <div>Loading...</div>
  }

  return <SwaggerUI spec={spec} />
}