
// eslint-disable-next-line react/prop-types
function AuthLayout({children}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-200 p-3">
      {children}
    </div>
  )
}

export default AuthLayout
