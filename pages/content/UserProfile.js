import React, { useEffect } from 'react'
import './UserProfile.css'
import BeerItem from '../../components/content/beers/BeerItem.js'
import {useState} from "react"
import axios from 'axios';
import { baseUrl } from '../../shared/base-url';

function UserProfile(props) {


    const beerUrl = "http://localhost:8081/beer";
    const baseUrl = "http://localhost:8081/";
    const eventsUrl = "http://localhost:8081/events";
    const breweryUrl = "http://localhost:8081/brewery"
    // const { 100001 } = useParams();
    const [data, setData] = useState();
    
    const getBeerReviewByUser = useEffect(() => {
            axios.get(baseUrl + "user" + 100001).then(res => {
                    setData(res.data);
                    console.log(res.data);
                })
            }, [])

    const getUser = useEffect(() => {
        axios.get(baseUrl + "user" + 100001).then(res => {
            setData(res.data);
        })
    })
            
    const getEvents = useEffect(() => {
        axios.get(eventsUrl + "all").then(res => {
            setData(res.data);
        })
    }, [])

    const getAllBeers = useEffect(() => {
        axios.get(beerUrl + "all").then(res => {
            setData(res.data);
        })
    }, [])

    const getFavoritedBreweries = useEffect(() => {
        axios.get(breweryUrl + "user" + 100001).then(res => {
            setData(res.data);
        })
    })






    const beerList = () => {
        getAllBeers.map((e, i) => {
            return (
                <div key={i}>
                    <div className='beerList'></div>
                    <img src={e.imgUrl}/>
                    <div>{e.rating}</div>
                </div>
            )
        })
    }
    const eventsList = () => {
        getEvents.map((e, i) => {
            return (
                <div key={i}>
                    <div className='eventsList'></div>
                    <img src={e.imgUrl}/>
                </div>
            )
        })
    }
    const favoritedBrewerys = () => {
        getFavoritedBreweries.map((e, i) => {
            return (
                <div key={i}>
                    <div className='favorite-list'></div>
                    <img src={e.imgUrl}/>
                    {/* favoite-beer-list */}
                </div>
            )
        })
    }
    

    const [state, setState] = useState(false);

    function handleClick(e) {
        if (e.target.classlist === "review-title") {
            return (
                {beerList}
            )
        } if(e.target.classList === "events-tab") {
            return (
                {eventsList}
            )
        } if (e.target.classList === "favorited-beers") {
            return (
                {favoritedBrewerys}
            )
        }
    }

  return (
    <div className='userProfile'>
        <h1>Welcome "User Name"</h1>
        <div className='beer-review-con'>
            <div className='review-title-con'>
                <div onClick={handleClick} className='review-title'>Reviewed Beers</div>
                <div onClick={handleClick} className='events-tab'>Events</div>
                <div onClick={handleClick} className='favorited-beers'>Favorite Breweries</div>
            </div>
            <div className='beer-review'>
                <div className='beerList'></div>
                <img src={props.imgUrl}/>
                <div>{props.rating}</div>
            </div>
            <div className='beer-review'>
                <div className='beerList'></div>
                <img src={props.imgUrl}/>
                <div>{props.rating}</div>
            </div>
            <div className='beer-review'>
                <div className='beerList'></div>
                <img src={props.imgUrl}/>
                <div>{props.rating}</div>
            </div>
            <div className='beer-review'>
                <div className='beerList'></div>
                <img src={props.imgUrl}/>
                <div>{props.rating}</div>
            </div>
            <div className='beer-review'>
                <div className='beerList'></div>
                <img src={props.imgUrl}/>
                <div>{props.rating}</div>
            </div>
        </div>
    </div>
  )
}

export default UserProfile