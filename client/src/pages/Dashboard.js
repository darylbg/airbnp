import React from 'react'
import ListingsForm from '../components/NewListing/NewListing'

const Dashboard = () => {
  return (
    <div className='container' style={{width: '100%', justifyContent: 'center', display: 'flex' }}>

        <ListingsForm />
    </div>
  )
}

    export default Dashboard