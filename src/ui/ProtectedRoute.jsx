/* eslint-disable react/prop-types */
import styled from "styled-components";
import { useUser } from "../features/authentication/useUser";
import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const SpinnerWrapper = styled.div`
  height: 100dvh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

function ProtectedRoute({ children }) {
  const navigate = useNavigate();

  // 1 Load Authenticated user
  const { isLoading, isAuthenticated, isFetching } = useUser();

  // If NO Authenticated user, redirect to the /login page
  useEffect(
    function () {
      if (!isAuthenticated && !isLoading && !isFetching) navigate("/login");
    },
    [isLoading, isAuthenticated, isFetching, navigate]
  );

  // 2 Show spinner while loading user
  if (isLoading)
    return (
      <SpinnerWrapper>
        <Spinner />;
      </SpinnerWrapper>
    );

  // If Authenticated user, render app
  if (isAuthenticated) return children;
}

export default ProtectedRoute;
