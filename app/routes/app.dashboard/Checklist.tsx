import { BlockStack, Box, Card, Divider, Link, Text } from "@shopify/polaris";
import { ChecklistItem } from "./ChecklistItem";

export const Checklist: React.FC<{ activeProfileId: string | undefined }> = ({
  activeProfileId,
}) => {
  return (
    <Card padding="0">
      <Box padding="400">
        <Text as="h3" variant="headingLg">
          Get started checklist
        </Text>
      </Box>
      <Divider />
      <Box padding="400">
        <BlockStack gap="400">
          <ChecklistItem
            heading="Activate address autocompletion"
            description={
              <Text as="p">
                Navigate to your checkout settings from{" "}
                <Link url="shopify:admin/settings/checkout">here</Link> to
                activate your autocompletion integration.
              </Text>
            }
            status={"checked"}
          />

          <ChecklistItem
            heading="Activate address validation"
            description={
              <Text as="p">
                Navigate to your checkout profile settings from{" "}
                <Link
                  url={
                    activeProfileId
                      ? `shopify:admin/settings/checkout/editor/profiles/${activeProfileId}?page=checkout&context=apps`
                      : "shopify:admin/settings/checkout"
                  }
                >
                  here
                </Link>{" "}
                to add the validation banner to your checkout.
              </Text>
            }
            status={"checked"}
          />
        </BlockStack>
      </Box>
    </Card>
  );
};
