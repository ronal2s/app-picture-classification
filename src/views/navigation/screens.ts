import { Route } from "@react-navigation/native";
import { StackNavigationOptions } from "@react-navigation/stack";
import Screens from "@utils/screens";
import CameraView from "@views/camera/cameraView";
import DocumentView from "@views/document/documentView";
import HomeView from "@views/home/homeView";
import LoadingView from "@views/loading/loadingView";
import TabsContainer from "@views/navigation/tabsContainer";
import ProductFormView from "@views/product_form/productFormView";
import ProfileBasicInfoView from "@views/profile/profileBasicInfo";
import SignInView from "@views/sign_in/onboardingView";

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
  {
    name: Screens.TABS_CONTAINER,
    component: TabsContainer,
    options: {
      title: "Proyecto Final",
    },
  },
  {
    name: Screens.PRODUCT_FORM,
    component: ProductFormView,
  },
  {
    name: Screens.CAMERA,
    component: CameraView,
  },
  {
    name: Screens.PROFILE_BASIC_INFO,
    component: ProfileBasicInfoView,
  },
  {
    name: Screens.DOCUMENT_VIEW,
    component: DocumentView,
  },
];

export default views;
