import {
  Banner,
  BlockStack,
  Button,
  Divider,
  Grid,
  Image,
  InlineStack,
  Link,
  Text,
  useShippingAddress,
} from "@shopify/ui-extensions-react/checkout";
import { type ShippingAddress } from "@shopify/ui-extensions/checkout";

function AddressDisplay({
  title,
  address,
}: {
  title: string;
  address: ShippingAddress;
}) {
  return (
    <BlockStack spacing="extraTight">
      <Text emphasis="bold">Your address</Text>
      <BlockStack spacing="none">
        <Text>{address.address1},</Text>
        {address.address2 && <Text>{address.address2},</Text>}
        <Text>
          {[address.city, address.provinceCode, address.zip]
            .filter(Boolean)
            .join(", ")}
        </Text>
      </BlockStack>
    </BlockStack>
  );
}

export function WrongAddressBanner({
  suggestedAddress,
  onDismiss,
  onSuggestedApplied,
}: {
  suggestedAddress: ShippingAddress;
  onDismiss: () => void;
  onSuggestedApplied: () => void;
}) {
  const shippingAddress = useShippingAddress();

  return (
    <Banner status="critical" title="Your address seems wrong">
      <BlockStack borderRadius="base" spacing="none">
        <InlineStack
          inlineAlignment="end"
          blockAlignment="center"
          spacing="extraTight"
        >
          <Text appearance="subdued">
            Powered by <Link to="https://datatools.com.au/">DataTools</Link>
          </Text>
          <Image source="https://grumspot.com/favicon.ico"></Image>
        </InlineStack>

        <BlockStack>
          <Grid columns={["1fr", "1fr"]}>
            <AddressDisplay title="Your address" address={shippingAddress} />
            <AddressDisplay
              title="Suggested address"
              address={suggestedAddress}
            />
          </Grid>

          <Divider />

          <InlineStack inlineAlignment="end" blockAlignment="center">
            <Button onPress={onSuggestedApplied}>Edit address</Button>
            <Text emphasis="bold">
              <Link onPress={onDismiss}>Use original</Link>
            </Text>
          </InlineStack>
        </BlockStack>
      </BlockStack>
    </Banner>
  );
}
