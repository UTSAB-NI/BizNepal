// Code to display the HomeScreen
import Coverpage from "../Component/Coverpage.tsx";
import Section from "../Component/Section.tsx";
import Category from "../Component/Category.tsx";
const HomeScreen = () => {
  return (
    <div>
      <Coverpage/>
      <Section/>
      <Category/>
    </div>
  );
};

export default HomeScreen;
