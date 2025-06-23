"use client";

import { fetchJobs } from "@/api/seekersApis/services";
import React, { useEffect, useState } from "react";

interface Job {
  id: string;
  jobTitle: string;
  companyName: string;
  location: string;
  type: string;
  salary: string;
  skills: string[];
}

const SeekerHome = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const loadJobs = async () => {
      try {
        const jobList = await fetchJobs();
        setJobs(jobList);
      } catch (err) {
        setError("Failed to load jobs.");
        console.log(err)
      } finally {
        setIsLoading(false);
      }
    };

    loadJobs();
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-semibold mb-6">Available Job Openings</h1>

      {isLoading && <p>Loading jobs...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="grid gap-4 md:grid-cols-2">
        {jobs.map((job) => (
          <div
            key={job.id}
            className="bg-white p-4 shadow-md rounded-lg border hover:shadow-lg transition"
          >
            <h2 className="text-lg font-bold">{job.jobTitle}</h2>
            <p className="text-sm text-gray-600">{job.companyName}</p>
            <p className="text-sm">{job.location} • {job.type}</p>
            <p className="text-sm text-green-600 mt-1 font-semibold">{job.salary}</p>
            <p className="text-sm mt-2">
              <span className="font-medium">Skills:</span> {job.skills.join(", ")}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SeekerHome;
