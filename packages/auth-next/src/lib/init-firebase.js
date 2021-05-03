"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const app_1 = __importDefault(require("firebase/app"));
require("firebase/auth");
const config = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
};
// eslint-disable-next-line functional/no-conditional-statement
// console.log('[Firebase] - initializing with config: ', config);
exports.app = !app_1.default.apps.length && app_1.default.initializeApp(config);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5pdC1maXJlYmFzZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImluaXQtZmlyZWJhc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsdURBQW9DO0FBQ3BDLHlCQUF1QjtBQUV2QixNQUFNLE1BQU0sR0FBRztJQUNiLE1BQU0sRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLG1DQUFtQztJQUN2RCxVQUFVLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQ0FBZ0M7SUFDeEQsV0FBVyxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsaUNBQWlDO0lBQzFELFNBQVMsRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLCtCQUErQjtJQUN0RCxhQUFhLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQ0FBbUM7Q0FDL0QsQ0FBQztBQUVGLCtEQUErRDtBQUMvRCxrRUFBa0U7QUFDckQsUUFBQSxHQUFHLEdBQUcsQ0FBQyxhQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sSUFBSSxhQUFRLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDIn0=