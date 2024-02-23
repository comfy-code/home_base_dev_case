import Icon from "./icons";
import Image from "next/image";

import { useState } from "react";

import pro from "../../src/styles/pro.module.css";

export default function Providers({ providers }) {
  const [showTooltip, setShowTooltip] = useState(false);
  const Stars = (score, identifier) => {
    var elements = [];

    for (let i = 1; i <= 5; i++) {
      const rate =
        i < Math.floor(score) ? 1 : i > Math.floor(score) ? 0 : (score % 1) / 1;

      const id = "grad" + i + identifier;
      const fill = "url(#" + id + ")";

      elements.push(
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="orange"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="orange"
          className="w-6 h-6"
        >
          <defs>
            <linearGradient id={id}>
              <stop offset={rate} stopColor="orange" />
              <stop offset="0" stopColor="white" />
            </linearGradient>
          </defs>
          <path
            fill={fill}
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
          />
        </svg>
      );
    }

    return elements;
  };
  return (
    <div className={`xl:flex xl:flex-wrap`}>
      {providers.length > 0 ? (
        providers.map((x, i) => {
          return (
            <div className={`xl:w-1/2`}>
              {i === 0 && x.review_score > 4.4 ? (
                <h2
                  className={
                    "bg-sky-500 w-100 ml-2 mr-2 border-sky-500 border border-b-0 rounded rounded-b-none text-white font-semibold p-2"
                  }
                >
                  {" "}
                  FEATURED PARTNER{" "}
                </h2>
              ) : null}
              <div
                key={i}
                className={`border rounded ${
                  i === 0 && x.review_score > 4.4
                    ? "border-sky-500 border-t-0 rounded-t-none"
                    : "border-gray-300"
                } p-4 flex flex-col gap-8 ml-2 mr-2 mb-2`}
              >
                <div className={`flex justify-between items-center`}>
                  <div>
                    <Image
                      src={`https://d126ytvel6227q.cloudfront.net/logos/${x.slug}.jpg`}
                      width={150}
                      height={100}
                      alt={x.name}
                    />
                  </div>
                  <button className={`bg-blue-800 text-white w-1/3 h-10`}>
                    {" "}
                    Get Quote
                  </button>
                </div>

                <div className={`flex flex-col gap-2`}>
                  <h1 className={`font-bold text-2xl`}>{x.name} </h1>
                  <div className={`flex flex-col gap-2 sm:flex-row`}>
                    <div className={`flex gap-2`}>
                      {Stars(x.review_score, x.slug)}
                      <span className={`font-medium`}> {x.review_score}/5</span>
                      <span className={pro.tooltip}>
                        <sup
                          onClick={() => {
                            setShowTooltip(!showTooltip);
                          }}
                        >
                          <Icon name="info" />
                        </sup>
                        <div
                          className={`${pro.tooltipText} ${
                            showTooltip ? pro.seeTool : null
                          }`}
                        >
                          <span className={`flex flex-col gap-2`}>
                            {" "}
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed do eiusmod tempor incididnt ut labore et
                            dolore magna aliqua.{" "}
                            <span className={`font-semibold`}>
                              {" "}
                              BETTER THAN{" "}
                              <span className={`text-lime-700`}> 90% </span> OF
                              COMPANIES{" "}
                            </span>
                          </span>
                        </div>
                      </span>
                    </div>
                    <p> {x.address} </p>
                  </div>
                  <div className={`flex gap-2`}>
                    {x.distance < 5 ? (
                      <div className={`flex`}>
                        <div>
                          <Icon name="nearby" />
                        </div>
                        <span> Nearby </span>
                      </div>
                    ) : null}
                    {x.review_count >= 100 ? (
                      <div className={`flex`}>
                        <div>
                          <Icon name="popular" />
                        </div>
                        <span> Popular </span>
                      </div>
                    ) : null}
                  </div>
                </div>

                <div>
                  <h2 className={`font-bold`}> SERVICES OFFERRED </h2>
                  <div className={`flex flex-wrap gap-2`}>
                    {x.services.map((y, i) => {
                      return (
                        <div key={i} className={`flex gap-1`}>
                          <Icon name="check" />
                          <span> {y} </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <h2 className={`font-bold`}> EXPERIENCES </h2>
                  <div className={`bg-gray-100 p-2`}>
                    <p className={`italic`}>
                      {" "}
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Sagittis eu volutpat odio facilisis. Interdum
                      consectetur libero id faucibus. Est placerat in egestas
                      erat. Ultricies leo integer malesuada nunc vel risus
                      commodo. Amet commodo nulla facilisi nullam vehicula. Sit
                      amet mattis vulputate enim nulla aliquet porttitor lacus
                      luctus.{" "}
                    </p>
                    <p className={`flex justify-end`}> - Anonymous</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <div style={{ textAlign: "center", margin: "5% auto" }}>
          {" "}
          <h2> NO RESULTS </h2>{" "}
        </div>
      )}
    </div>
  );
}
