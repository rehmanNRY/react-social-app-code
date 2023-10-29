const publishPostApi = async (description)=>{
   try {
      // Api call
      const host = "http://localhost:5000";
      const url = `${host}/api/post/newpost`;
      const auth_token = localStorage.authToken;
      const likes = [];
      const date = new Date();
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": auth_token
        },
        body: JSON.stringify({ description, likes, date }),
      });
      const json = await response.json();
      return json;
   } catch (error) {
      console.log("Some error occured");
   }
}
module.exports = publishPostApi;