import React from "react";
import { useParams } from "react-router-dom";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import styled from "styled-components";

const GET_MOVIE = gql`
  query getMovie($id: Int!) {
    movie(id: $id) {
      id
      title
      medium_cover_image
      language
      rating
      description_intro
      isLiked @client
    }
    suggestions(id: $id) {
        id
        medium_cover_image
    }
  }
`;


const Container = styled.div`
  @import url('https://fonts.googleapis.com/css2?family=Open+Sans&display=swap');
  font-family: "Open Sans", sans-serif;
  height: 100vh;
  background-image: linear-gradient(-45deg, #000046, #1CB5E0);
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: white;
`;

const Column = styled.div`
  margin-left: 10px;
  width: 50%;
`;

const Title = styled.h1`
  font-size: 65px;
  margin-bottom: 15px;
`;

const Subtitle = styled.h4`
  font-size: 32px;
  margin-bottom: 50px;
`;

const Description = styled.p`
  margin: 5px;
  font-size: 20px;
`;


const Poster = styled.div`
  width: 20%;
  height: 60%;
  background-color: transparent;
  background-image: url(${props => props.bg});
  background-size: cover;
  background-position: center center;
`;


export default () => {
  let { id } = useParams();
  id = parseInt(id);
  const { loading, data } = useQuery(GET_MOVIE, {
    variables: { id }
  });
  console.log(data);
  return (
    <Container>
      <Column>
        <Title>{loading? "Loading..." : `${data.movie.title} ${data.movie.isLiked? "♥":"♡"}`}</Title>
        <Subtitle>
            {data?.movie?.language} · {data?.movie?.rating}
        </Subtitle>
        <Description>
            {data?.movie?.description_intro} 
        </Description>
      </Column>
      <Poster bg={data?.movie?.medium_cover_image}></Poster>
      {/* {data && data.suggestions && data.suggestions.map(s => )} */}
    </Container>
  );
};