import { useSelector } from "react-redux"
import {jwtDecode} from "jwt-decode"
import { useDebounce } from "primereact/hooks"
const userAuth = () => {
   const token = localStorage.getItem('token')
   let isEdmit = false
   let isUser = false
   if (token) {
      const userDecode = jwtDecode(token)
      console.log("userDecode", userDecode);
      const {_id, identity, name, address, email, phone, active, role } = userDecode
      isEdmit = role === "edmit"
      isUser = role === "user"
      return {_id, identity, name, address, email, phone, active, role }

   }
   return { _id: "", identity:"", name:"", address:"", email:"", phone:"", active:"", role:"" }

}
export default userAuth