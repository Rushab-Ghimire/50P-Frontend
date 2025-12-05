import { PER_PAGE } from "@app/_utilities/constants/paths";

/* ============================
   GET ALL JOBS (Pagination + Search)
   ============================ */
export const GET_JOBS = (search = "", page = 1) => `
query {
  allJobs(
    search: "${search}"
    skip: ${(page - 1) * PER_PAGE}
    first: ${PER_PAGE}
  ) {
      totalRows
      rows {
        jobId
        jobTitle
        description
        qualification
        location
        salary
        employmentType
        category
        experience
    }
  }
}
`;

/* ============================
   GET JOB BY ID
   ============================ */
export const GET_JOB = (id) => `
query {
  getJobById(jobId: ${id}) {
    jobId
    jobTitle
    description
    qualification
    location
    salary
    employmentType
    category
    experience
  }
}
`;

/* ============================
   CREATE JOB
   ============================ */
export const createJob = (data) => `
mutation {
  createJob(
    jobTitle: "${data.jobTitle}",
    description: "${data.description}",
    qualification: "${data.qualification}",
    location: "${data.location}",
    salary: "${data.salary}",
    employmentType: "${data.employmentType}",
    category: "${data.category}",
    experience: "${data.experience}"
  ) {
    job {
      jobId
      jobTitle
      category
      location
      salary
    }
  }
}
`;

/* ============================
   UPDATE JOB
   ============================ */
export const updateJob = (data) => `
mutation {
  updateJob(
    jobId: ${data.jobId},
    jobTitle: "${data.jobTitle}",
    description: "${data.description}",
    qualification: "${data.qualification}",
    location: "${data.location}",
    salary: "${data.salary}",
    employmentType: "${data.employmentType}",
    category: "${data.category}",
    experience: "${data.experience}"
  ) {
    job {
      jobId
      jobTitle
      category
      location
      salary
    }
  }
}
`;

/* ============================
   DELETE JOB
   ============================ */
export const deleteJob = (id) => `
mutation {
  deleteJob(jobId: ${id}) {
    ok
  }
}
`;
