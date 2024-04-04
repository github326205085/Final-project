// import React, {useRef,useEffect} from 'react';
// import '../../CSS/loginRgister.css'

// import { Link, useNavigate } from 'react-router-dom';
// import { useRegisterMutation } from './authApiSlice'

// const Register = () => {

//     const name = useRef("")
//     const identity = useRef("")
//     const password = useRef("")
//     const email = useRef("")
//     const phone = useRef("")
//     const address = useRef("")
//     const navigate = useNavigate()
//     useEffect(() => {
//         if (isSuccess) {
//             navigate("/")
//         }
//     }, [isSuccess])
//     const handleSubmit = (formData) => {     
//         console.log(formData);
//         registerFunc(formData)
//         };
//     return (
//         <>

//             <header>
//                 <h1 class="heading">GeeksforGeeks</h1>
//                 <h3 class="title">Sliding Login & Registration Form</h3>
//             </header>

//             {/* // container div   */}
//             <div class="container">

//                 {/* // upper button section to select the login or signup form  */}
//                 <div class="slider"></div>
//                 <div class="btn">
//                     <button class="login" ><Link to={'/login'} >Login</Link></button>
//                     <button class="clkbtn"><Link to={'/register'} >Register</Link></button>
//                 </div>
//                 <div class="signup-box">
//                     <input type="text"
//                         class="name ele"
//                         placeholder="Enter your identity"
//                         onChange={e => identity.current = e.target.value} />
//                     <input type="text"
//                         class="name ele"
//                         placeholder="Enter your name" 
//                         onChange={e => name.current = e.target.value} />
                
//                     <input type="password"
//                         class="password ele"
//                         placeholder="confirm password" 
//                         onChange={e => password.current = e.target.value} />
//                     <input type="text"
//                         class="password ele"
//                         placeholder="Enter your phone" 
//                         onChange={e => phone.current = e.target.value} />
//                     <input type="email"
//                         class="email ele"
//                         placeholder="youremail@email.com" 
//                         onChange={e => email.current = e.target.value} />
//                          <input type="text"
//                         class="email ele"
//                         placeholder="Enter your address" 
//                         onChange={e => address.current = e.target.value} />
//                     <button class="clkbtn" onClick={()=>handleSubmit({identity:identity.current,name:name.current
//                         ,password:password.current,phone:phone.current,email:email.current,address:address.current})}>Register</button>
//                 </div>
//             </div>
//         </>
//     )
// }
// export default Register;
