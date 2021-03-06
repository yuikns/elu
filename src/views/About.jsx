import React from 'react'
import ReactGA from 'react-ga'

// import { Alert } from '@material-ui/core/Button'

import SiteSignatureText, { Host, HostTitle } from 'components/SiteSignatureText'

const About = ({ match }) => {
    ReactGA.pageview(window.location.pathname + window.location.search)
    return (
        <div>
            <HostTitle suffix="About" />
            <h1>About</h1>
            <hr />

            {
                Host == "argcv" ? <div>
                    <h3>About <SiteSignatureText /></h3>
                    <p>
                        <SiteSignatureText /> is the abbreviation of argc-argv. We can find paragraph from <em>5.1.2.2.1 Program startup</em> in &nbsp;
                    <a title="n1570" href="http://www.open-std.org/jtc1/sc22/wg14/www/docs/n1570.pdf" target="_blank" ><strong>n1570</strong></a>&nbsp;written as follow:
                </p>

                    <blockquote>
                        The function called at program startup is named main. The implementation declares no prototype for this function.
                        It shall be deﬁned with a return type of int and with no parameters:
                        <pre>int main(void) {"{"} /* ... */ {"}"}{"\n"}</pre>
                        or with two parameters (referred to here as argc and argv,
                        though any names may be used, as they are local to
                        the function in which they are declared):
                        <pre>int main(int argc, char *argv[]) {"{"} /* ... */ {"}"}{"\n"}</pre>
                        or equivalent; or in some other implementation-deﬁned manner.
                    </blockquote>

                    <p>Argc means "argument count", and argv means "argument vector". Combined argc and argv means input. Each of code is an individual module, given input, do some process, and return the result. It is straightforward and beautiful, just like my life. </p>

                    <p>In this site, for the purpose of future's review, <em>yu</em> writes some interesting things recently he
                learned, or the log of resolve some bugs. It will also be excited if someone finds this content, and also solved
                his problem recently faced.
                </p>

                    <p>Of course, as a personal site, he will also write some emotion related contents as well.</p>
                </div> :
                    <div>
                    </div>
            }


            <h3>About yu</h3>
            <p>Someone interested in <em>Unix Network Programming</em>, <em>Natural Language Processing</em>, <em>Machine
        Learning</em>, <em>Artificial Intelligence</em>, <em>Information Retrieval</em> and <em>Operation System</em>,
        who learns code from <em>Introduction to Algorithms</em> but not proficient in algorithms, always reads <em>Computer
          System: A Programmer's Perspective</em> but still so weak.</p>
            <p>Life is so short, maybe tomorrow is the day to say goodbye. As for me, I can only write code, wish to make some
        contribution, as the recompense to my DNA, which gives me the ability to have perceptions.</p>
        </div>
    )
}

export default About
