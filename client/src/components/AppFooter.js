import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter className="px-4">
      <div>
        <a href="https://gecare.co.uk/" target="_blank" rel="noopener noreferrer">
          Education Care
        </a>
        <span className="ms-1">&copy; 2024 AnTechInnovation.</span>
      </div>
      <div className="ms-auto">
        <span className="me-1">Powered by</span>
        <a href="https://antechinno.com" target="_blank" rel="noopener noreferrer">
          AnTechInnovation
        </a>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
