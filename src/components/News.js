import React, { Component } from 'react'
import NewsItems from './NewsItems'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


export class News extends Component {
    static defaultProps = {
        country: "in",
        category: "science",
        pageSize: 6
    }

    static propTypes = {
        country: PropTypes.string,
        category: PropTypes.string,
        pageSize: PropTypes.number
    }

    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading: true,
            page: 1,
            totalResults: 0
        }
        document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsRoom`
    }

    async updateNews() {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=4e321db72489418abdfde9627b770e4b&page=${this.state.page}&pageSize=${this.props.pageSize}`
        this.setState({ loading: true })
        let data = await fetch(url)
        let parseData = await data.json()
        this.setState({
            articles: parseData.articles,
            totalResults: parseData.totalResults,
            loading: false
        })
    }
    async componentDidMount() {
        this.updateNews()
    }



    // handlePreviousClick = async ()=>{
    //     this.setState({page: this.state.page - 1,})
    //     this.updateNews()
    // }


    // handleNextClick = async ()=>{
    //    this.setState({page: this.state.page + 1,})
    //    this.updateNews()
    // }

    fetchMoreData = async () => {
        this.setState({ page: this.state.page + 1, })

        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=4e321db72489418abdfde9627b770e4b&page=${this.state.page}&pageSize=${this.props.pageSize}`
        let data = await fetch(url)
        let parseData = await data.json()
        this.setState({
            articles: this.state.articles.concat(parseData.articles),
            totalResults: parseData.totalResults
        })
    }

    render() {

        return (
            <>
                <h1 className='text-center' style={{ margin: "35px 0" }}>NewsRoom - Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h1>
                {this.state.loading && <Spinner />}

                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData()}
                    hasMore={this.state.articles.length !== this.state.totalResults}
                    loader={<Spinner />}
                // style={{ overflowY: 'hidden' }}
                >
                    <div className="container">
                        <div className='row' >
                            {this.state.articles.map((element, i) => {
                                return <div className='col-md-4' key={i}>
                                    <NewsItems title={element.title} description={element.description} imgUrl={element.urlToImage} newsUrl={element.url} author={element.author} publishedAt={element.publishedAt} source={element.source.name} />
                                </div>
                            })}
                        </div>
                    </div>
                </InfiniteScroll>
            </>
        )
    }
}

export default News