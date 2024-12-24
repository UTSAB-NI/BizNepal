import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TokenDecode from "../../Component/TokenDecode";
import { useGetUserByIdQuery } from "../../slices/userApiSlices";
import { Logout } from "../../slices/authSlices";
const BusinessProfile = () => {
  const dispatch = useDispatch(); // Use dispatch for calling actions

  const { userInfo } = useSelector((state) => state.auth); // Get userInfo from state

  const userId = userInfo?.jwtToken
    ? TokenDecode().userId(userInfo.jwtToken)
    : null; // Get user ID from token

  console.log(userId); // Log userId

  const { data: userData, error, isLoading } = useGetUserByIdQuery(userId); // Use useGetUserByIdQuery
  console.log(userData); // Log userData

  return <div className="business-profile">
    <h1>Business Profile</h1>
    <p>This is business profile</p>

    <div className="profile-info">
      <h2>Profile Info</h2>
      <p>Name: {userData?.userName}</p>
      <p>Email: {userData?.email}</p>
      <p>Phone: {userData?.phoneNumber}</p>
      <p>Address: {userData?.address}</p>
    </div>

  </div>;
};

export default BusinessProfile;
