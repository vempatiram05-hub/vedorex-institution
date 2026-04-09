"use client";

import { useState } from "react";

interface FormData {
  id: number;
  tag_label: string;
  heading: string;
  Firstname_placeholder: string;
  lastname_placeholder: string;
  emailaddress_placeholder: string;
  subject_placeholder: string;
  your_message: string;
  button_text: string;
}

export default function ContactForm({ data }: { data: FormData }) {
  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formValues);
  };

  return (
    <section className="py-5" style={{ backgroundColor: "#f8f9fa" }}>
      <div className="container">
        <div className="row align-items-stretch g-5"> {/* ✅ align-items-stretch */}

          {/* ===== Left — Image ===== */}
          <div className="col-12 col-lg-5">
            <img
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=80"
              alt="Contact"
              className="img-fluid rounded-4 shadow"
              style={{
                width: "100%",
                height: "100%",        // ✅ match parent height
                minHeight: "300px",    // ✅ min height on mobile
                maxHeight: "400px",    // ✅ max height on desktop
                objectFit: "cover",
              }}
            />
          </div>

          {/* ===== Right — Form ===== */}
          <div className="col-12 col-lg-7">

            {/* Tag Label */}
            <div className="d-flex align-items-center gap-2 mb-2">
              <div style={{ width: "40px", height: "2px", backgroundColor: "#5C44D8" }} />
              <span
                className="text-uppercase fw-semibold"
                style={{ color: "#5C44D8", fontSize: "13px", letterSpacing: "2px" }}
              >
                {data.tag_label}
              </span>
            </div>

            {/* Heading */}
            <h2
              className="fw-bold mb-4"
              style={{ fontSize: "clamp(24px, 3vw, 36px)" }}
            >
              {data.heading.split("\n").map((line, i) => (
                <span key={i}>{line}<br /></span>
              ))}
            </h2>

            {/* Form */}
            <form onSubmit={handleSubmit}>

              {/* First Name & Last Name */}
              <div className="row g-3 mb-3">
                <div className="col-12 col-sm-6">  {/* ✅ col-sm instead of col-md */}
                  <input
                    type="text"
                    name="firstName"
                    className="form-control py-2"
                    placeholder={data.Firstname_placeholder}
                    value={formValues.firstName}
                    onChange={handleChange}
                    required
                    style={{ borderRadius: "8px" }}
                  />
                </div>
                <div className="col-12 col-sm-6">
                  <input
                    type="text"
                    name="lastName"
                    className="form-control py-2"
                    placeholder={data.lastname_placeholder}
                    value={formValues.lastName}
                    onChange={handleChange}
                    required
                    style={{ borderRadius: "8px" }}
                  />
                </div>
              </div>

              {/* Email & Subject */}
              <div className="row g-3 mb-3">
                <div className="col-12 col-sm-6">  {/* ✅ col-sm instead of col-md */}
                  <input
                    type="email"
                    name="email"
                    className="form-control py-2"
                    placeholder={data.emailaddress_placeholder}
                    value={formValues.email}
                    onChange={handleChange}
                    required
                    style={{ borderRadius: "8px" }}
                  />
                </div>
                <div className="col-12 col-sm-6">
                  <input
                    type="text"
                    name="subject"
                    className="form-control py-2"
                    placeholder={data.subject_placeholder}
                    value={formValues.subject}
                    onChange={handleChange}
                    required
                    style={{ borderRadius: "8px" }}
                  />
                </div>
              </div>

              {/* Message */}
              <div className="mb-4">
                <textarea
                  name="message"
                  className="form-control py-2"
                  placeholder={data.your_message}
                  rows={5}
                  value={formValues.message}
                  onChange={handleChange}
                  required
                  style={{ borderRadius: "8px" }}
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="btn w-100 py-3 text-white fw-bold"
                style={{
                  background: "linear-gradient(135deg, #5C44D8, #a855f7)",
                  border: "none",
                  borderRadius: "8px",
                  fontSize: "14px",
                  letterSpacing: "1px",
                }}
              >
                {data.button_text}
              </button>

            </form>
          </div>

        </div>
      </div>
    </section>
  );
}