// JobQueries.js
import { PER_PAGE } from "@app/_utilities/constants/paths";

// LIST QUERY (with search + pagination)
export const GET_JOBS = (search = "", page_num = 1) => `
{
  allJobs(search: "${search}", skip: ${(page_num - 1) * PER_PAGE}, first: ${PER_PAGE}) {
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

// SINGLE JOB (fetch all and filter client-side)
export const GET_JOB = (id) => `
{
  allJobs {
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

// CREATE JOB
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
    }
  }
}
`;

// UPDATE JOB
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

// DELETE JOB
export const deleteJob = (id) => `
mutation {
  deleteJob(jobId: ${id}) {
    ok
  }
}
`;


