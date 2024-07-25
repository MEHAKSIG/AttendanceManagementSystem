
import { createContext } from "react";

export interface AuthProvider {
    isAuthenticated?: boolean,
    onAuthenticationSuccess?: (isSuccess: boolean, userRole?: string) => void
}
const provider: AuthProvider = {
    isAuthenticated: false
}

export const AuthContext = createContext(provider);

export default AuthContext;
