import { json, type LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import {
  BlockStack,
  Box,
  Button,
  Card,
  Grid,
  InlineGrid,
  Page,
  Text,
} from "@shopify/polaris";
import { authenticate } from "~/shopify.server";
import { AnalyticsCards } from "./AnalyticsCards";
import { Checklist } from "./Checklist";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { admin } = await authenticate.admin(request);

  const body = await admin
    .graphql(
      `#graphql
    query CheckoutProfiles {
      checkoutProfiles(first:50) {
        nodes {
          id
          isPublished
        }
      }
    }
  `,
    )
    .then((resp) => resp.json());

  return json({
    activeProfile: body.data?.checkoutProfiles.nodes.find(
      (profile) => profile.isPublished,
    ),
  });
};

export default function Dashboard() {
  const { activeProfile } = useLoaderData<typeof loader>();

  return (
    <>
      <ui-title-bar title="Dashboard" />
      <Page>
        <BlockStack gap="200">
          <AnalyticsCards />
          <InlineGrid columns={3} gap="200">
            <Grid.Cell columnSpan={{ xs: 2 }}>
              <Checklist activeProfileId={activeProfile?.id.split("/").pop()} />
            </Grid.Cell>
            <div>
              <Card>
                <Box paddingInlineEnd="400">
                  <BlockStack gap="200">
                    <Text as="h4" variant="headingMd">
                      Having trouble with our app?
                    </Text>
                    <Text as="p" variant="bodyMd">
                      Get in touch now and we will get back to you within 24
                      hours.
                    </Text>
                    <Button url="mailto:info@thefloorr.com" target="_parent">
                      Contact us now
                    </Button>
                  </BlockStack>
                </Box>
              </Card>
            </div>
          </InlineGrid>
        </BlockStack>
      </Page>
    </>
  );
}
