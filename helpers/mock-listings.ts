import { ListingCondition, ListingPickupMethod } from "../types";
import { getImageUrl, MOCK_LISTING_PHOTO_CIDS } from "./image-helpers";

export default MOCK_LISTING_PHOTO_CIDS.map((cid: string) => ({
  imageUrl: getImageUrl(cid),
  title: 'Empty my fridge! Fresh produce just bought from Safeway.',
  description: 'Lots of broccoli, fruits, and vegetables in my fridge. See photos for details.',
  timestamp: 1656184163261,
  location: { neighborhood: 'Manhattan - Flatiron District' },
  createdAt: 1656184163261,
  lastAvailableAt: 1656184163261,
  "status": "available",
  condition: ListingCondition.GreatAndWorks,
  pickupMethod: ListingPickupMethod.Curbside,
}));

/*

"title": "Empty my fridge! Fresh produce just bought from Safeway.",
    "neighborhood": "Mission District",
    "created_at": "2022-05-31T01:00:00.207Z",
    "last_available_at": "2022-05-31T01:13:26.207Z",
    "status": "available",

*/