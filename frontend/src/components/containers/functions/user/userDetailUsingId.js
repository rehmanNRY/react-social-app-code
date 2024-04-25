const userDetailUsingId = async (userId) => {
  try {
     // Api call
     const host = "http://localhost:5000";
     const url = `${host}/api/auth/userdetail`;
     const response = await fetch(url, {
        method: "POST",
        headers: {
           "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
     });
     const json = await response.json();
     return json;
  } catch (error) {
     console.log("Some error occured");
  }
}
export default userDetailUsingId;