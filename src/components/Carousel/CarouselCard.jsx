import { Image } from 'pure-react-carousel';
import {Link} from "react-router-dom"
import { useState, useEffect } from "react"
import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"
import 'pure-react-carousel/dist/react-carousel.es.css';
import "./Carousel.css"

dayjs.extend(utc)
const EVERYDAY = 86400000


const CarouselCard = ({book}) => {

    const [dueDays, setDueDays] = useState(dayjs(book.dueDate).diff(dayjs(new Date()), "day"));

    useEffect(() => {
      const intervalId = setInterval(() => {
        const daysDue = dayjs(book.dueDate).diff(dayjs(new Date()),"day");
        setDueDays(daysDue);
      }, EVERYDAY);
  
      return () => clearInterval(intervalId);
    }, [book.dueDate]);


    return (
    <Link to={`/books/${book._id}`} style={{textDecoration: "none", color:"black"} }  >
    <div>
    <div>
    <Image className='image' src={`${book.image}`} />  
    </div>
    <div>
    <h2 className='carousel-text'>{book.title}</h2>
    <p className='carousel-author'>{book.author.name}</p>
    {book.dueDate ? <p className='carousel-author'> Due in {dueDays} days</p> : "" } 
    </div>
    </div>
    </Link>
)
}


export default CarouselCard