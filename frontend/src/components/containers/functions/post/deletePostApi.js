const deletePostApi = async (id) => {
  try {
    // Api call
    const host = "http://localhost:5000";
    const url = `${host}/api/post/deletepost`;
    const auth_token = localStorage.authToken;
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": auth_token
      },
      body: JSON.stringify({ id }),
    });
    const json = await response.json();
    return json;
  } catch (error) {
    console.log("Some error occured");
  }
}
module.exports = deletePostApi;