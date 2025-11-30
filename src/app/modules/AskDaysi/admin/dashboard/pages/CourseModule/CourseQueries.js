// CourseQueries.js
import { PER_PAGE } from "@app/_utilities/constants/paths";

// ---------------------
// Fetch Paginated Courses
// ---------------------
export const GET_COURSES = (search = "", page_num = 1) => `
{
  allCourses(
    search: "${search}",
    skip: ${(page_num - 1) * PER_PAGE},
    first: ${PER_PAGE}
  ) {
    totalRows
    rows {
      id
      courseName
      level
      duration
      teacher {
        uniqueId
        name
      }
    }
  }
}
`;

// ---------------------
// Fetch a Single Course by ID
// ---------------------
export const GET_COURSE = (id) => `
{
  allCourseById(id: ${id}) {
    id
    courseName
    level
    duration
    teacher {
      uniqueId
      name
    }
  }
}
`;

// ---------------------
// Create a New Course
// ---------------------
export const createCourse = (data) => `
mutation {
  addCourse(
    courseName: "${data.courseName}",
    level: "${data.level}",
    duration: ${data.duration},
    teacherId: "${data.teacherId}"
  ) {
    course {
      id
      courseName
      level
      duration
      teacher {
        uniqueId
        name
      }
    }
  }
}
`;

// ---------------------
// Update Existing Course
// ---------------------
export const updateCourse = (data) => `
mutation {
  updateCourse(
    courseId: ${data.id},
    courseName: "${data.courseName}",
    level: "${data.level}",
    duration: ${data.duration},
    teacherId: "${data.teacherId}"
  ) {
    course {
      id
      courseName
      level
      duration
      teacher {
        uniqueId
        name
      }
    }
  }
}
`;

// ---------------------
// Delete Course
// ---------------------
export const deleteCourse = (id) => `
mutation {
  deleteCourse(id: ${id}) {
    ok
  }
}
`;
