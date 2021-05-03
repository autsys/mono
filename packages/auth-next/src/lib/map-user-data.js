"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapUserData = void 0;
exports.mapUserData = async (user) => {
    const { uid, email, photoURL, displayName } = user;
    const token = await user.getIdToken(true);
    return {
        uid,
        email,
        displayName,
        photoURL,
        token,
    };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwLXVzZXItZGF0YS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1hcC11c2VyLWRhdGEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBVWEsUUFBQSxXQUFXLEdBQUcsS0FBSyxFQUFFLElBQW1CLEVBQWlCLEVBQUU7SUFDdEUsTUFBTSxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLFdBQVcsRUFBRSxHQUFHLElBQUksQ0FBQztJQUNuRCxNQUFNLEtBQUssR0FBRyxNQUFNLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDMUMsT0FBTztRQUNMLEdBQUc7UUFDSCxLQUFLO1FBQ0wsV0FBVztRQUNYLFFBQVE7UUFDUixLQUFLO0tBQ04sQ0FBQztBQUNKLENBQUMsQ0FBQyJ9