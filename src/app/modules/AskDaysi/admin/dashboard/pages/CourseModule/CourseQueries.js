import { PER_PAGE } from "@app/_utilities/constants/paths";

/* ============================
   GET ALL COURSES
   ============================ */
export const GET_COURSES = (search = "", page = 1) => `
query {
  allCourses(
    search: "${search}",
    skip: ${(page - 1) * PER_PAGE},
    first: ${PER_PAGE}
  ) {
    totalRows
    rows {
      id
      courseId
      courseName
      level
      duration
      teacher {
        id
        uniqueId
        firstName
      }
    }
  }
}
`;

/* ============================
   GET COURSE BY ID
   ============================ */
export const GET_COURSE = (id) => `
query {
  allCourseById(id: ${id}) {
    id
    courseId
    courseName
    level
    duration
    teacher {
      id
      uniqueId
      firstName
  
    }
  }
}
`;

/* ============================
   CREATE COURSE
   ============================ */
export const createCourse = (data) => `
mutation {
  addCourse(
    courseName: "${data.courseName}",
    level: "${data.level}",
    teacherId: "${data.teacherId}",
    duration: ${data.duration}
  ) {
    course {
      id
      courseName
      level
    }
  }
}
`;

/* ============================
   UPDATE COURSE
   ============================ */
export const updateCourse = (data) => `
mutation {
  updateCourse(
    courseId: ${data.id},
    courseName: "${data.courseName}",
    level: "${data.level}",
    teacherId: "${data.teacherId}",
    duration: ${data.duration}
  ) {
    course {
      id
      courseName
      level
    }
  }
}
`;

/* ============================
   DELETE COURSE
   ============================ */
export const deleteCourse = (id) => `
mutation {
  deleteCourse(id: ${id}) {
    ok
  }
}
`;
