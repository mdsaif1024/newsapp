import React, { Component } from 'react'
import NewsItems from './NewsItems'
import Spinner from './Spinner';
import PropTypes from 'prop-types'

export class News extends Component {
    static defaultProps = {
        country:"in",
        category:"science",
        pageSize:5
      }

    static propTypes = {
        country: PropTypes.string,
        category: PropTypes.string,
        pageSize: PropTypes.number
      }
    
       capitalizeFirstLetter =(string)=> {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    
    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading: false,
            page: 1,
        }
        document.title= `${this.capitalizeFirstLetter(this.props.category)} - NewsRoom`
    }

    async updateNews(){
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=52ef417acd2749faa4f2ec297eeaba30&page=${this.state.page}&pageSize=${this.props.pageSize}`
        this.setState({loading: true}) 
        let data = await fetch(url)
        let parseData = await data.json()
        console.log(parseData);
        this.setState({
            
            articles: parseData.articles,
            totalResults: parseData.totalResults,
            loading: false
        })
    }
    async componentDidMount(){
        this.updateNews()
    }

    handlePreviousClick = async ()=>{
        this.setState({page: this.state.page - 1,})
        this.updateNews()
    }


    handleNextClick = async ()=>{
       this.setState({page: this.state.page + 1,})
       this.updateNews()
    }

    render() {

        return (
            <div className='container my-3'>
                <h1 className='text-center' style={{margin:"35px 0"}}>NewsRoom - Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h1>
                {this.state.loading && <Spinner/>}
                <div className='row' >
                    {!this.state.loading && this.state.articles.map((element) => {
                        return <div className='col-md-4' key={element.url}>
                            <NewsItems title={element.title} description={element.description} imgUrl={element.urlToImage} newsUrl={element.url} author={element.author} publishedAt={element.publishedAt} source={element.source.name}/>
                        </div>
                    })}

                </div>

                <div className='container d-flex justify-content-between my-2'>
                <button type="button" disabled={this.state.page<=1} class="btn btn-dark" onClick={this.handlePreviousClick}>&larr; Previous</button>
                <button type="button" disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize )} class="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
                </div>

            </div>
        )
    }
}

export default News