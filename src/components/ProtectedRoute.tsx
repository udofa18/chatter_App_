import {Navigate} from 'react-router-dom'
import { ReactNode } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
// import authUser from '../pages/Login';
import{ auth} from '../firebase/auth';

interface ProtectedRouteProps {
    children: ReactNode;
  }
  

function ProtectedRoute({ children }: ProtectedRouteProps) {
    const [user] = useAuthState(auth);
    

    if (!user) { 
        return <Navigate to={'/login'} />;
      } 
    
    return <>{children}</>;

   
 
  }

  


  
  export default ProtectedRoute;