import { PER_PAGE } from "@app/_utilities/constants/paths";

/* ===========================
   Fetch paginated list
   =========================== */
export const GET_TEACHERS = (search = 1, page_num = 1) => `
  query {
    allTeachers(
      search: "${search}",
      skip: ${(page_num - 1) * PER_PAGE},
      first: ${PER_PAGE}
    ) {
      totalRows
      rows {
        id
        uniqueId
        firstName
        lastName
        email
        qualification
      }
    }
  }
`;

/* ===========================
   Fetch single teacher
   =========================== */
export const GET_TEACHER = (id) => `
  query {
    allTeachersById(id: ${id}) {
      id
      uniqueId
      firstName
      lastName
      email
      qualification
    }
  }
`;

/* ===========================
   Create Teacher
   =========================== */
export const createTeacher = (data) => `
  mutation {
    addTeacher(
      firstName: "${data.firstName}",
      lastName: "${data.lastName}",
      email: "${data.email}",
      qualification: "${data.qualification}"
    ) {
      teacher {
        id
        firstName
        lastName
        email
        qualification
      }
    }
  }
`;

/* ===========================
   Update Teacher
   =========================== */
export const updateTeacher = (data) => `
  mutation {
    updateTeacher(
      id: ${data.id},
      firstName: "${data.firstName}",
      lastName: "${data.lastName}",
      email: "${data.email}",
      qualification: "${data.qualification}"
    ) {
      teacher {
        id
        firstName
        lastName
        email
        qualification
      }
    }
  }
`;

/* ===========================
   Delete Teacher
   =========================== */
export const deleteTeacher = (id) => `
  mutation {
    deleteTeacher(id: ${id}) {
      ok
    }
  }
`;
