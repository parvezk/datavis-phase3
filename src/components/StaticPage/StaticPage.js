import React from "react";

import "./styles.scss";

const StaticPage = () => {
  return (
    <div className="research_paper">
      <blockquote>
        <h3>
          <a href="https://insights.ap.org/industry-trends/report-how-virtual-reality-will-impact-journalism">
            Report: How virtual reality will impact journalism
          </a>
        </h3>
        <p>
          Learn how immersive media requires a new reporting approach and how
          publishers can leverage it by reading “The age of dynamic
          storytelling: A guide for journalists in a world of immersive 3-D
          content.” Link to the report:{" "}
          <a
            href="https://insights.ap.org/industry-trends/report-how-virtual-reality-will-impact-journalism"
            title="AP Insights: Age of Dynamic Storytelling"
          >
            AP Insights: Age of Dynamic Storytelling
          </a>
        </p>
        <footer>
          —{" "}
          <cite>
            <a href="https://insights.ap.org/contributors/francesco-marconi">
              By Francesco Marconi
            </a>
          </cite>
        </footer>
      </blockquote>
    </div>
  );
};

export default StaticPage;
