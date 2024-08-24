/* eslint-disable prettier/prettier */
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
// import {LogOut} from '../utilities/utilities'
import {
  CCloseButton,
  CSidebar,
  CSidebarBrand,
  CSidebarFooter,
  CSidebarHeader,
  CSidebarToggler,
} from '@coreui/react';

import { AppSidebarNav } from './AppSidebarNav'

import logo from 'src/assets/images/logo.png'

// sidebar nav config
import navigation from '../_nav'


const AppSidebar = () => {
  const dispatch = useDispatch()
  const unfoldable = useSelector((state) => state.sidebarUnfoldable)
  const sidebarShow = useSelector((state) => state.sidebarShow)
  // const navigate = useNavigate()
  // const logOut = () => {
  //   localStorage.removeItem("user")
  //   navigate('/login')
  // }

  return (
    <CSidebar
      className="border-end"
      colorScheme="light"
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        dispatch({ type: 'set', sidebarShow: visible })
      }}
    >
      <CSidebarHeader className="border-bottom">
        <CSidebarBrand to="/">
          <img src={logo} alt="" style={{ height: "90px", width: "155px", borderRadius: "15px", padding: "10px 0px 10px 0px" }} />
        </CSidebarBrand>
        <CCloseButton
          className="d-lg-none fw-bolder fs-3 text-warning border-5 rounded-circle border-warning"
          onClick={() => dispatch({ type: 'set', sidebarShow: false })}
        > X </CCloseButton>
      </CSidebarHeader>
      <AppSidebarNav items={navigation} />
      {/* <CSidebarFooter className="border-top d-none d-lg-flex">
        <CSidebarToggler><h5 className='text-center' onClick={logOut}>LogOut</h5></CSidebarToggler>
      </CSidebarFooter> */}
    </CSidebar>
  )
}

export default React.memo(AppSidebar)
