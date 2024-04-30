import React from "react";
import CountUp from "react-countup";
import { Link } from "react-router-dom";

function About() {
  const subTitle = "Why Choose Us";
  const title = "Become a Marchant";
  const desc =
    "Take courses on your any device with our app & learn all about business what you want. Just download & install & start to learn";
  const btnText = "Apply Now";

  const countList = [
    {
      iconName: "icofont-users-alt-4",
      count: "12600",
      text: "Marchant Enrolled",
    },
    {
      iconName: "icofont-graduate-alt",
      count: "30",
      text: "Certified Courses",
    },
    {
      iconName: "icofont-notification",
      count: "100",
      text: "Rewards and GitCards",
    },
  ];
  return (
    <div className="instructor-section style-2 padding-tb section-bg-ash">
      <div className="container">
        <div className="section-wrapper">
          <div className="row g-4 justify-content-center align-item-center row-cols-1 row-cols-md-2 row-cols-xl-3">
            <div className="col">
              {countList.map((e, i) => (
                <div key={i} className="count-item">
                  <div className="count-inner">
                    <div className="count-icon">
                      <i className={e.iconName}></i>
                    </div>
                    <div className="count-content">
                      <h2>
                        <span className="count">
                          <CountUp end={e.count} />
                        </span>
                        <span>+</span>
                      </h2>
                      <p>{e.text}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="col">
<div className="instructor-content">
<p className="subtitle">{subTitle}</p>
<h2 className="title">{title}</h2>
<p className="desc">{desc}</p>
<Link to="/signup" className="lab-btn">{btnText}</Link>
</div>
            </div>
            <div className="col text-center">
              <div className="instructor-thumb">
                <img src="/src/assets/images/instructor/02.jpg " className="rounded-circle"/>

              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
