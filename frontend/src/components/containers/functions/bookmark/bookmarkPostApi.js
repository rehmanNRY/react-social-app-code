const bookmarkPostApi = async (postId) => {
   try {
      // Api call
      const host = "http://localhost:5000";
      const url = `${host}/api/post/bookmark`;
      const auth_token = localStorage.authToken;
      const response = await fetch(url, {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
            "auth-token": auth_token
         },
         body: JSON.stringify({ postId }),
      });
      const json = await response.json();
      return json;
   } catch (error) {
      console.log("Some error occured");
   }
}
module.exports = bookmarkPostApi;