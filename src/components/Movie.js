import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

const LIKE_MOVIE = gql`
  mutation toogleLikeMovie($id: Int!, $isLiked: Booleand!) {
    toogleLikeMovie(id: $id, isLiked: $isLiked) @client
  }
`;

const Container = styled.div`
  height: 400px;
  border-radius: 7px;
  width: 100%;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  background-color: transparent;
  align-item: center;
`;

const Poster = styled.div`
  background-image: url(${props => props.bg});
  height: 100%;
  width: 100%;
  background-size: cover;
  background-position: center center;
  border-radius: 7px;
`;

const Like = styled.button`
  background-color: transparent;
  border-color: transparent;
  border: none;
`;

export default ({ id, bg, isLiked }) => {
  const [toogleLikeMovie] = useMutation(LIKE_MOVIE, {
    variables: { id: parseInt(id), isLiked }
  });
  return (
    <Container>
      <Link to={`/${id}`}>
        <Poster bg={bg} />
      </Link>
      <Like onClick={toogleLikeMovie}>
        {isLiked ? "♥" : "♡"}
      </Like>
    </Container>
  );
};