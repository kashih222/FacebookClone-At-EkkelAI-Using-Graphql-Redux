


export const ME_QUERY = `
  query Me {
    me {
      id
      firstName
      surname
      email
    }
  }
`;

export const GET_ALL_POSTS_QUERY = `
  query Posts {
    posts {
      id
      content
      imageUrl
      imageUrls
      author {
        id
        firstName
        surname
        email
      }
      createdAt
      comments {
        id
        content
        createdAt
        author {
          id
          firstName
          surname
          email
        }
      }
      reactions {
        type
        createdAt
        user { id }
      }
      reactionSummary {
        like
        love
        haha
        wow
        sad
        angry
      }
    }
  }
`;

export const GET_MY_POSTS_QUERY = `
  query MyPosts {
    myPosts {
      id
      content
      imageUrl
      imageUrls
      author {
        id
        firstName
        surname
        email
      }
      createdAt
      comments {
        id
        content
        createdAt
        author {
          id
          firstName
          surname
          email
        }
      }
      reactions {
        type
        createdAt
        user { id }
      }
      reactionSummary {
        like
        love
        haha
        wow
        sad
        angry
      }
    }
  }
`;

export const GET_USERS_QUERY = `
  query Users {
    users {
      id
      firstName
      surname
      email
    }
  }
`;

export const GET_MY_FRIENDS_QUERY = `
  query MyFriends {
    myFriends {
      id
      firstName
      surname
      email
    }
  }
`;

export const GET_FRIEND_SUGGESTIONS_QUERY = `
  query FriendSuggestions {
    friendSuggestions {
      id
      firstName
      surname
      email
    }
  }
`;

export const GET_FRIEND_REQUESTS_QUERY = `
  query FriendRequests {
    friendRequests {
      id
      from {
        id
        firstName
        surname
        email
        dob
        gender
        createdAt
      }
      status
      createdAt
    }
  }
`;
