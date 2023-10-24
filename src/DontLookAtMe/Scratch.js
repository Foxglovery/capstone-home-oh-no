<div className="post">
      <div id="post_card">
        <div id="post_card_title">{home[0].home?.name}}</div>
        <div>
          <p className="post-info">{home[0].home?.description}</p>
        </div>
        <div>
          {/* joins my owners in one beautiful stress-free string */}
          <span className="post-info"><p>Owners: {home.map(homeEntry => homeEntry.user?.name).join(", ")}</p></span>
        </div>

        <div className="card_btm_wrapper">
          <div className="post_card_topic">
            <span>
              Posted In:{" "}
              <span className="italics"></span>
            </span>
          </div>

          <div>
            <span className="post-info">some info here</span>
          </div>

        

          
        </div>
      </div>
    </div>



this is what i had before:

<div>
          {home.length > 0 ? (
            <>
              <h1>{home[0].home?.name}</h1>
              <p>{home[0].home?.description}</p>
              {/* joins my owners in one beautiful stress-free string */}
              <p>Owners: {home.map(homeEntry => homeEntry.user?.name).join(", ")}</p>
              {/* more properties */}
            </>
          ) : (
            'Loading...'
          )}
        </div>



{/* <div className="btn-container">
            {/* if logged in user id matches the post.userId, display Edit Post  */}
            {currentUser.id === post.userId ? <button>Edit Post</button> : ""}
            {/* if logged in userid does not match, display UpSchmood btn */}
            {currentUser.id != post.userId ? (
              <button onClick={handleLike}>UpSchmoodles</button>
            ) : (
              ""
            )}
          </div> */}






