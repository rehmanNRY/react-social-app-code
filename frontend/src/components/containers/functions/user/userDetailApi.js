const userDetailApi = async () => {
   try {
     const host = "http://localhost:5000";
     const url = `${host}/api/auth/getuser`;
     const auth_token = localStorage.authToken;
     const response = await fetch(url, {
       method: "POST",
       headers: {
         "Content-Type": "application/json",
         "auth-token": auth_token
       }
     });
     const json = await response.json();
      return json;
   } catch (error) {
     console.log("Some error occurred");
   }
 };

 module.exports = userDetailApi;