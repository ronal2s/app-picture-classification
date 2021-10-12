import { Route } from "@react-navigation/native";
import { StackNavigationOptions } from "@react-navigation/stack";
import Screens from "@utils/screens";
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
    name: Screens.SIGN_IN,
    component: SignInView,
  },
];

export default views;
