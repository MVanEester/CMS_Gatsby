import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = () => {

  const {
    wpcontent: {
      page: {
        homePageMeta: {
          homePageBannerPhoto,
          homePageDescription,
          homePageFeaturedProducts,
          homePageHeaderTitle,
        },
      },
    },
  } = useStaticQuery(graphql`
  query {
    wpcontent {
      page(id: "home", idType: URI) {
        homePageMeta {
          homePageBannerPhoto {
            altText
            sourceUrl
            
          }
          homePageDescription
          homePageFeaturedProducts {
            ... on WPGraphql_Muzieknummer {
              slug
              muzieknummersMeta {
                title
                artist
              }
            }
          }
          homePageHeaderTitle
        }
      }
    }
  }
  `);

  return (
    <Layout>
      <SEO title="Home" />
    </Layout>
  )
}

export default IndexPage
