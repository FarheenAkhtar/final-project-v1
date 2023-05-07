import React, { useState } from "react";
import BlogHeader from "../assets/BlogHeader.png";
import "./Footer.css";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("/newsletter", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ email }),
    })
      .then((res) => {
        res.json().then((resData) => {
          window.alert(resData.message);
        });
      })
      .catch((err) => window.alert(err));
  };

  return (
    <>
      <div className="footer-web-main-container">
        <div className="footer-web-menu-container">
          <img className="footer-web-logo" src={BlogHeader} alt="Blog logo" />
        </div>
        <div className="footer-web-menu-container">
          <div className="footer-web-menu-column-newsletter">
            <h5 className="footer-header">Newsletter</h5>
            <form onSubmit={handleSubmit}>
              <div className="footer-web-menu-column">
                <p style={{ margin: "0.5rem 0px 2rem" }}>
                  Be the first to hear about some of my new recipes and exciting
                  promotions by signing up to my monthly newsletter.
                </p>
                <div className="footer-web-menu-row">
                  <div className="input">
                    <input
                      id="newsletter-email"
                      name="newsletterEmail"
                      type="email"
                      autoComplete="on"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <button className="fui-button fui-button-text footer-web-newsletter-submit-button">
                    <span>Submit</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
