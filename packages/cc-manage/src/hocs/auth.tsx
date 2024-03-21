import { Navigate, Outlet } from 'umi'
 
function loginAuth (Component: any) {

  return (props: any) => {
    const token = localStorage.getItem('token');
    if (token) {
      return <Outlet />;
    } else {
      return <Navigate to="/login" />;
    }
  }
}

export default loginAuth