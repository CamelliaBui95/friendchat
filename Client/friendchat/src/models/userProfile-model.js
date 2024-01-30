import { action, computed, thunk } from "easy-peasy";
import UserService from "../services/userServices";

const userProfileModel = {
    username: "",
    description: "",
    userInterests: null,

    setUsername: action((state, username) => {
        state.username = username;
    }),

    setDescription: action((state, description) => {
        state.description = description;
    }),

    setUserInterests: action((state, {interests, category}) => {
       state.userInterests[category] = interests;
    }),

    getUserInterests: computed((state) => {
        let interests = [];
        if(state.userInterests !== null)
            Object.values(state.userInterests).forEarch(interestArr => {
                interests = [...interests, ...interestArr];
        })

        return interests;
    })
};

export default userProfileModel;
