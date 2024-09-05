import React from 'react'
import { MDBContainer,MDBRow,MDBCol } from 'mdb-react-ui-kit'
import "../Customcss/section.css"
const Section = () => {
  return (
    <div>
      <MDBContainer fluid>
        <MDBRow className='bg-color'>
            <MDBCol size='12' lg='6' >
                <MDBContainer className='p-2'>
                   <MDBRow style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                      <MDBCol size='12' lg='3' className='p-2'>
                        <h1 className='fs-1'>1 #</h1>
                      </MDBCol>
                      <MDBCol size='12' lg='9' className='p-2'>
                        <h1 className='fs-1 text-center'>Nepal's First Business Directory</h1>
                      </MDBCol>
                    </MDBRow>
                    
                </MDBContainer>
            </MDBCol>
            <MDBCol lg='6' >
                  <MDBRow>
                      <MDBCol size='4'className='p-2'>
                        <h1 className='fs-1'>2 #</h1>
                      </MDBCol>
                      <MDBCol size='4'className='p-2'>
                        <h1 className='fs-1 text-center'>2 #</h1>
                      </MDBCol>
                      <MDBCol size='4' className='p-2'>
                        <h1 className='fs-1 text-center'>2 #</h1>
                      </MDBCol>
                  </MDBRow>
            </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  )
}

export default Section
