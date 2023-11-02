const fetchPostsApi = async () => {
   try {
      // Api call
      const host = "http://localhost:5000";
      const url = `${host}/api/post/allposts`;
      const response = await fetch(url, {
         method: "GET"
      });
      const json = await response.json();
      return json
   } catch (error) {
      console.log("Some error occured")
   }
}
module.exports = fetchPostsApi;