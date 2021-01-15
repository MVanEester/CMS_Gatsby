import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import {
  Wrapper,
  Image,
  BottomEdgeDown,
  BottomEdgeUp,
  Artist,
} from "./pageStyles/pageStyles"
import { COLORS } from "../constants"

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
            imageFile {
              childImageSharp {
                fluid(quality: 100) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
          homePageDescription
          homePageFeaturedProducts {
            ... on WPGraphql_Muzieknummer {
              slug
              muzieknummersMeta {
                title
                artist
                coverPhoto {
                  altText
                  sourceUrl
                  imageFile {
                    childImageSharp {
                      fluid(quality: 100, grayscale: true) {
                        ...GatsbyImageSharpFluid_withWebp
                      }
                    }
                  }
                }
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
      <Wrapper>
        <div className="banner">
          <Image
            fluid={homePageBannerPhoto.imageFile.childImageSharp.fluid}
            alt={homePageBannerPhoto.altText}
          />
          <div className="inner-div">
            <p className="header-title">{homePageHeaderTitle}</p>
            <p className="header-description">{homePageDescription}</p>
          </div>
          <BottomEdgeDown color={COLORS.BLACK} />
        </div>
        <div className="description">
          <p>{homePageDescription}</p>
          <BottomEdgeUp color={COLORS.PRIMARY} />
        </div>
        <div className="artists">
          <h2>Featured Muzieknummers</h2>
          <div className="artist-items">
            {homePageFeaturedProducts.map(({ muzieknummersMeta, slug }) => (
              <Artist key={slug} to={`/${slug}`}>
                <Image 
                  fluid={muzieknummersMeta.coverPhoto.imageFile.childImageSharp.fluid}
                  alt={muzieknummersMeta.coverPhoto.altText}
                />
                <div className="artist-info">
                  <p>
                    {muzieknummersMeta.title}
                  </p>
                  <p>{muzieknummersMeta.artist}</p>
                </div>
              </Artist>
            ))}
          </div>
        </div>
      </Wrapper>
    </Layout>
  )
}

export default IndexPage
