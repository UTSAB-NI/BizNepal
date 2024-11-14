// Code to display the HomeScreen
import PromoBanner from "../Component/PromoBanner.jsx";
import InfoBar from "../Component/InfoBar.jsx";
import CategoryList from "../Component/CategoryList.jsx";
import HomeReviewCard from "../Component/HomeReviewCard.jsx";
import BusinessListingSection from "../Component/HomeBusinessList.jsx";
import review from "../data/Review.js";
const HomeScreen = () => {
  return (
    <div>
      <PromoBanner />
      <InfoBar />
      <CategoryList />
      <h1 className="text-center mt-5 ">Reviews</h1>
      <HomeReviewCard reviews = {review}/>
      <BusinessListingSection />
    </div>
  );
};

export default HomeScreen;
