import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

import { getData } from "../data.js";

import { useState, useRef, useEffect } from "react";

import pro from "../styles/pro.module.css";

import Caret from "../../public/components/icons/Caret.js";

import Providers from "../../public/components/Providers.js";

export async function getServerSideProps() {
  const companies = await getData();

  return { props: { companies } };
}

export default function Home({ companies }) {
  const [providers, setProviders] = useState(companies);
  const [filteredProviders, setFiltered] = useState([]);
  const [cate, setCate] = useState(() => {
    const categories = [];
    for (let i = 0; i < providers.length; i++) {
      for (let m = 0; m < providers[i].services.length; m++) {
        if (!categories.includes(providers[i].services[m])) {
          categories.push(providers[i].services[m]);
        }
      }
    }
    return categories;
  });

  //state control open/close of filters
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);

  //state hold filter selection
  const [ratingFilter, setRatingFilter] = useState("");
  const [serviceFilter, setServiceFilter] = useState("");
  const [distanceFilter, setDistanceFilter] = useState("");

  // handle outside clicks
  const newRef = useRef(null);
  const newRef1 = useRef(null);
  const newRef2 = useRef(null);

  const handleOutsideClick = (e) => {
    if (newRef.current && !newRef.current.contains(e.target)) {
      setOpen(false);
    }

    if (newRef1.current && !newRef1.current.contains(e.target)) {
      setOpen1(false);
    }

    if (newRef2.current && !newRef2.current.contains(e.target)) {
      setOpen2(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  });

  //filtering
  const ratingChange = (e) => {
    setRatingFilter(parseInt(e.target.value));
    setOpen(false);
  };

  const filterByRating = (arr) => {
    return ratingFilter !== ""
      ? arr.filter((x) => Math.floor(x.review_score) === ratingFilter)
      : arr;
  };

  const filterByService = (arr) => {
    return serviceFilter !== ""
      ? arr.filter((x) => x.services.includes(serviceFilter))
      : arr;
  };

  const filterByDitance = (arr) => {
    return distanceFilter !== ""
      ? arr.filter((x) => x.distance < distanceFilter)
      : arr;
  };

  useEffect(() => {
    let res = companies;
    res = filterByRating(res);
    res = filterByService(res);
    res = filterByDitance(res);

    setProviders(res);
  }, [ratingFilter, serviceFilter, distanceFilter]);

  return (
    <main>
      <div className={`p-2 lg:flex lg:justify-end lg:gap-2`}>
        <div
          className={`${pro.customSelect} ${open ? pro.active : null} `}
          ref={newRef}
        >
          <button
            className={`${pro.selectButton} font-semibold lg:gap-4`}
            role="combobox"
            aria-labelledby="select button"
            aria-haspopup="listbox"
            aria-expanded={false}
            aria-controls="select-dropdown"
            onClick={() => {
              setOpen(!open);
            }}
          >
            <span className={pro.selectedValue}>
              {" "}
              {ratingFilter !== ""
                ? ratingFilter + " Stars"
                : "STAR RATING"}{" "}
            </span>
            <span className={pro.arrow}>
              <Caret />
            </span>
          </button>
          <ul
            role="listbox"
            id="select-dropdown"
            className={`${pro.selectDropdown} relative lg:absolute`}
          >
            <li>
              <input
                type="radio"
                id="five"
                value={5}
                name="rating"
                onClick={(e) => ratingChange(e)}
              />
              <label htmlFor="five"> 5 Stars </label>
            </li>
            <li>
              <input
                type="radio"
                id="four"
                value={4}
                name="rating"
                onClick={ratingChange}
              />
              <label htmlFor="four"> 4 Stars </label>
            </li>
            <li>
              <input
                type="radio"
                id="three"
                value={3}
                name="rating"
                onClick={ratingChange}
              />
              <label htmlFor="three"> 3 Stars </label>
            </li>
            <li>
              <input
                type="radio"
                id="two"
                value={2}
                name="rating"
                onClick={ratingChange}
              />
              <label htmlFor="two"> 2 Stars </label>
            </li>
            <li>
              <input
                type="radio"
                id="one"
                value={1}
                name="rating"
                onClick={ratingChange}
              />
              <label htmlFor="one"> 1 Star </label>
            </li>
          </ul>
        </div>

        <div
          className={`${pro.customSelect} ${open1 ? pro.active : null}`}
          ref={newRef1}
        >
          <button
            className={`${pro.selectButton} font-semibold lg:gap-4`}
            role="combobox"
            aria-labelledby="select button"
            aria-haspopup="listbox"
            aria-expanded={false}
            aria-controls="select-dropdown"
            onClick={() => setOpen1(!open1)}
          >
            <span className={pro.selectedValue}>
              {serviceFilter !== "" ? serviceFilter : "SERVICES OFFERED"}{" "}
            </span>
            <span className={pro.arrow}>
              <Caret />
            </span>
          </button>
          <ul
            role="listbox"
            id="select-dropdown"
            className={`${pro.selectDropdown} relative lg:absolute`}
          >
            {cate
              ? cate.map((x, i) => {
                  return (
                    <li key={i}>
                      <input
                        type="radio"
                        id={i}
                        value={x}
                        name="service"
                        onClick={(e) => {
                          setServiceFilter(e.target.value);
                          setOpen1(false);
                        }}
                      />
                      <label htmlFor={i}> {x} </label>
                    </li>
                  );
                })
              : null}
          </ul>
        </div>

        <div
          className={`${pro.customSelect} ${open2 ? pro.active : null}`}
          ref={newRef2}
        >
          <button
            className={`${pro.selectButton} font-semibold lg:gap-4`}
            role="combobox"
            aria-labelledby="select button"
            aria-haspopup="listbox"
            aria-expanded={false}
            aria-controls="select-dropdown"
            onClick={() => setOpen2(!open2)}
          >
            <span className={pro.selectedValue}>
              {distanceFilter !== ""
                ? "within " + distanceFilter + " miles"
                : "DISTANCE"}
            </span>
            <span className={pro.arrow}>
              <Caret />
            </span>
          </button>
          <ul
            role="listbox"
            id="select-dropdown"
            className={`${pro.selectDropdown} relative lg:absolute`}
          >
            <li>
              <input
                type="radio"
                id="5m"
                value={5}
                onClick={(e) => {
                  setDistanceFilter(e.target.value);
                  setOpen2(false);
                }}
                name="distance"
              />
              <label htmlFor="5m">within 5 Miles </label>
            </li>
            <li>
              <input
                type="radio"
                id="15m"
                value={15}
                name="distance"
                onClick={(e) => {
                  setDistanceFilter(e.target.value);
                  setOpen2(false);
                }}
              />
              <label htmlFor="15m"> within 15 Miles </label>
            </li>
            <li>
              <input
                type="radio"
                id="60m"
                value={60}
                name="distance"
                onClick={(e) => {
                  setDistanceFilter(e.target.value);
                  setOpen2(false);
                }}
              />
              <label htmlFor="60m"> within 60 miles </label>
            </li>
          </ul>
        </div>
      </div>
      {ratingFilter !== "" || serviceFilter !== "" || distanceFilter !== "" ? (
        <div className={`flex justify-end p-2`}>
          {" "}
          <button
            style={{
              backgroundColor: "red",
              color: "white",
              border: "none",
              borderRadius: "5px",
              padding: "1%",
            }}
            onClick={() => {
              setRatingFilter("");
              setDistanceFilter("");
              setServiceFilter("");
              setProviders(companies);
            }}
          >
            {" "}
            Clear Filters{" "}
          </button>
        </div>
      ) : null}
      <Providers providers={providers} />
    </main>
  );
}
