// Send friend request
export const sendFriendRequest = async (receiverId) => {
  try {
    const response = await fetch('/api/friends/sendRequest', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
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
    const response = await fetch('/api/friends/acceptRequest', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
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
    const response = await fetch('/api/friends/deleteRequest', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
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
    const response = await fetch('/api/friends/sentRequests');
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
    const response = await fetch('/api/friends/receivedRequests');
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error);
    }
    return data;
  } catch (error) {
    throw error.message;
  }
};