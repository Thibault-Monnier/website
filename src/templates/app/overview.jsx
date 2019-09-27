import React from 'react'
import { MDXRenderer } from 'gatsby-plugin-mdx'

const Overview = ({ content }) => {
  return (
    <div className='section__content section__content_small'>
      <div className='documentation'>
        <h1>
          Overview
        </h1>
        <MDXRenderer>
          {content}
        </MDXRenderer>
      </div>
    </div>
  )
}

export default Overview
