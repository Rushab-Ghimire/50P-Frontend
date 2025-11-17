// UserQueries.js
import { PER_PAGE } from "@app/_utilities/constants/paths";

// LIST Users with search + pagination
export const GET_USERS = (search = "", page = 1) => `
{
  allUsers(search: "${search}", skip: ${(page - 1) * PER_PAGE}, first: ${PER_PAGE}) {
    totalRows
    rows {
      id
      courseId
      firstName
      lastName
      subscriptionId
      uniqueId
      profilePic
    }
  }
}
`;

// Single user (fetch all then filter in frontend)
export const GET_USER = () => `
{
  allUsers {
    rows {
      id
      courseId
      firstName
      lastName
      subscriptionId
      uniqueId
      profilePic
    }
  }
}
`;

// CREATE user
export const createUser = (data) => `
mutation {
  addUser(
    courseId: ${data.courseId},
    firstName: "${data.firstName}",
    lastName: "${data.lastName}",
    subscriptionId: ${data.subscriptionId},
    profilePic: "${data.profilePic || ""}"
  ) {
    user {
      id
      firstName
      lastName
    }
  }
}
`;

// UPDATE user
export const updateUser = (data) => `
mutation {
  updateUser(
    id: ${data.id},
    courseId: ${data.courseId},
    firstName: "${data.firstName}",
    lastName: "${data.lastName}",
    subscriptionId: ${data.subscriptionId},
    profilePic: "${data.profilePic || ""}"
  ) {
    user {
      id
      firstName
      lastName
    }
  }
}
`;

// DELETE user
export const deleteUser = (id) => `
mutation {
  deleteUser(id: ${id}) {
    ok
  }
}
`;
