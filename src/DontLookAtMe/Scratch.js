<div id="main_container">
  <div id="card">
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Update Home</h2>
        <ul>
          <li>
            <div id="label_title">
              <label htmlFor="name"> Name</label>
            </div>
            <input
              type="text"
              required
              id="name"
              name="name"
              placeholder="Enter name"
              value={home.name}
              onChange={handleInputChange}
             
            />
            <div id="label_imgUrl">
              <label htmlFor="imgUrl"> Image URL</label>
            </div>
            <input
              type="url"
              id="imgUrl"
              name="imgUrl"
              placeholder="Enter image URL"
              value={home.imgUrl}
              onChange={handleInputChange}
              
            />
          </li>

          <li>
            <div id="label_description">
              <label htmlFor="description">Description</label>
            </div>
            <textarea
              name="description"
              className="field-style"
              maxLength={84}
              placeholder="Enter description"
              value={home.description}
              onChange={handleInputChange}
            ></textarea>
          </li>
        </ul>
        {/* Here Be Buttons */}
        <div className="btn-wrapper">
          <button
            className="form-btn button-79"
            type="button"
            onClick={handleFinishJob}
          >
            Finish Job
          </button>
        </div>
      </form>
    </div>
  </div>
</div>;
