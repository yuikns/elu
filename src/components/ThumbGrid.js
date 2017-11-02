import React from 'react'

class ThumbCard extends React.Component {
    render() {
        let { i, link, thumb, title, content, stamp, ...props } = this.props
        link = link || "#"
        title = title || ""
        content = content || ""
        stamp = stamp || ""
        thumb = thumb || require('../images/logo.svg')
        return (<a href={link} className="ThumbCard" >
            <div className="thumb" style={{ "backgroundImage": `url(${thumb})` }}></div>
            <div className="content DropDown-Content">
                <h2>{title}</h2>
                <p>{content}</p>
                <span>{stamp}</span>
            </div>
        </a>)
    }
}

// Some Configurations are Already defined in App.scss
const ThumbGrid = ({ cards }) => (<div className="ThumbGrid">
    {[...Object.keys(cards).map((item, i) => <ThumbCard key={i} {...cards[item]} i={item} />)]}
</div>)
    
export default ThumbGrid 
