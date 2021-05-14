import admin from "firebase-admin";
import { https } from "firebase-functions";

/**
 * Lookup a user email and return the result
 * https://firebase.google.com/docs/auth/admin/manage-users#retrieve_user_data
 * @param admin initialized firebase-admin instance
 * @param email user email to lookup
 * @param success function to call on success
 * @param failure function to call on error
 * @returns {Promise}
 */
function getUserByEmail(admin: admin.app.App, email: string) {
  return admin
    .auth()
    .getUserByEmail(email)
    .then(handleSuccess)
    .catch(handleError);
}

/**
 * Check request to make sure the required information is present
 * @param  data sent from client with request
 * @returns data or error if invalid request
 */
export const validate = async (data: {
  email: string;
}): Promise<{ email: string }> => {
  let errMsg;
  const email = data && data.email;
  if (!email) {
    errMsg = "Missing email.";
    throw new https.HttpsError("failed-precondition", errMsg);
  }
  return data;
};

export default async function (
  admin: admin.app.App,
  data: { email: string }
  // eslint-disable-next-line @typescript-eslint/ban-types
): Promise<object> {
  const { email } = await validate(data);
  return await getUserByEmail(admin, email);
}

const handleSuccess = (userRecord: admin.auth.UserRecord) => {
  // See the UserRecord reference doc for the contents of userRecord.
  const json = userRecord.toJSON();
  return json;
};
/**
 * https://firebase.google.com/docs/reference/functions/providers_https_#functions-error-code
 */
const handleError = (error: Error) => {
  console.error(error);
  throw new https.HttpsError("not-found", "Email not found.");
};
