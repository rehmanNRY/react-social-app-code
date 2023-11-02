const likePostApi = async (id) => {
   try {
      // Api call
      const host = "http://localhost:5000";
      const url = `${host}/api/post/like`;
      const auth_token = localStorage.authToken;
      const response = await fetch(url, {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
            "auth-token": auth_token
         },
         body: JSON.stringify({ id }),
      });
      const json = await response.json();
      return json;
   } catch (error) {
      console.log("Some error occured")
   }
}
module.exports = likePostApi;