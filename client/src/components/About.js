import React from "react";
import ContactUs from "./ContactUs";
import "./About.css";
import aboutMe from "../assets/about_me_pic.jpg";

const About = () => {
  return (
    <>
      <h1>ABOUT</h1>
      <div className="about_main_container">
        <div className="about">
          <h2>Meet Falak</h2>
          <div className="about_image_and_intro">
            <div className="image-intro">
              <img src={aboutMe} className="about_image" alt="About" />
            </div>
            <h3 className="intro">
              Hi, I’m Falak and thanks for stopping by! A few years ago I
              decided to follow my first passion in life which is culinary arts
              and Made By Falak was born! I’m very proud to announce my first
              Cookbook, Made By Falak: Recipes for Everyone, is available now to
              order.
            </h3>
          </div>
        </div>
        <ContactUs />
      </div>
    </>
  );
};

export default About;
