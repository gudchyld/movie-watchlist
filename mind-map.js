<div className="movie-card w-5/6 h-[180px] bg-neutral-600 mx-auto mt-10 flex gap-4 items-center">
  <div className="w-2/6 h-[160px] bg-neutral-800"></div>
  {/* Right Section */}
  <div className="w-4/6 h-[160px] bg-neutral-800 flex flex-col justify-between">
    <div className="flex gap-6 items-center">
      <h2>Movie Name</h2>{" "}
      <p>
        <span>*</span>Rating
      </p>
    </div>
    <div className="flex gap-6 items-center">
      <p>mins</p>
      <p>Action, Drama</p>
      <p>
        <span>+</span>Watchlist
      </p>
    </div>
    <div className="h-3/6">
      <p>Movie description with plenty talkings</p>
    </div>
  </div>
</div>;

// Layout
<>
  <div className="max-w-[550px] w-[70vw] h-[90vh] bg-[#121212] flex flex-col">
    <div className="h-1/4 bg-slate-700 flex justify-center items-center"></div>
    {/* children come here */}
  </div>
</>;


// for (let data of watchlistArray) {
//       if (data.imdbID === watchlistID) {
//         // Remove the found data from localStorage
//         window.localStorage.setItem(
//           "watchlist",
//           JSON.stringify([...watchlistArray, data])
//         );
//         setWatchlistArray([...watchlistArray, data]);
//       }
//     }