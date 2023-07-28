import { FiSearch } from "react-icons/fi";
import { FaStar } from "react-icons/fa";
import { HiOutlineFilm } from "react-icons/hi";
import { MdAddCircle } from "react-icons/md";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";


const MovieSearch = () => {
  const [movieName, setMovieName] = useState("");
  const [movieData, setMovieData] = useState([]);
  const [searchActive, setSearchActive] = useState(false);
  const [watchlistArray, setWatchlistArray] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  console.log("watchlist array value", watchlistArray);

  // The UseEffect for saving to localStorage
  useEffect(() => {
    localStorage.setItem("watchlist", JSON.stringify(watchlistArray));
  }, [watchlistArray]);

  function handleSearch(e) {
    e.preventDefault();
    getMovieData();
  }

  function handleWatchlistAdd(watchlistID) {
    console.log("watchlist Id", watchlistID);
    // loop through movieData array
    for (let data of movieData) {
      if (data.imdbID === watchlistID) {
        console.log("found the id");
        setWatchlistArray([...watchlistArray, data]);
      }
    }
  }

  async function getMovieData() {
    try {
      const response = await axios.get(
        `http://www.omdbapi.com?apikey=f003f343&s=${movieName}&type=movie`
      );
      let detailedData = [];

      if (response.data.Response === "True") {
        const tempData = response.data.Search;

        for (const item of tempData) {
          const result = await axios.get(
            `http://www.omdbapi.com?apikey=f003f343&i=${item.imdbID}`
          );
          detailedData.push(result.data);
        }
      }

      setMovieData(detailedData);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log("My error", error);
    }
  }

  return (
    <>
      <div className="max-w-[550px] w-[70vw] h-[90vh] bg-[#121212] flex flex-col">
        <div className="h-1/4 bg-[url('./assets/movie-title-bg.png')] flex justify-center items-center">
          {/* Find your film / My Watchlist */}
          <div className="flex w-5/6 justify-between items-center">
            <h2 className="text-2xl font-bold">Find Your Film</h2>
            <Link to={`/watchlist`} className="text-sm text-white">
              My Watchlist
            </Link>
          </div>
        </div>
        {/* end top div */}

        {/* search bar */}
        <form
          className="movie-form  w-5/6 h-[38px] mx-auto bg-[#2E2E2F]"
          onSubmit={(e) => handleSearch(e)}
        >
          <div className="flex justify-between bg-[#2E2E2F] items-center pl-4 rounded-tr-md rounded-br-md">
            <div className="flex items-center gap-3">
              <FiSearch className="text-neutral-400 text-lg" />
              <input
                className="movie-input inline-flex bg-[#2E2E2F]"
                type="text"
                placeholder="movie name"
                value={movieName}
                onChange={(e) => setMovieName(e.target.value)}
              />
            </div>
            <button
              className=" h-[38px] pl-5 pr-4 py-2  bg-neutral-600 rounded-tr-md rounded-br-md rounded-tl-none rounded-bl-none justify-center items-center gap-2 inline-flex"
              type="submit"
              onClick={() => setSearchActive(true)}
            >
              Search
            </button>
          </div>
        </form>

        {/* Begin movie display cards */}

        {/* Show this class on conditional */}
        <div className="movie-card-holder pt-4 overflow-auto h-3/4">
          {searchActive ? (
            isLoading ? (
              <div className="w-full h-full flex flex-col items-center justify-center">
                <div className="spinner"></div>
              </div>
            ) : movieData.length > 0 ? (
              movieData.map((data) => {
                return (
                  <div
                    className="movie-card w-5/6 h-[180px]  mx-auto mt-6 flex gap-4 items-center"
                    key={data.imdbID}
                  >
                    <div className="w-2/6 h-[160px] bg-neutral-800">
                      <img
                        className="w-[100%] h-[100%] object-cover"
                        src={data.Poster}
                        alt=""
                      />
                    </div>
                    {/* Right Section */}

                    <div className="w-4/6 h-[160px] flex flex-col gap-3 pt-4">
                      <div className="flex gap-3 items-center">
                        <h2 className="text-[14px] font-bold">{data.Title}</h2>{" "}
                        <div className="flex items-center gap-1">
                          <span>
                            <FaStar className="text-yellow-600" />
                          </span>
                          <span>{data.imdbRating}</span>
                        </div>
                      </div>
                      <div className="flex gap-3 items-center">
                        <p>{data.Runtime}</p>
                        <p>{data.Genre}</p>
                        <div className="flex items-center gap-1">
                          <span
                            className="text-lg cursor-pointer"
                            id={data.imdbID}
                            onClick={() => handleWatchlistAdd(data.imdbID)}
                          >
                            <MdAddCircle />
                          </span>
                          <span>Watchlist</span>
                        </div>
                      </div>
                      <div className="movie-plot h-3/6 overflow-auto ">
                        <p className="">{data.Plot}</p>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center">
                <p className="text-neutral-500 font-semibold">
                  Unable to find what you’re looking<br></br>&nbsp; &nbsp;
                  &nbsp; for. Please try another search.
                </p>
              </div>
            )
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center">
              <span className="text-7xl text-neutral-700">
                <HiOutlineFilm />
              </span>
              <p className="font-semibold text-neutral-700">Start exploring</p>
            </div>
          )}
        </div>
        {/* Movie card ends */}
      </div>
    </>
  );
};

export default MovieSearch;
