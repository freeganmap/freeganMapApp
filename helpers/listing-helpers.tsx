import { MaterialIcons } from "@expo/vector-icons";
import tw from "tailwind-react-native-classnames";
import { Text, View } from "../components/Themed";
import { Listing, ListingCondition, ListingPickupMethod } from "../types";

const VALUE_STYLE = {
  ...tw`text-base`,
  fontFamily: 'Poppins_400Regular',
};

export const formatListingCondition = (listing: Listing) => {
  switch(listing.condition) {
    case ListingCondition.NewAndWorks:
      return <Text style={VALUE_STYLE}>🔥 New</Text>;
    case ListingCondition.GreatAndWorks:
      return <Text style={VALUE_STYLE}>✨ Great</Text>;
    case ListingCondition.WornAndWorks:
      return <Text style={VALUE_STYLE}>👌 Okay (Used)</Text>;
    case ListingCondition.NeedsRepair:
      return <Text style={VALUE_STYLE}>🛠️ Needs Repair</Text>;
    default:
      return 'Working Condition';
  }
}

export const formatListingPickupMethod = (listing: Listing) => {
  switch(listing.pickupMethod) {
    case ListingPickupMethod.Curbside:
      return <Text style={VALUE_STYLE}>🛣️ Street Side</Text>;
    case ListingPickupMethod.Pickup:
      return <Text style={VALUE_STYLE}>🗓️ Schedule Pickup</Text>;
    default:
      return '--';
  }
}
