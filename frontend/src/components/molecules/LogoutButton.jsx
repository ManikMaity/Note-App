import React from 'react'
import { Button } from '../ui/button'
import useLogout from '@/hooks/user/useLogout'

function LogoutButton() {

    const {logoutFn} = useLogout();

  return (
    <Button variant="destructive" className="w-full" onClick={logoutFn}>
      Logout
    </Button>
  )
}

export default LogoutButton
