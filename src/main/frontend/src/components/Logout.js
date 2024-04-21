import React, { useState } from 'react'

const Logout = () => {

    const logout = (e) => {
        // prevent page reload
        window.localStorage.clear();
        console.log("get userId ..." +localStorage.getItem('user_id'))
    }

  return (
    <></>
  )
}

export default Logout