import { Outlet } from "umi";
import loginAuth from '@/hocs/auth';

export default loginAuth(function Info() {
  return (
    <Outlet/>
  );
})
