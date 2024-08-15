import React, { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  CContainer,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CHeader,
  CHeaderNav,
  CHeaderToggler,
  CNavLink,
  CNavItem,
  useColorModes,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
  cilBell,
  cilContrast,
  cilEnvelopeOpen,
  cilList,
  cilMenu,
  cilMoon,
  cilSun,
} from '@coreui/icons'

import { AppHeaderDropdown } from './header/index'

const AppHeader = () => {
  const headerRef = useRef()
  const { colorMode, setColorMode } = useColorModes('coreui-free-react-admin-template-theme')

  const dispatch = useDispatch()
  const sidebarShow = useSelector((state) => state.sidebarShow)

  const [role, setRole] = useState([])
  const user = JSON.parse(localStorage.getItem('user'))
  useEffect(() => {
    document.addEventListener('scroll', () => {
      headerRef.current &&
        headerRef.current.classList.toggle('shadow-sm', document.documentElement.scrollTop > 0)
    })

    // Fetch user role
    
    if (user?.email) {
      fetch(`${process.env.REACT_APP_API_BASE_URL}/role/${user.email}`)
        .then((res) => res.json())
        .then((data) => setRole(data.data))
        .catch((error) => console.error('Error fetching role:', error))
    }
  }, [])

  const navigate = useNavigate()

  const handleDashboard = (event) => {
    const selectedRole = role.find((item) => item.role === event.target.value)

    if (selectedRole) {
      localStorage.removeItem("user")
      localStorage.setItem("user", JSON.stringify(selectedRole))


      if (selectedRole.role === 'admin Officer') {
        navigate('/admin-officer/dashboard')
      }
      if (selectedRole.role === 'Counselor') {
        navigate('/counselor/dashboard')
      }
      if (selectedRole.role === "Super Admin") {
        navigate('/super-admin/dashboard')
      }
      if (selectedRole.role === "receptionist") {
        navigate('/receptionist/dashboard')
      }
      if (selectedRole.role === "Admin Office Visa Section") {
        navigate('/visa-process/dashboard')
      }
    }
  }

  return (
    <CHeader position="sticky" className="mb-4 p-0" ref={headerRef}>

      <CContainer className="border-bottom px-4" fluid>
        <CHeaderToggler
          onClick={() => dispatch({ type: 'set', sidebarShow: !sidebarShow })}
          style={{ marginInlineStart: '-14px' }}
        >
          <CIcon icon={cilMenu} size="lg" />
        </CHeaderToggler>
        <CHeaderNav className="d-none d-md-flex">
          <li className="nav-item py-1">
            <div className="vr h-100 mx-2 text-body text-opacity-75"></div>
          </li>
          <CNavItem>
            <div className='d-flex align-items-center'>
              <label className='me-2'>Role: </label>
              <select onChange={handleDashboard}>
                <option value="" disabled selected>{user ? user.role : "Select your role"}</option>
                {role.map((item) => (
                  <option className='text-uppercase' key={item.role} value={item.role}>
                    {item.role}
                  </option>
                ))}
              </select>
            </div>
          </CNavItem>
          <li className="nav-item py-1">
            <div className="vr h-100 mx-2 text-body text-opacity-75"></div>
          </li>
        </CHeaderNav>

        <CHeaderNav>

          <li className="nav-item py-1">
            <div className="vr h-100 mx-2 text-body text-opacity-75"></div>
          </li>
          <CDropdown variant="nav-item" placement="bottom-end">
            <CDropdownToggle caret={false}>
              {colorMode === 'dark' ? (
                <CIcon icon={cilMoon} size="lg" />
              ) : colorMode === 'auto' ? (
                <CIcon icon={cilContrast} size="lg" />
              ) : (
                <CIcon icon={cilSun} size="lg" />
              )}
            </CDropdownToggle>
            <CDropdownMenu>
              <CDropdownItem
                active={colorMode === 'light'}
                className="d-flex align-items-center"
                as="button"
                type="button"
                onClick={() => setColorMode('light')}
              >
                <CIcon className="me-2" icon={cilSun} size="lg" /> Light
              </CDropdownItem>
              <CDropdownItem
                active={colorMode === 'dark'}
                className="d-flex align-items-center"
                as="button"
                type="button"
                onClick={() => setColorMode('dark')}
              >
                <CIcon className="me-2" icon={cilMoon} size="lg" /> Dark
              </CDropdownItem>
              <CDropdownItem
                active={colorMode === 'auto'}
                className="d-flex align-items-center"
                as="button"
                type="button"
                onClick={() => setColorMode('auto')}
              >
                <CIcon className="me-2" icon={cilContrast} size="lg" /> Auto
              </CDropdownItem>
            </CDropdownMenu>
          </CDropdown>



          <li className="nav-item py-1">
            <div className="vr h-100 mx-2 text-body text-opacity-75"></div>
          </li>
          <AppHeaderDropdown />
        </CHeaderNav>
      </CContainer>
    </CHeader>
  )
}

export default AppHeader
