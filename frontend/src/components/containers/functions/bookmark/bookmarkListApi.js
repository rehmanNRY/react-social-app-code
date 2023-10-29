const bookmarkListApi = async () => {
   try {
      // Api call
      const host = "http://localhost:5000";
      const url = `${host}/api/post/bookmarked`;
      const auth_token = localStorage.authToken;
      const response = await fetch(url, {
         method: "GET",
         headers: {
            "Content-Type": "application/json",
            "auth-token": auth_token
         },
      });
      const json = await response.json();
      return json;
   } catch (error) {
      console.log("Some error occured");
   }
}
module.exports = bookmarkListApi;