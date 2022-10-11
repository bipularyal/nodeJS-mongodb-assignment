import React, { useState } from 'react';
import './App.css';

function App() {
  const [posts, setPosts] = useState([{
    content: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Explicabo iste quia cum architecto autem porro modi consequuntur provident, quidem adipisci nobis eius deserunt aspernatur inventore!'
  }],
    [{
      content: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia'
    }]);

   
  return (
    <div className='react-app-component text-center'>
      <div className="container">
        <div className="row justify-content-md-center">
          <div className="col-6">
            <div className="card">
              <div className="card-body">
                <div className="mb-3">
                  <label className="form-label">Enter your post</label>
                  <textarea className="form-control" id="post-content" rows="3"></textarea>
                  <div className="d-grid gap-2">
                    <button type="button" className="btn btn-primary mt-2">Post</button>
                  </div>
                </div>
              </div>
            </div>

            <div className="card text-white bg-dark my-3 text-start">
              <div className="card-body">
                <h6 className="card-subtitle mb-2 text-muted">Oct 4, 2022 - 6:15 PM</h6>
                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <a href="#" className="card-link">Delete</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;