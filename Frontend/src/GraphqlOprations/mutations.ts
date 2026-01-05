export const SIGNUP_MUTATION = `
  mutation Signup($input: SignupInput!) {
    signup(input: $input) {
      id
      firstName
      surname
      email
    }
  }
`;

export const LOGIN_MUTATION = `
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        firstName
        surname
        email
      }
    }
  }
`;

export const LOGOUT_MUTATION = `
  mutation Logout {
    logout
  }
`;

export const CREATE_POST_MUTATION = `
  mutation CreatePost($input: CreatePostInput!) {
    createPost(input: $input) {
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
