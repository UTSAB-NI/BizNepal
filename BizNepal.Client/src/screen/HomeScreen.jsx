// Code to display the HomeScreen
import PromoBanner from "../Component/PromoBanner.jsx";
import InfoBar from "../Component/InfoBar.jsx";
import CategoryList from "../Component/CategoryList.jsx";
import HomeReviewCard from "../Component/HomeReviewCard.jsx";
import BusinessListingSection from "../Component/HomeBusinessList.jsx";
import { useGetUserReviewQuery,useGetbusinessQuery } from "../slices/userApiSlices";
import review from "../data/Review.js";
const HomeScreen = () => {
  const { data: reviewData } = useGetUserReviewQuery();
  const { data: businessData } = useGetbusinessQuery();
  return (
    <div>
      <PromoBanner />
      <InfoBar reviews={reviewData} business={businessData}/>
      <CategoryList />
      <h1 className="text-center mt-5 ">Reviews</h1>
      <HomeReviewCard reviews={reviewData} />
      <BusinessListingSection />
    </div>
  );
};

export default HomeScreen;
