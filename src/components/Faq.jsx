import React, { useState } from "react";

const Faq = () => {
  
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "What is Netflix?",
      answer: `Netflix is a streaming service that offers a wide variety of
      award-winning TV shows, movies, anime, documentaries and more –
      on thousands of internet-connected devices. You can watch as much as
      you want, whenever you want, without a single ad. New content is
      added every week!`,
    },
    {
      question: "How much does Netflix cost?",
      answer: `Watch Netflix on your smartphone, tablet, Smart TV, laptop, or
      streaming device, all for one fixed monthly fee. Plans range
      from ₹149 to ₹649 a month. No extra costs, no contracts.`,
    },
    {
      question: "Where can I watch?",
      answer: `Watch anywhere, anytime. Sign in with your Netflix account to
      watch instantly on the web at netflix.com or any internet-connected device
      including smart TVs, smartphones, tablets, streaming media players,
      and game consoles. You can also download shows with the iOS or Android app.`,
    },
    {
      question: "How do I cancel?",
      answer: `Netflix is flexible. There are no annoying contracts or commitments.
      You can cancel your account online anytime. No cancellation fees.`,
    },
    {
      question: "What can I watch on Netflix?",
      answer: `Netflix has an extensive library of feature films, documentaries,
      shows, anime, award-winning Netflix originals, and more. Watch anytime you want.`,
    },
    {
      question: "Is Netflix good for kids?",
      answer: `The Netflix Kids experience is included in your membership to
      give parents control while kids enjoy family-friendly content.
      Kids profiles come with PIN-protected parental controls.`,
    },
  ];

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="container mt-3">
      <h2 className="text-white headText mb-4">Frequently Asked Questions</h2>
      <div className="row g-2">
        {faqs.map((faq, index) => (
          <div className="col-12" key={index}>
            <button
              className="btn btn-dark d-flex justify-content-between align-items-center"
              style={{ width: "100%", textAlign: "start", borderRadius: "0px" }}
              onClick={() => toggleFaq(index)}
            >
              {faq.question}
             <i className={`fa-solid ${openIndex === index ? "fa-xmark" : "fa-plus"}`}></i>

            </button>

            {openIndex === index && (
              <div className="bg-dark text-light p-3">
                <p>{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Faq;
