const Base_URL = 'https://pars-d.azurewebsites.net/';

export const Url = {
  Signin: `${Base_URL}token`,
  ActiveOrders: `${Base_URL}api/mobile/active-orders?`,
  ArchivedOrders: `${Base_URL}api/mobile/archived-orders?`,
  AvailableOrders: `${Base_URL}api/mobile/available-orders?`,
  OrderDetail: `${Base_URL}api/mobile/order?`,
  Services: `${Base_URL}api/mobile/update-service?`,
  InsuranceInfo: `${Base_URL}mobilefile/get-insuranceinfo`,
  UpdateScheduledDates:`${Base_URL}api/mobile/update-scheduled-dates`
};
