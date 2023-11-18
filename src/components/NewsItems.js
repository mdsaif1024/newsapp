import React, { Component } from 'react'

export class NewsItems extends Component {
    render() {
        let { title, description, imgUrl, newsUrl, author, publishedAt, source } = this.props;
        return (
            <div>
                <div className="card">
                <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{zIndex:'1', left:'90%'}} >{source}</span>
                    <img src={!imgUrl ? "https://images.wsj.net/im-885392/social" : imgUrl} className="card-img-top" alt="..." />
                    <div className="card-body grid gap-3">
                        <h5 className="card-title">{title}...</h5>
                        <p className="card-text">{description}...</p>
                        <div className="text-body-secondary">By {!author?"Unknown":author} at {new Date(publishedAt).toGMTString()} </div>
                        <a href={newsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-dark mt-2">Read More</a>
                    </div>
                </div>

            </div>
        )
    }
}

export default NewsItems