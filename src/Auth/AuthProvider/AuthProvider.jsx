import { createContext, useEffect, useState } from "react";
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { auth } from "../Firebase";
import useAxiosPublic from "../../Hooks/BaseUrl/useAxiosPublic";


export const AuthContext = createContext(null);
const AuthProvider = ({ children }) => {
    const axiosPublic = useAxiosPublic();
    const [user, setUser] = useState(null);
    const [isLoading, setLoading] = useState(true)

    const provider = new GoogleAuthProvider()
    const googleSignIn = () => {
        setLoading(true)
        return signInWithPopup(auth, provider);
    }
    const logOut = () => {
        setLoading(true)
        return signOut(auth)
    }
    useEffect(() => {
        const unsubsCribe = onAuthStateChanged(auth, (currentUser) => {
            console.log(currentUser)
            if (currentUser) {
                const userInfo = { email: currentUser.email };
                axiosPublic.post('/jwt', userInfo)
                    .then(res => {
                        if (res.data.token) {
                            localStorage.setItem('access-token', res.data.token);
                            setLoading(false)

                        }
                    })
            } else {
                localStorage.removeItem('access-token')
                setLoading(false)

            }

            setUser(currentUser)

        })
        return () => {
            return unsubsCribe();
        }

    }, [axiosPublic])
    const authInfo = { logOut, user, isLoading, googleSignIn };
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;