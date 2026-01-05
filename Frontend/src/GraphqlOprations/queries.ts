


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
    }
  }
`;