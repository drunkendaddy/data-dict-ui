const AuthService = {

    saveUserDetails: (user) => {
        localStorage.setItem("userDetails", JSON.stringify(user));
    },

    getToken: () => {
        const user =  localStorage.getItem("userDetails");
        if (!user)
            return null;
        return JSON.parse(user).token;
    },

    getUser: () => {
        const user =  localStorage.getItem("userDetails");
        if (!user)
            return null;
        return JSON.parse(user);
    },

    removeUserDetails: () => {
        localStorage.clear();
    }

};

export default AuthService;

