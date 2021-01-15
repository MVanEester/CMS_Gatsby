import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { Wrapper, Image } from "./templateStyles/artistStyles"

const ArtistTemplate = ({
    data: {
        wpcontent: {
            muzieknummer: {
                muzieknummersMeta,
                roles: { edges: roles },
            },
        },
    },
}) => {

    return (
        <Layout>
            <SEO title="Artist" />
            <Wrapper>
                <div className="artist-container">
                    <div className="artist-image">
                        <Image
                            fluid={muzieknummersMeta.coverPhoto.imageFile.childImageSharp.fluid}
                            alt={muzieknummersMeta.coverPhoto.altText}
                        />
                        <div className="roles">
                            {roles.map(({ node: role }) => (
                                <div key={role.name} className="role">
                                    {role.name}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="artist-info">
                        <h2>
                            {muzieknummersMeta.title}
                        </h2>
                        {muzieknummersMeta.artist2 ? (
                            <h3>
                                <span>{muzieknummersMeta.artist} -</span> <span>ft. {muzieknummersMeta.artist2}</span>
                            </h3>
                        ) : (
                                <h3>{muzieknummersMeta.artist}</h3>
                            )}
                        <p className="info">
                            <strong>Album:</strong> {muzieknummersMeta.album}
                        </p>
                        <p className="info">
                            <strong>Genre:</strong> {muzieknummersMeta.genre}
                        </p>
                    </div>
                </div>
            </Wrapper>
        </Layout>
    )
}

export default ArtistTemplate

export const pageQuery = graphql`
    query($id: ID!) {
        wpcontent {
            muzieknummer(id: $id, idType: ID) {
                roles {
                    edges {
                        node {
                            name
                        }
                    }
                }
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
                                fluid(quality: 75) {
                                    ...GatsbyImageSharpFluid_withWebp
                                }
                            }
                        }
                    }
                }
            muzieknummerId
            }
        }
    }
`
