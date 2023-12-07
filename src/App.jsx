/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react'
const URI = `https://jsonplaceholder.typicode.com/photos`

function App() {
  const [photos, setPhotos] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [total, setTotal] = useState(1)

  function fetchFromApi(url){
      fetch(`${url}?_page=${currentPage}&_limit=32`)
      .then(response => {
        const count = response.headers.get("x-total-count")
        setTotal(count ? parseInt(count) : 0)
       return response.json()
      })
      .then(data => setPhotos(data))
      .catch(err => console.error(err))
  }

  function handlePrev(){
    if(currentPage > 1) setCurrentPage(currentPage - 1)
  }

  function handleNext(){
    if(currentPage < total) setCurrentPage(currentPage + 1)

  }
  function handleHoverIN(e){
    const itemHoverDiv = e.currentTarget.querySelector('.itemHover');
    itemHoverDiv.classList.add('show');
  }
  
  function handleHoverOUT(e){
    const itemHoverDiv = e.currentTarget.querySelector('.itemHover');
    itemHoverDiv.classList.remove('show');
  }

  useEffect(()=> {
    fetchFromApi(URI)
  }, [currentPage])



  return (
    <div className='main-container'>
      <div className='header-container'>
        <h1>Pagination using with {"{JSON}"} Placeholder </h1>
      </div>
      <div className='api-feed'>
      {
              photos.map( item => (
                <div onMouseEnter={handleHoverIN} onMouseLeave={handleHoverOUT} key={item.id} className='img-container' >
                  <img src={item.thumbnailUrl} />
                  <div className='itemHover' id={item.id}>{item.title}</div>
                </div>
              ))
          }
      </div>
      <div className='pagination-container'>
{ currentPage != 1 && <button className='direction-btn' onClick={handlePrev} disabled={currentPage === 1}>Prev</button> }
          <div style={{color:" beige"}}>{`Page ${currentPage} of ${total}`}</div>
{ currentPage != total &&  <button className='direction-btn' onClick={handleNext} disabled={currentPage === total}>Next</button>}
      </div>
    </div>
  )
}

export default App
