import { BlockStack, Icon as PolarisIcon, Text } from "@shopify/polaris";
import { CheckIcon, InfoIcon } from "@shopify/polaris-icons";

type ChecklistItemStatus = "checked" | "unchecked" | "warning";

export type ChecklistSubItem = {
  heading: string;
  description: React.ReactNode;
  status: ChecklistItemStatus;
};

export interface ChecklistItemProps {
  heading: string;
  description: React.ReactNode;
  status: ChecklistItemStatus;
  Icon?: React.FC;
  subItems?: ChecklistSubItem[];
}

export const ChecklistItem: React.FC<ChecklistItemProps> = ({
  heading,
  description,
  status,
  Icon,
  subItems = [],
}) => {
  const getIcon = (status: ChecklistItemStatus) => {
    if (status === "checked") {
      return (
        <div className="h-5 min-w-5 rounded-full text-white bg-black">
          <PolarisIcon source={CheckIcon} />
        </div>
      );
    }

    if (status === "unchecked") {
      return (
        <div className="h-5 min-w-5 rounded-full border-2 border-gray-500 border-dashed" />
      );
    }

    return (
      <div className="h-5 min-w-5 rounded-full">
        <PolarisIcon source={InfoIcon} tone="warning" />
      </div>
    );
  };

  const getDescription = (description: React.ReactNode) => {
    if (typeof description === "string") {
      return (
        <Text as="p" variant="bodyMd">
          {description}
        </Text>
      );
    }

    return description;
  };

  return (
    <BlockStack gap="200">
      <div className="flex gap-2">
        {getIcon(status)}
        <div className="flex-grow flex flex-col gap-1">
          <Text as="h4" variant="headingMd">
            {heading}
          </Text>

          {getDescription(description)}
        </div>
        {Icon ? <Icon /> : null}
      </div>
      {subItems.map((subItem, i) => (
        <div key={i} className="pl-6 flex gap-2">
          <div>{getIcon(subItem.status)}</div>
          <div className="flex flex-col gap-1">
            <Text as="h4" variant="headingMd">
              {subItem.heading}
            </Text>

            {getDescription(subItem.description)}
          </div>
        </div>
      ))}
    </BlockStack>
  );
};
