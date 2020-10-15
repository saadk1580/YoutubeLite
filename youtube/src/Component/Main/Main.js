import React, { Component } from "react";
import ShowData from '../ShowData/ShowData'
import '../Main/Main.scss'
import icon from '../images/logo.png'
import youtube, { baseParams} from "../YoutubeAPI/YouTube";
import SearchButton from './SearchButton'



class Main extends Component {
  

    constructor(props){
        super(props);       
        this.state = {
            banner: 'Trending Right Now...',
            title: [],
            thumbnail: [],
            description: [],
            video: [],
            channelId: [],
            date: [],
            searchVal: ''
        }
        this.handleEnter = this.handleEnter.bind(this)
        this.componentDidMount = this.componentDidMount.bind(this)
    }

    //Starter screen. Loads videos that are trending
    async componentDidMount(){
        const res = await youtube.get('/search', {
            params: {
                ...baseParams,
                q: ''
            }
        })

        let arr = res.data.items;
        let fromMattedArray = []
        let dateUplaod = arr.map((item)  => item.snippet.publishTime);
        let dateArray = [];

        dateUplaod.forEach( (item) => {
            let timeStamp = new Date(item).getTime()
            let day = new Date(timeStamp).getDate();
            let month = new Date(timeStamp).getMonth() + 1;
            let year = new Date(timeStamp).getFullYear();
          
            dateArray = [(month < 10 ? '0' +  month : month), '-', day < 10 ? '0' +  day : day, '-', year ];
            return fromMattedArray.push(dateArray)
        })
        
        
        let channelid = arr.map((item)  => item.snippet.channelId);
        let title = arr.map((item)  => item.snippet.channelTitle);
        
        let thumbNail = arr.map((item) => item.snippet.thumbnails
        );
        let finalThunm = (thumbNail.map(item => Object.values(item))).map(item => item[1]).map(item => Object.values(item)[0]);
        let des = arr.map(item => item.snippet.title)
        let videoTitle = []
        des.forEach(item => {
            videoTitle.push(item.replace(/&#39;/g, "'").replace(/&quot;/g, '"').replace(/&amp;/g, "&"))
            
        })
       
        
        let vid = arr.map((item)  => item.id.videoId);
        return  this.setState(
            {
                banner: 'Trending Right Now...',
                title: title,
                thumbnail: finalThunm,
                description: videoTitle,
                video: vid,
                channelId: channelid,
                date: fromMattedArray
            }
        
        ) 
    }

    handleEnter = async() => {
        let val = document.getElementById('searchInput').value;
        const res = await youtube.get('/search', {
            params: {
                ...baseParams,
                q: val 
            }
        })

        let arr = res.data.items;
 
        let channelid = arr.map((item)  => item.snippet.channelId);
        let dateArray = [];
        let fromMattedArray = [];
        let dateUplaod = arr.map((item)  => item.snippet.publishTime);

        dateUplaod.forEach( (item) => {
           let timeStamp = new Date(item).getTime()
           let day = new Date(timeStamp).getDate();
           let month = new Date(timeStamp).getMonth() + 1;
           let year = new Date(timeStamp).getFullYear();

           dateArray = [(month < 10 ? '0' +  month : month), '-', day < 10 ? '0' +  day : day, '-', year ];
           
           return fromMattedArray.push(dateArray)
        })
        
        let title = arr.map((item)  => item.snippet.channelTitle);
        let thumbNail = arr.map((item) => item.snippet.thumbnails
        );
        let finalThunm = (thumbNail.map(item => Object.values(item))).map(item => item[1]).map(item => Object.values(item)[0]);
        let des = arr.map(item => item.snippet.title)
        let videoTitle = []
        des.forEach(item => {
            videoTitle.push(item.replace(/&#39;/g, "'").replace(/&quot;/g, '"').replace(/&amp;/g, "&"))
        })
        let vid = arr.map((item)  => item.id.videoId);
        return(                   
            this.setState(
                {
                    banner: val === '' ? 'Trending Right Now...' : `Showing Results for ${val}...`,
                    title: title,
                    thumbnail: finalThunm,
                    description: videoTitle,
                    video: vid,
                    channelId: channelid,
                    date: fromMattedArray,
                    searchVal: val
                }
            )
        )
    }
    
    //Checking for "Press Enter" to search input
    keypress = (e) => {
        if(e.key === 'Enter'){
            this.handleEnter()
        }
    }


    render(){

        return (
            <div className='container'>
                <div className='Location-feild'>
                    <div className='search-bar'>
                        <div onClick={this.componentDidMount} className='logo'>
                            <img className='Youtube-logo' src={icon} alt='YouTube'/>
                            <h3>LITE</h3>
                        </div>
                
                        <div className='search'>
                            <input onKeyPress={this.keypress} id='searchInput' type='text' placeholder='Search' />
                            <SearchButton click={this.handleEnter} searchv={this.state.searchVal}/>
                              
                       </div>
                    </div>  

                    <h3 className='banner'>{this.state.banner}</h3>

                    <div className='container results-container'> 
                        <ShowData className="items" title={this.state.title[0]} thumbnail={this.state.thumbnail[0]} des={this.state.description[0]} date={this.state.date[0]} videoId={`https://www.youtube.com/embed/${this.state.video[0]}`} channelId={this.state.channelId[0]} />
                        <ShowData className="items" title={this.state.title[1]} thumbnail={this.state.thumbnail[1]} des={this.state.description[1]} date={this.state.date[1]} videoId={`https://www.youtube.com/embed/${this.state.video[1]}`} channelId={this.state.channelId[1]}/>
                        <ShowData className="items" title={this.state.title[2]} thumbnail={this.state.thumbnail[2]} des={this.state.description[2]} date={this.state.date[2]} videoId={`https://www.youtube.com/embed/${this.state.video[2]}`} channelId={this.state.channelId[2]}/>
                        <ShowData className="items" title={this.state.title[3]} thumbnail={this.state.thumbnail[3]} des={this.state.description[3]} date={this.state.date[3]} videoId={`https://www.youtube.com/embed/${this.state.video[3]}`} channelId={this.state.channelId[3]}/>
                        <ShowData className="items" title={this.state.title[4]} thumbnail={this.state.thumbnail[4]} des={this.state.description[4]} date={this.state.date[4]} videoId={`https://www.youtube.com/embed/${this.state.video[4]}`} channelId={this.state.channelId[4]}/>
                        <ShowData className="items" title={this.state.title[5]} thumbnail={this.state.thumbnail[5]} des={this.state.description[5]} date={this.state.date[5]} videoId={`https://www.youtube.com/embed/${this.state.video[5]}`} channelId={this.state.channelId[5]}/>
                    </div>
                </div> 
            </div>
        )
    }
}



export default Main;