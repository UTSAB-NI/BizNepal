// Code to display the HomeScreen
import PromoBanner from "../Component/PromoBanner.jsx";
import InfoBar from "../Component/InfoBar.jsx";
import CategoryList from "../Component/CategoryList.jsx";
import HomeReviewCard from "../Component/HomeReviewCard.jsx";
import BusinessListingSection from "../Component/HomeBusinessList.jsx";
import PopularCategory from "../Component/PopularCategory.jsx";

import {
  useGetUserReviewQuery,
  useGetbusinessQuery,
} from "../slices/userApiSlices";
const HomeScreen = () => {
  const { data: reviewData } = useGetUserReviewQuery();
  const { data: businessData } = useGetbusinessQuery();
  return (
    <div>
      <PromoBanner />
      <InfoBar reviews={reviewData} business={businessData} />
      <PopularCategory />
      <CategoryList />

      <HomeReviewCard reviews={reviewData} />
      <BusinessListingSection />
    </div>
  );
};

export default HomeScreen;
