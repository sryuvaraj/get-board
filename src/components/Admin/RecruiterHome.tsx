"use client";

import { addJOb } from "@/api/seekersApis/services";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const RecruiterHome = () => {

  const user = useSelector((state:any) => state?.loggedInUser?.user)
  
  debugger

  const [showOpeningForm, setShowOpeningForm] = useState(false);
  const [jobTitle, setJobTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [type, setType] = useState("Full-time");
  const [experience, setExperience] = useState("");
  const [salary, setSalary] = useState("");
  const [skills, setSkills] = useState("");
  const [deadline, setDeadline] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const jobData = {
      jobTitle,
      description,
      location,
      type,
      experience,
      salary,
      skills: skills.split(",").map(s => s.trim()),
      deadline,
    };
    const res = await addJOb(jobData)
    console.log("Submitted Job:", jobData);

    // 🔄 call your API to save jobData here

    setShowOpeningForm(false);
    // clear form
    setJobTitle(""); setDescription(""); setLocation("");
    setType("Full-time"); setExperience(""); setSalary("");
    setSkills(""); setDeadline("");
  };

  return (
    <div className="p-8">
      <div>
        <div className="">
          <p>{user?.name}</p>
        </div>
      </div>
      <button
        onClick={() => setShowOpeningForm(true)}
        className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Create Opening
      </button>

      {/* Modal */}
      {showOpeningForm && (
        <div className="fixed inset-0 text-black
         bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-xl shadow-lg">
            <h2 className="text-xl font-bold mb-4">Post a New Job Opening</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block font-medium">Job Title</label>
                <input
                  type="text"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  className="w-full border p-2 rounded"
                  required
                />
              </div>

              <div>
                <label className="block font-medium">Job Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full border p-2 rounded"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-medium">Location</label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full border p-2 rounded"
                    required
                  />
                </div>
                <div>
                  <label className="block font-medium">Employment Type</label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="w-full border p-2 rounded"
                  >
                    <option>Full-time</option>
                    <option>Part-time</option>
                    <option>Internship</option>
                    <option>Freelance</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-medium">Experience Required</label>
                  <input
                    type="text"
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                    className="w-full border p-2 rounded"
                    required
                  />
                </div>
                <div>
                  <label className="block font-medium">Salary Range</label>
                  <input
                    type="text"
                    value={salary}
                    onChange={(e) => setSalary(e.target.value)}
                    className="w-full border p-2 rounded"
                    placeholder="e.g., ₹5L - ₹8L"
                  />
                </div>
              </div>

              <div>
                <label className="block font-medium">Skills (comma separated)</label>
                <input
                  type="text"
                  value={skills}
                  onChange={(e) => setSkills(e.target.value)}
                  className="w-full border p-2 rounded"
                />
              </div>

              <div>
                <label className="block font-medium">Application Deadline</label>
                <input
                  type="date"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  className="w-full border p-2 rounded"
                />
              </div>

              <div className="flex justify-end gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => setShowOpeningForm(false)}
                  className="px-4 py-2 bg-gray-300 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Submit Opening
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecruiterHome;
