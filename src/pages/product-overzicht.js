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

const Productoverzicht = () => {
  const {
    wpcontent: {
      page: {
        muzieknummersPageMeta: { muzieknummersPageDescription, muzieknummersPageBannerPhoto },
      },
      muzieknummers: { edges: muzieknummers },
    }
  } = useStaticQuery(graphql`
        query {
            wpcontent {
                page(id: "product-overzicht", idType: URI) {
                  muzieknummersPageMeta {
                    muzieknummersPageDescription
                    muzieknummersPageBannerPhoto {
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
                  } 
                }
                muzieknummers {
                  edges {
                    node {
                      slug
                      muzieknummersMeta {
                        title
                        artist
                        artist2
                        album
                        genre
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
                }
              }
        }
    `)


  return (
    <Layout>
      <SEO title="Productoverzicht" />
      <Wrapper artistsColor={COLORS.BLACK} descriptionColor={COLORS.SECONDARY}>
        <div className="banner">
          <Image
            fluid={muzieknummersPageBannerPhoto.imageFile.childImageSharp.fluid}
            alt={muzieknummersPageBannerPhoto.altText}
          />
          <BottomEdgeDown color={COLORS.SECONDARY} />
        </div>
        <div className="description">
          <h2>Beschrijving</h2>
          <p>{muzieknummersPageDescription}</p>
          <BottomEdgeUp color={COLORS.BLACK} />
        </div>
        <div className="artists">
          <h2>Overzicht muzieknummers</h2>
          <div className="artist-items">
            {muzieknummers.map(({ node: { muzieknummersMeta, slug } }) => (
              <Artist to={`/${slug}`} key={slug}>
                <Image
                  fluid={muzieknummersMeta.coverPhoto.imageFile.childImageSharp.fluid}
                  alt={muzieknummersMeta.coverPhoto.altText}
                />
                <div className="artist-info">
                  <p>
                    {muzieknummersMeta.title}
                  </p>
                  {muzieknummersMeta.artist && <p>{muzieknummersMeta.artist}</p>}
                </div>
              </Artist>
            ))}
          </div>
        </div>
      </Wrapper>
    </Layout>
  )
}


export default Productoverzicht
