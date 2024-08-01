import {
  BlockStack,
  Card,
  InlineGrid,
  InlineStack,
  Text,
} from "@shopify/polaris";
import { ChartPopularIcon, OrderIcon, ViewIcon } from "@shopify/polaris-icons";

type AnalyticsMetricCardProps = {
  label: React.ReactNode;
  value: React.ReactNode;
  icon?: React.ReactNode;
};

export const AnalyticsMetricCard: React.FC<AnalyticsMetricCardProps> = ({
  label,
  value,
  icon,
}) => {
  let content = (
    <>
      {typeof value === "undefined" ? (
        <div
          className={`${icon ? "h-6" : "h-10"} w-12 animate-pulse rounded-md bg-gray-200`}
        />
      ) : (
        <div>{value}</div>
      )}
      {label}
    </>
  );

  if (icon) {
    content = (
      <div className="flex h-full flex-col items-center justify-center">
        {content}
      </div>
    );
  }

  return (
    <div className="grid h-full w-full">
      <Card>
        <div className="flex min-h-[4.5rem] flex-col items-center justify-between gap-1">
          {icon}
          {content}
        </div>
      </Card>
    </div>
  );
};

const MetricValueText: React.FC<{ text: string | number }> = ({ text }) => (
  <Text as="p" variant="bodyMd" fontWeight="semibold" alignment="center">
    {text}
  </Text>
);

export const AnalyticsCards: React.FC = () => {
  return (
    <BlockStack gap="200">
      <InlineStack align="space-between" blockAlign="center">
        <Text as="h2" variant="headingMd">
          Analytics overview
        </Text>
      </InlineStack>
      <InlineGrid columns={{ xs: 2, md: 4 }} gap="200">
        <AnalyticsMetricCard
          label={
            <Text as="p" fontWeight="semibold" alignment="center">
              Generated revenue
            </Text>
          }
          value={
            <Text as="p" variant="headingXl" tone="success" alignment="center">
              $400.53
            </Text>
          }
        />
        <AnalyticsMetricCard
          label={
            <Text as="p" fontWeight="semibold" alignment="center">
              Random metric
            </Text>
          }
          value={<MetricValueText text="1230" />}
          icon={
            <ViewIcon
              width="1.5rem"
              height="1.5rem"
              fill="var(--p-color-icon-success)"
            />
          }
        />
        <AnalyticsMetricCard
          label={
            <Text as="p" fontWeight="semibold" alignment="center">
              Random metric 2
            </Text>
          }
          value={<MetricValueText text="127" />}
          icon={
            <OrderIcon
              width="1.5rem"
              height="1.5rem"
              fill="var(--p-color-icon-success)"
            />
          }
        />
        <AnalyticsMetricCard
          label={
            <Text as="p" fontWeight="semibold" alignment="center">
              Random metric 3
            </Text>
          }
          value={<MetricValueText text="12.45%" />}
          icon={
            <ChartPopularIcon
              width="1.5rem"
              height="1.5rem"
              fill="var(--p-color-icon-success)"
            />
          }
        />
      </InlineGrid>
    </BlockStack>
  );
};
