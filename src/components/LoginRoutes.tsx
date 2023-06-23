import {Navigate} from 'react-router-dom'
import { ReactNode } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
// import authUser from '../pages/Login';
import{ auth} from '../firebase/auth';


    interface LoginRouteProps {
        children: ReactNode;
      }
      
    
    function LoginRoute({ children }: LoginRouteProps) {
        const [user] = useAuthState(auth);
        
    
        if (user) { 
            return <Navigate to={'/posts'} />;
          } 
        
        return <>{children}</>;
    
       
     
      }
    

export default LoginRoute