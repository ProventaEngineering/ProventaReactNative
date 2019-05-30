import client from "./client";

export const getErrorMessage = error => {
  let errorMessage = "";
  if (error.response) {
    const {
      response: {
        data: { message },
      },
    } = error;
    errorMessage = message;
  } else if (error.text) {
    errorMessage = error.text;
  } else {
    errorMessage = error.message || error || "Something went wrong!";
  }
  return errorMessage;
};

export const authLinkedIn = ({ code, client_id, redirect_uri }) => {
  console.log("authLinkedIn", { code, client_id, redirect_uri });
  return client.get("/auth/linkedin", {
    params: {
      code,
      client_id,
      redirect_uri,
    },
  });
};
export const getLinkedInProfile = async accessToken => {
  console.log({ accessToken });
  const headers = { Authorization: `Bearer ${accessToken}` };
  const profileResult = await client.get("https://api.linkedin.com/v2/me", { headers });
  const { id, localizedFirstName: firstName, localizedLastName: lastName } = profileResult.data;
  const primaryContactResult = await client.get(
    "https://api.linkedin.com/v2/clientAwareMemberHandles?q=members&projection=(elements*(primary,type,handle~))",
    { headers },
  );
  const primaryContacts = primaryContactResult.data;
  const email = primaryContacts[0]["handle~"].emailAddress;
  return {
    id,
    firstName,
    lastName,
    email,
  };
};
