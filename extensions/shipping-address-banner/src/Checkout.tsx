import {
  Banner,
  Image,
  InlineStack,
  Link,
  reactExtension,
  Spinner,
  Text,
  useApplyShippingAddressChange,
  useInstructions,
  useShippingAddress,
} from "@shopify/ui-extensions-react/checkout";
import { type ShippingAddress } from "@shopify/ui-extensions/checkout";
import { useEffect, useState } from "react";
import { WrongAddressBanner } from "./WrongAddressBanner";
import type { ValidateAddressApiResult } from "./api";
import { API } from "./api";
import { useDebounce } from "./useDebounce";

export default reactExtension(
  "purchase.checkout.delivery-address.render-after",
  () => <Extension />,
);

type UseValidateAddressResult =
  | { loading: true; data: undefined }
  | { loading: false; data: ValidateAddressApiResult | undefined };

const useValidateAddress = (shippingAddressInput: ShippingAddress) => {
  const [result, setResult] = useState<UseValidateAddressResult>({
    loading: true,
    data: undefined,
  });

  // Debounce the shipping address, so we don't overdo requests
  const debouncedAddress = useDebounce(shippingAddressInput);

  useEffect(() => {
    (async () => {
      if (!debouncedAddress.address1) {
        setResult({ loading: false, data: undefined });
        return;
      }

      setResult({ loading: true, data: undefined });
      const response = await API.validateAddress(debouncedAddress);
      setResult({ loading: false, data: response });
    })();
  }, [debouncedAddress]);

  return result;
};

type State = "initial" | "suggested-applied" | "original-confirmed";

function Extension() {
  const instructions = useInstructions();
  const applyShippingAddress = useApplyShippingAddressChange();
  const shippingAddress = useShippingAddress();
  const validateResult = useValidateAddress(shippingAddress);

  const [state, setState] = useState<State>("initial");

  useEffect(() => {
    // If the original address was confirmed, we suppress all subsequent validations
    if (state !== "original-confirmed") {
      setState("initial");
    }
  }, [validateResult, state]);

  if (state === "original-confirmed") {
    return null;
  }

  if (validateResult.loading) {
    return (
      <Banner>
        <InlineStack blockAlignment="center" inlineAlignment="end">
          Validating address...
          <Spinner />
        </InlineStack>
      </Banner>
    );
  }

  // Likely no address1 was inputted, so nothing to validate
  if (!validateResult.loading && !validateResult.data) {
    return null;
  }

  if (
    !validateResult.loading &&
    !validateResult.data.isValid &&
    state === "initial"
  ) {
    return (
      <WrongAddressBanner
        suggestedAddress={validateResult.data.suggestedAddress}
        onDismiss={() => setState("original-confirmed")}
        onSuggestedApplied={() => {
          setState("suggested-applied");
          if (!instructions.delivery.canSelectCustomAddress) {
            alert("Shipping address cannot be changed in this checkout");
            return;
          }

          applyShippingAddress({
            type: "updateShippingAddress",
            address: validateResult.data.suggestedAddress,
          });
        }}
      />
    );
  }

  return (
    <Banner status="success" title="Address is correct">
      <InlineStack blockAlignment="center" spacing="extraTight">
        <Text>
          Powered by <Link to="https://datatools.com.au/">DataTools</Link>
        </Text>
        <Image source="https://grumspot.com/favicon.ico"></Image>
      </InlineStack>
    </Banner>
  );
}
