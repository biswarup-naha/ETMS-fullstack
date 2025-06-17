import Navbar from "../components/Navbar"
import { useAppSelector } from "../hooks"


const UserDashboard = () => {
  const selector=useAppSelector((state)=>state.auth)
  return (
    <div>
      <Navbar />
      UserDashboard <br />
      Welcome, {selector.user?.fullName}!
    </div>
  )
}

export default UserDashboard