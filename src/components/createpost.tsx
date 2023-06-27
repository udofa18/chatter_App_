import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

interface createpostProps {
    children: ReactNode;
  }
  

function createpost({ children }: createpostProps) {
    // const [user] = useAuthState(auth);
    

  
        return <Navigate to={'/createpost'} />;
      
    
    return <>{children}</>;

   
 
  }

  
export default createpost