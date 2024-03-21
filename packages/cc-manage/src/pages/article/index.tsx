import { Outlet } from "umi";
import loginAuth from '@/hocs/auth';

export default loginAuth(function Article() {
  return (
    <Outlet/>
  )
})