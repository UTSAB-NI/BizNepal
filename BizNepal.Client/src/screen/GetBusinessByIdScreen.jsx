import React from 'react'
import { useParams } from 'react-router-dom'
const GetBusinessByIdScreen = () => {

  const businessid = useParams();
  return (
    <div>
       this is <span className='fs-2'>Get Business </span>screen by id = {businessid.id}
    </div>
  )
}

export default GetBusinessByIdScreen
