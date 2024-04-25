const getAllUsersApi = async () => {
   try {
      const host = "http://localhost:5000";
      const url = `${host}/api/auth/allusers`;
      const response = await fetch(url, {
         method: "GET",
         headers: {
            "Content-Type": "application/json"
         }
      });
      const json = await response.json();
      return json;
   } catch (error) {
      console.log("Some error occurred");
   }
};

export default getAllUsersApi;