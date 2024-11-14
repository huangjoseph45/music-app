import HomeHeader from "../components/home/home-header";
const HomeManager = ({ accountInformation }) => {
  return (
    <div className="wrapper">
      <HomeHeader title={accountInformation.name} />
    </div>
  );
};

export default HomeManager;
