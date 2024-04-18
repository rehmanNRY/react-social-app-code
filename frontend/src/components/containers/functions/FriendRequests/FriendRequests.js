const host = "http://localhost:5000";
// Send friend request
export const sendFriendRequest = async (receiverId) => {
  try {
    const url = `${host}/api/FriendRequests/sendRequest`;
    const auth_token = localStorage.authToken;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": auth_token
      },
      body: JSON.stringify({ receiverId }),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error);
    }
    return data;
  } catch (error) {
    throw error.message;
  }
};

// Accept friend request
export const acceptFriendRequest = async (senderId) => {
  try {
    const url = `${host}/api/FriendRequests/acceptRequest`;
    const auth_token = localStorage.authToken;
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": auth_token
      },
      body: JSON.stringify({ senderId }),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error);
    }
    return data;
  } catch (error) {
    throw error.message;
  }
};

// Delete friend request
export const deleteFriendRequest = async (senderId) => {
  try {
    const url = `${host}/api/FriendRequests/deleteRequest`;
    const auth_token = localStorage.authToken;
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": auth_token
      },
      body: JSON.stringify({ senderId }),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error);
    }
    return data;
  } catch (error) {
    throw error.message;
  }
};

// Fetch all sent friend requests
export const fetchSentRequests = async () => {
  try {
    const url = `${host}/api/FriendRequests/sentRequests`;
    const auth_token = localStorage.authToken;
    const response = await fetch(url, {
      method: "GET",
      headers: {
         "Content-Type": "application/json",
         "auth-token": auth_token
      },
   });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error);
    }
    return data;
  } catch (error) {
    throw error.message;
  }
};

// Fetch all received friend requests
export const fetchReceivedRequests = async () => {
  try {
    const url = `${host}/api/FriendRequests/receivedRequests`;
    const auth_token = localStorage.authToken;
    const response = await fetch(url, {
      method: "GET",
      headers: {
         "Content-Type": "application/json",
         "auth-token": auth_token
      },
   });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error);
    }
    return data;
  } catch (error) {
    throw error.message;
  }
};

// Fetch complete friend list
export const fetchFriendList = async () => {
  try {
    const url = `${host}/api/FriendRequests/friendList`;
    const auth_token = localStorage.authToken;
    const response = await fetch(url, {
      method: "GET",
      headers: {
         "Content-Type": "application/json",
         "auth-token": auth_token
      },
   });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error);
    }
    return data;
  } catch (error) {
    throw error.message;
  }
};