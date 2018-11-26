import React from 'react'
import DocumentTitle from 'react-document-title'

export const Host = function () {
    let hostname = window.location.hostname
    if (hostname == "localhost" || hostname == "itermind.com") {
        return "itermind"
    } else {
        return "argcv"
    }
}()

export const HostString = function () {
    return Host == "itermind" ? "IterMind" : "ArgCV"
}()

export const HostTitle = ({ suffix }) => {
    if (suffix) {
        return <DocumentTitle title={HostString + " - " + suffix} />
    } else {
        return <DocumentTitle title={HostString} />
    }
}

const SiteSignatureText = ({ match }) => {
    let hostname = window.location.hostname
    if (Host == "itermind") {
        return (
            <span>
                <span style={{ color: 'MediumPurple' }}>I</span>
                <span style={{ color: 'SkyBlue' }}>ter</span>
                <span style={{ color: 'Gold' }}>M</span>
                <span style={{ color: 'OrangeRed' }}>ind</span>
            </span>
        )
    } else {
        return (
            <span>
                <span style={{ color: 'MediumPurple' }}>A</span>
                <span style={{ color: 'SkyBlue' }}>rg</span>
                <span style={{ color: 'Gold' }}>C</span>
                <span style={{ color: 'OrangeRed' }}>V</span>
            </span>
        )
    }

}

export default SiteSignatureText