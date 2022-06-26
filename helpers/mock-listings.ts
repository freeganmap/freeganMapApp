import { ListingCondition, ListingPickupMethod } from "../types";
import { getImageUrl, MOCK_LISTING_PHOTO_CIDS } from "./image-helpers";

export default MOCK_LISTING_PHOTO_CIDS.map((cid: string, i: number) => ({
  imageUrl: getImageUrl(cid),
  title: (
    i === 0 ?
    'Moved out! Beautiful healthy house plants left on the sidewalk.'
    : i === 1 ?
    'Hello Kitty Side Table, Great Condition'
    : i === 2 ?
    'Got leg problems? Get your crutches, braces, wheelchair.'
    :
    'Large microwave, it works great!'
  ),
  description: (
    i === 0 ?
    "I have a 3-year old banana plant and a fruit tree that I can't take care of anymore. They are out on the street by the SE corner of 24th."
    : i === 1 ?
    "Free Hello Kitty drawer. Works great."
    : i === 2 ?
    "A bunch of leg problem solutions, including a full wheelchair, leg braces, and many crutches. Worn but works."
    :
    "Free, left on the sidewalk. Great condition"
  ),
  timestamp: 1656184163261,
  coordinates: { neighborhood: 'Manhattan - Flatiron District' },
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