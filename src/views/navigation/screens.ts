import { Route } from "@react-navigation/native";
import { StackNavigationOptions } from "@react-navigation/stack";
import Screens from "@utils/screens";
import HomeView from "@views/home/homeView";
import LoadingView from "@views/loading/loadingView";
import SignInView from "@views/sign_in/signInView";

type ViewsProps = {
  name: string;
  component: any;
  options?:
    | StackNavigationOptions
    | (({ route }: { route: Route<string> }) => StackNavigationOptions);
};

const views: ViewsProps[] = [
  {
    name: Screens.LOADING,
    component: LoadingView,
    options: {
      headerShown: false,
    },
  },
  {
    name: Screens.SIGN_IN,
    component: SignInView,
    options: {
      headerShown: false,
    },
  },
  {
    name: Screens.HOME,
    component: HomeView,
  },
];

export default views;
