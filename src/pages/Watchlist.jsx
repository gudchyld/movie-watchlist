import { Link } from "react-router-dom";
import Layout from "../layout/Layout";
import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { MdRemoveCircle, MdAddCircle } from "react-icons/md";

const Watchlist = () => {
  const [watchlistArray, setWatchlistArray] = useState([]);
  console.log("my Watchlist", watchlistArray);

  //  The useEffect
  useEffect(() => {
    const watchlist = JSON.parse(localStorage.getItem("watchlist"));
    if (watchlist) {
      setWatchlistArray(watchlist);
    }
  }, []);

  return (
    <Layout>
      {/* Header Section */}
      <div className="h-1/4 bg-[url('./assets/movie-title-bg.png')] flex justify-center items-center">
        <div className="flex w-5/6 justify-between items-center">
          <h2 className="text-2xl font-bold">My Watchlist</h2>
          <Link to={`/`} className="text-sm text-white">
            Search For Movies
          </Link>
        </div>
      </div>

      {/* watchlist card */}
      <div className="movie-card-holder pt-4 overflow-auto h-3/4">
        {watchlistArray.length > 0 ? (
          watchlistArray.map((data) => {
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
                        onClick={null}
                      >
                        <MdRemoveCircle />
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
          <div className="w-full h-full flex flex-col items-center justify-center gap-2">
            <p className="text-neutral-500 font-semibold">
              Your watchlist is looking a little empty...
            </p>
            <Link to={`/`} className="text-sm text-neutral-200">
              <div className="flex items-center gap-2">
                <span className="text-lg">
                  <MdAddCircle />
                </span>
                <span className="font-bold">Let&apos;s add some movies</span>
              </div>
            </Link>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Watchlist;
