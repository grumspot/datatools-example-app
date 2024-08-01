import type { ShippingAddress } from "@shopify/ui-extensions/checkout";

export type ValidateAddressApiResult =
  | {
      isValid: true;
      suggestedAddress: undefined;
    }
  | {
      isValid: false;
      suggestedAddress: ShippingAddress;
    };

export const API = {
  validateAddress: async (address: ShippingAddress) =>
    // Simulate an API call
    new Promise<ValidateAddressApiResult>((resolve) => {
      setTimeout(() => {
        if (address.address1.includes("Williams")) {
          resolve({ isValid: true, suggestedAddress: undefined });
          return;
        }

        resolve({
          isValid: false,
          suggestedAddress: {
            address1: "Williams",
            address2: "Suggested address2",
            city: "Random city",
            provinceCode: "QLD",
            zip: "4037",
          },
        });
      }, 2000);
    }),
};

Object.freeze(API);
