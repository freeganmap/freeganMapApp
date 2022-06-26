
export const MOCK_LISTING_PHOTO_CIDS = [
  'bafybeidzu23tjbcd5eclzcyjt3wvtzuu7czcu3hgdrnt4r2cx65r2tazci',
  'bafybeieei67oaecsv234qukbotey7f2leuj4u4rx7gvfqugwsijdtaungy',
  'bafybeifd5erzlyzux4qqvpw4a7j4fvztugrjoxhg6xt2sajegpjsdwajme',
  'bafybeibzq24voljrhymlr5kdj6wrukpmgftrmwhaplgd4ptff7lfnpxwta',
];

export const getImageUrl = (cid: string) => `https://${cid}.ipfs.dweb.link/listing-photo-1.JPG`
//  `https://dweb.link/ipfs/${cid}`;
// https://dweb.link/ipfs/bafybeibzq24voljrhymlr5kdj6wrukpmgftrmwhaplgd4ptff7lfnpxwta
// bafybeibzq24voljrhymlr5kdj6wrukpmgftrmwhaplgd4ptff7lfnpxwta.ipfs.dweb.link
// https://bafybeibzq24voljrhymlr5kdj6wrukpmgftrmwhaplgd4ptff7lfnpxwta.ipfs.dweb.link/listing-photo-1.JPG
