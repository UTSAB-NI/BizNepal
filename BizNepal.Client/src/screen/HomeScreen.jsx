// Code to display the HomeScreen
import PromoBanner from "../Component/PromoBanner.jsx";
import InfoBar from "../Component/InfoBar.jsx";
import CategoryList from "../Component/CategoryList.jsx";
const HomeScreen = () => {
  return (
    <div>
      <PromoBanner />
      <InfoBar />
      <CategoryList />
    </div>
  );
};

export default HomeScreen;
